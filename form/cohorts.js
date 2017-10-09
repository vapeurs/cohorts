var courses = {
  bioinformatics,
  computerScience,
  dataScience,
};

document.addEventListener('DOMContentLoaded', function(event) { 
  var courseSelector = document.getElementById('course-selector');
  var sectionSelector = document.getElementById('section-selector');
  var classSelector = document.getElementById('class-selector');

  function emptySelector(selector, selectorType) {
    selector.innerHTML = '';
    selector.disabled = true;

    var option = document.createElement("option");
    option.text = 'Select a ' + selectorType;
    
    selector.add(option);
  }

  // Populate the course selector
  courseSelector.addEventListener('change', function() {
      var courseSections = courses[courseSelector.value].sections;

      sectionSelector.innerHTML = '';

      // Clear classes and disable the selector
      emptySelector(classSelector, 'class');

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

    classSelector.innerHTML = '';
    
    for (courseClass in sectionClasses) {
      var option = document.createElement("option");
      option.text = sectionClasses[courseClass].text;
      option.value = sectionClasses[courseClass].value;

      classSelector.add(option);
      classSelector.disabled = false;
    }
  });
});