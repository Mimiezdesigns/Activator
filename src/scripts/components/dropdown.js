document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
    dropdownToggles.forEach(function (toggle) {
      const targetDropdownId = toggle.getAttribute('data-target');
      const targetDropdown = document.getElementById(targetDropdownId);
      let isMouseOverDropdown = false;
  
      if (targetDropdown) {
        targetDropdown.addEventListener('mouseenter', () => {
          isMouseOverDropdown = true;
        });
  
        targetDropdown.addEventListener('mouseleave', () => {
          isMouseOverDropdown = false;
        });
  
        toggle.addEventListener('focus', () => {
          targetDropdown.style.display = 'block';
        });
  
        toggle.addEventListener('blur', () => {
          if (!isMouseOverDropdown) {
            targetDropdown.style.display = 'none';
          }
        });
      }
    });
  });
  