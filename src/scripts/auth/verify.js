document.addEventListener("DOMContentLoaded", () => {
  /** ===============================
   * OTP VERIFICATION LOGIC
   ================================ */
  const otpInputs = document.querySelectorAll(".mega-input-field-base");
  const oldUserConfirm = document.getElementById("oldUserConfirm");
  const newUserConfirm = document.getElementById("newUserConfirm");
  const backButton = document.getElementById("btn-back");

  if (otpInputs.length && oldUserConfirm) {
    oldUserConfirm.disabled = true;

    otpInputs.forEach((input, index) => {
      input.addEventListener("input", () => {
        if (input.value.length === 1 && index < otpInputs.length - 1) {
          otpInputs[index + 1].focus();
        }

        const allFilled = Array.from(otpInputs).every(
          (inp) => inp.value.trim() !== ""
        );
        oldUserConfirm.disabled = !allFilled;

      });
      input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && input.value === "" && index > 0) {
          otpInputs[index - 1].focus();
        }
      });
    });
  }

  if (oldUserConfirm) {
    oldUserConfirm.addEventListener("click", () => {
      alert("Old User")
      window.location.href = "../dashboard/dashboard.html";
    });
  }



  if (otpInputs.length && newUserConfirm) {
    newUserConfirm.disabled = true;

    otpInputs.forEach((input, index) => {
      input.addEventListener("input", () => {
        if (input.value.length === 1 && index < otpInputs.length - 1) {
          otpInputs[index + 1].focus();
        }

        const allFilled = Array.from(otpInputs).every(
          (inp) => inp.value.trim() !== ""
        );
        newUserConfirm.disabled = !allFilled;

      });
      input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && input.value === "" && index > 0) {
          otpInputs[index - 1].focus();
        }
      });
    });
  }
  //

  if (newUserConfirm) {
    newUserConfirm.addEventListener("click", () => {
      alert("New User")
      window.location.href = "/src/pages/auth/change-password.html";
    });
  }




  if (backButton) {
    backButton.addEventListener("click", () => {
      if (window.history.length > 1) window.history.back();
      else window.location.href = "../../index.html";
    });
  }



  /** ===============================
   * LOGIN FORM LOGIC
   ================================ */
  const loginForm = document.querySelector("form");
  if (loginForm) {
    console.log("Login form found.");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const loginBtn = document.getElementById("signInButton");
    const togglePassword = document.querySelector(".toggle-password");

    console.log("usernameInput:", usernameInput);
    console.log("passwordInput:", passwordInput);
    console.log("loginBtn:", loginBtn);

    // Start disabled
    if (loginBtn) {
      loginBtn.disabled = true;
    }

    const checkInputs = () => {
      const filled =
        usernameInput.value.trim() !== "" && passwordInput.value.trim() !== "";
      console.log("Inputs filled:", filled);
      if (loginBtn) {
        loginBtn.disabled = !filled;

      }
    };

    if (usernameInput && passwordInput) {
      usernameInput.addEventListener("input", checkInputs);
      passwordInput.addEventListener("input", checkInputs);
    }

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();
      const loginError = document.getElementById("loginError");

      if (username === "admin" && password === "Admin123!") {
        usernameInput.classList.remove("error");
        passwordInput.classList.remove("error");
        loginError.textContent = "";
        window.location.href = "./pages/auth/verify.html";
      } else if (username === "newuser" && password === "TempPass123!") {
        usernameInput.classList.remove("error");
        passwordInput.classList.remove("error");
        loginError.textContent = "";
        window.location.href = "./pages/auth/new-user/new-user.html";
      } else {
        usernameInput.classList.add("error");
        passwordInput.classList.add("error");
        loginError.textContent = "Invalid username or password.";
      }
    });

    // Password toggle logic with SVG swap
    if (togglePassword) {
      const openEye = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
        <path d="M1.17592 6.14212C1.08512 5.99836 1.03973 5.92648 1.01432 5.81561C0.995228 5.73233 0.995228 5.601 1.01432 5.51772C1.03973 5.40685 1.08512 5.33497 1.17591 5.19121C1.92619 4.00323 4.15943 1 7.56277 1C10.9661 1 13.1994 4.00323 13.9496 5.19121C14.0404 5.33497 14.0858 5.40685 14.1112 5.51772C14.1303 5.601 14.1303 5.73233 14.1112 5.81561C14.0858 5.92648 14.0404 5.99836 13.9496 6.14212C13.1994 7.33011 10.9661 10.3333 7.56277 10.3333C4.15943 10.3333 1.92619 7.33011 1.17592 6.14212Z" stroke="#A4A7AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7.56277 7.66667C8.66734 7.66667 9.56277 6.77124 9.56277 5.66667C9.56277 4.5621 8.66734 3.66667 7.56277 3.66667C6.4582 3.66667 5.56277 4.5621 5.56277 5.66667C5.56277 6.77124 6.4582 7.66667 7.56277 7.66667Z" stroke="#A4A7AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;

      const slashEye = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
        <path d="M6.72446 2.39488C6.9954 2.35482 7.2749 2.33333 7.56278 2.33333C10.9661 2.33333 13.1994 5.33656 13.9496 6.52455C14.0404 6.66833 14.0858 6.74023 14.1113 6.85112C14.1303 6.93439 14.1303 7.06578 14.1112 7.14905C14.0858 7.25993 14.0401 7.3323 13.9486 7.47705C13.7487 7.79343 13.4439 8.23807 13.0402 8.7203M4.04538 3.47669C2.604 4.45447 1.62547 5.81292 1.17657 6.52352C1.08536 6.66791 1.03975 6.74011 1.01433 6.85099C0.995231 6.93426 0.995224 7.06563 1.01431 7.14891C1.03972 7.25979 1.08512 7.33168 1.17592 7.47545C1.92619 8.66344 4.15944 11.6667 7.56278 11.6667C8.93505 11.6667 10.1171 11.1784 11.0884 10.5177M1.56278 1L13.5628 13M6.14856 5.58579C5.78663 5.94772 5.56278 6.44772 5.56278 7C5.56278 8.10457 6.45821 9 7.56278 9C8.11506 9 8.61506 8.77614 8.97699 8.41421" stroke="#A4A7AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;

      togglePassword.addEventListener("click", () => {
        const input = togglePassword.parentElement.querySelector("input");
        const isHidden = input.type === "password";
        input.type = isHidden ? "text" : "password";
        togglePassword.innerHTML = isHidden ? slashEye : openEye;
      });
    }
  }



  /** ===============================
   * PASSWORD CHANGE PAGE LOGIC
   ================================ */
  const newPassword = document.getElementById("newPassword");
  const confirmPassword = document.getElementById("confirmPassword");
  const strengthEl = document.getElementById("passwordStrength");
  const submitBtn = document.querySelector("button[type='submit']");
  const reqIcons = document.querySelectorAll(".req-icon");

  if (newPassword && confirmPassword && submitBtn && reqIcons.length) {
    const requirements = [
      /.{8,}/, // min 8 chars
      /[a-z]/, // lowercase
      /[A-Z]/, // uppercase
      /\d/, // number
      /[^A-Za-z0-9]/, // special char
    ];

    function checkRequirements(value) {
      let passed = 0;
      requirements.forEach((regex, i) => {
        if (regex.test(value)) {
          // only add 'valid' when requirement is met
          reqIcons[i].classList.add("valid");
          passed++;
        } else {
          reqIcons[i].classList.remove("valid");
        }
      });

      if (!value) {
        strengthEl.textContent = "";
        strengthEl.className = "password-strength";
        return;
      }

      if (passed <= 2) {
        strengthEl.textContent = "Password Strength: Weak";
        strengthEl.className = "password-strength weak";
      } else if (passed === 3 || passed === 4) {
        strengthEl.textContent = "Password Strength: Medium";
        strengthEl.className = "password-strength medium";
      } else if (passed === 5) {
        strengthEl.textContent = "Password Strength: Strong";
        strengthEl.className = "password-strength strong";
      }
    }

    function validateForm() {
      const match =
        newPassword.value && newPassword.value === confirmPassword.value;
      const validAll = Array.from(reqIcons).every((i) =>
        i.classList.contains("valid")
      );
      submitBtn.disabled = !(match && validAll);

      const confirmPasswordError = document.getElementById("confirmPasswordError");
      if (confirmPassword.value && !match) {
        confirmPassword.classList.add("error");
        confirmPasswordError.textContent = "Passwords do not match.";
      } else {
        confirmPassword.classList.remove("error");
        confirmPasswordError.textContent = "";
      }
    }

    newPassword.addEventListener("input", (e) => {
      checkRequirements(e.target.value);
      validateForm();
    });

    confirmPassword.addEventListener("input", validateForm);

    /** Toggle password visibility (eye ↔ eye-slash) **/
    document.querySelectorAll(".toggle-password").forEach((toggle) => {
      const openEye = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M1.17592 6.14212C1.08512 5.99836 1.03973 5.92648 1.01432 5.81561C0.995228 5.73233 0.995228 5.601 1.01432 5.51772C1.03973 5.40685 1.08512 5.33497 1.17591 5.19121C1.92619 4.00323 4.15943 1 7.56277 1C10.9661 1 13.1994 4.00323 13.9496 5.19121C14.0404 5.33497 14.0858 5.40685 14.1112 5.51772C14.1303 5.601 14.1303 5.73233 14.1112 5.81561C14.0858 5.92648 14.0404 5.99836 13.9496 6.14212C13.1994 7.33011 10.9661 10.3333 7.56277 10.3333C4.15943 10.3333 1.92619 7.33011 1.17592 6.14212Z" stroke="#A4A7AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7.56277 7.66667C8.66734 7.66667 9.56277 6.77124 9.56277 5.66667C9.56277 4.5621 8.66734 3.66667 7.56277 3.66667C6.4582 3.66667 5.56277 4.5621 5.56277 5.66667C5.56277 6.77124 6.4582 7.66667 7.56277 7.66667Z" stroke="#A4A7AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;

      const slashEye = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
          <path d="M6.72446 2.39488C6.9954 2.35482 7.2749 2.33333 7.56278 2.33333C10.9661 2.33333 13.1994 5.33656 13.9496 6.52455C14.0404 6.66833 14.0858 6.74023 14.1113 6.85112C14.1303 6.93439 14.1303 7.06578 14.1112 7.14905C14.0858 7.25993 14.0401 7.3323 13.9486 7.47705C13.7487 7.79343 13.4439 8.23807 13.0402 8.7203M4.04538 3.47669C2.604 4.45447 1.62547 5.81292 1.17657 6.52352C1.08536 6.66791 1.03975 6.74011 1.01433 6.85099C0.995231 6.93426 0.995224 7.06563 1.01431 7.14891C1.03972 7.25979 1.08512 7.33168 1.17592 7.47545C1.92619 8.66344 4.15944 11.6667 7.56278 11.6667C8.93505 11.6667 10.1171 11.1784 11.0884 10.5177M1.56278 1L13.5628 13M6.14856 5.58579C5.78663 5.94772 5.56278 6.44772 5.56278 7C5.56278 8.10457 6.45821 9 7.56278 9C8.11506 9 8.61506 8.77614 8.97699 8.41421" stroke="#A4A7AE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;

      toggle.addEventListener("click", () => {
        const input = toggle.parentElement.querySelector("input");
        const isHidden = input.type === "password";
        input.type = isHidden ? "text" : "password";
        toggle.innerHTML = isHidden ? slashEye : openEye;
      });
    });

    /** Submit handler **/
    document
      .getElementById("passwordForm")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Password changed successfully!");
        window.location.href = "/src/pages/dashboard/dashboard.html";
      });
  }
});
