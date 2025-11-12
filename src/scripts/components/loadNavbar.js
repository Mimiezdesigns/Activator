document.addEventListener("DOMContentLoaded", () => {
  const navbarPlaceholder = document.getElementById("navbar-placeholder");

  if (navbarPlaceholder) {
    fetch("/src/components/_navbar.html")
      .then(response => response.text())
      .then(html => {
        navbarPlaceholder.innerHTML = html;

        const hamburger = document.querySelector(".navbar__hamburger");
        const menu = document.querySelector(".navbar__menu");

        if (hamburger && menu) {
          hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("is-active");
            menu.classList.toggle("is-active");
          });
        }

        const searchInput = document.querySelector('.navbar__search-input');
        const searchDropdown = document.querySelector('.search-dropdown');
        let isMouseOverDropdown = false;

        if (searchInput && searchDropdown) {
            searchDropdown.addEventListener('mouseenter', () => {
                isMouseOverDropdown = true;
            });

            searchDropdown.addEventListener('mouseleave', () => {
                isMouseOverDropdown = false;
            });

            searchInput.addEventListener('focus', () => {
                searchDropdown.style.display = 'block';
            });

            searchInput.addEventListener('blur', () => {
                if (!isMouseOverDropdown) {
                    searchDropdown.style.display = 'none';
                }
            });
        }
      })
      .catch(error => {
        console.error("Error fetching navbar:", error);
        navbarPlaceholder.innerHTML = "<p>Error loading navbar. Please try again later.</p>";
      });
  }
});