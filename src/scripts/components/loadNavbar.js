document.addEventListener("DOMContentLoaded", () => {
  const navbarPlaceholder = document.getElementById("navbar-placeholder");

  if (navbarPlaceholder) {
    fetch("../../components/navbar.html")
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

        const addBtn = document.getElementById("addBtn");
        const addDropdown = document.getElementById("addDropdown");


        // Toggle dropdown
        addBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          addDropdown.classList.toggle("show");
        });

        // Close when clicking outside
        document.addEventListener("click", () => {
          addDropdown.classList.remove("show");
        });

        // Prevent close when clicking inside dropdown
        addDropdown.addEventListener("click", (e) => {
          e.stopPropagation();
        });

        const adminBtn = document.getElementById("adminBtn");
        const adminDropdown = document.getElementById("adminDropdown");

        adminBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          adminDropdown.classList.toggle("show");
        });

        // Close when clicking outside
        document.addEventListener("click", () => {
          adminDropdown.classList.remove("show");
        });


        const recentBtn = document.getElementById("recentBtn");
        const recentDropdown = document.getElementById("recentDropdown");

        recentBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          recentDropdown.classList.toggle("show");
        });

        // Close when clicking outside
        document.addEventListener("click", () => {
          recentDropdown.classList.remove("show");
        });


        const profileBtn = document.getElementById("profileBtn");
        const profileDropdown = document.getElementById("profileDropdown");

        profileBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          profileDropdown.classList.toggle("active");
        });

        document.addEventListener("click", () => {
          profileDropdown.classList.remove("active");
        });
      })
      .catch(error => {
        console.error("Error fetching navbar:", error);
        navbarPlaceholder.innerHTML = "<p>Error loading navbar. Please try again later.</p>";
      });
  }
});