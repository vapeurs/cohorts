var courses = {
  bioinformatics,
  computerScience,
  dataScience,
};

document.addEventListener('DOMContentLoaded', function(event) { 
  var courseSelector = document.getElementById('course-selector');
  var sectionSelector = document.getElementById('section-selector');
  var classSelector = document.getElementById('class-selector');
  var codeOfConductCheckbox = document.getElementById('code-of-conduct-checkbox');

  function emptySelector(selector, selectorType, disabled) {
    selector.innerHTML = '';
    selector.disabled = disabled;

    var option = document.createElement("option");
    option.text = 'Select a ' + selectorType;
    
    selector.add(option);
  }

  function addWarnings(field, errorText) {
    document.getElementById(field + '-container').classList.add('is-danger');
    document.getElementById(field + '-help').innerHTML = errorText + ' is required';
  }

  function removeWarnings(field) {
    document.getElementById(field + '-container').classList.remove('is-danger');
    document.getElementById(field + '-help').innerHTML = '';
  }

  function validateForm() {
    var courseSelectorIsValid = true;
    var sectionSelectorIsValid = true;
    var classSelectorIsValid = true;
    var codeOfConductIsValid = true;

    if (courseSelector.value === 'Select a course') {
      courseSelectorIsValid = false;
      addWarnings('course-selector', 'Course');
    } else {
      removeWarnings('course-selector');
    }

    if (sectionSelector.value === 'Select a section') {
      sectionSelectorIsValid = false;
      addWarnings('section-selector', 'Section');
    } else {
      removeWarnings('section-selector');
    }
    
    if (classSelector.value === 'Select a class') {
      classSelectorIsValid = false;
      addWarnings('class-selector', 'Class');
    } else {
      removeWarnings('class-selector');
    }

    if (!codeOfConductCheckbox.checked) {
      codeOfConductIsValid = false;
      addWarnings('code-of-conduct', 'Agreeing to the Code of Conduct');
    } else {
      removeWarnings('code-of-conduct');
    }

    if (courseSelectorIsValid && sectionSelectorIsValid && classSelectorIsValid && codeOfConductIsValid) {
      return true;
    }

    return false;
  };

  // Populate the course selector
  courseSelector.addEventListener('change', function() {
    var courseSections = courses[courseSelector.value].sections;

    // Clear sections
    emptySelector(sectionSelector, 'section', false);

    // Clear classes and disable the selector
    emptySelector(classSelector, 'class', true);
      
    for (section in courseSections) {
      var option = document.createElement("option");

      option.text = courseSections[section].text;
      option.value = courseSections[section].value;

      sectionSelector.add(option);
      sectionSelector.disabled = false;
    }
  });

  // Populate the class selector
  sectionSelector.addEventListener('change', function() {
    var sectionClasses = courses[courseSelector.value].sections[sectionSelector.value].classes;

    // Clear classes
    emptySelector(classSelector, 'class', false);
    
    for (courseClass in sectionClasses) {
      var option = document.createElement("option");
      option.text = sectionClasses[courseClass].text;
      option.value = sectionClasses[courseClass].text;

      classSelector.add(option);
      classSelector.disabled = false;
    }
  });

  document.getElementById('submit').addEventListener('click', function() {
    var formIsValid = validateForm();

    if (formIsValid) {
      var selectedCourse = courses[courseSelector.value].text;
      var selectedSection = courses[courseSelector.value].sections[sectionSelector.value].text;
      
      var title = '[New Cohort] ' + classSelector.value;

      // Build the body of the Github issue (have to encode each line separately to use #'s)
      var body;
      body = '%23%23' + encodeURI(' Class\n\n');
      body += encodeURI(selectedCourse + ' / ' + selectedSection + ' / ' + classSelector.value + '\n\n');
      body += '%23%23' + encodeURI(' Coordinators (1/3)\n\n');
      body += encodeURI('- YOUR NAME HERE\n\n');
      body += '%23%23' + encodeURI(' Students (0/20)\n\n');
      body += encodeURI('_We suggest a minimum of 5 students per cohort, with no more than 20_.\n\n');
      body += encodeURI('- Add students here\n\n');
      body += '%23%23' + encodeURI(' Start Date\n\n');
      body += encodeURI('_Choose a start date for your cohort. We suggest providing two weeks for other students to join._\n\n');

      var issueUrl = 'https://github.com/ossu/cohorts/issues/new?';
      issueUrl += 'title=' + encodeURI(title);
      issueUrl += '&body=' + body;

      window.location.href = issueUrl;
    }
  });
});
