document.addEventListener("DOMContentLoaded", () => {
    // OTP verification page logic
    const otpInputs = document.querySelectorAll(".otp-box");
    const confirmBtn = document.getElementById("confirmBtn");

    if (otpInputs.length && confirmBtn) {
        confirmBtn.disabled = true; // start disabled

        otpInputs.forEach((input, index) => {
            input.addEventListener("input", () => {
                if (input.value.length === 1 && index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }

                const allFilled = Array.from(otpInputs).every(inp => inp.value.trim() !== "");
                confirmBtn.disabled = !allFilled;

                // Optional: active color toggle
                confirmBtn.classList.toggle("active", allFilled);
            });

            input.addEventListener("keydown", (e) => {
                if (e.key === "Backspace" && input.value === "" && index > 0) {
                    otpInputs[index - 1].focus();
                }
            });
        });
    }


    document.querySelectorAll(".toggle-password").forEach(toggle => {
        toggle.addEventListener("click", () => {
            const input = toggle.previousElementSibling;
            if (!input) return;
            input.type = input.type === "password" ? "text" : "password";
            toggle.innerHTML = isPassword
                ? '<img src="../../public/assets/icons/eye-slash-icon.svg" alt="Hide password"/>'
                : '<img src="../../public/assets/icons/eye-icon.svg" alt="Show password"/>';

        });
    });

    // Login page logic
    const loginForm = document.querySelector("form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    if (loginForm && usernameInput && passwordInput) {
        const loginBtn = loginForm.querySelector("button[type='submit']");

        // Disable button until inputs are filled
        loginBtn.disabled = true;

        const checkInputs = () => {
            const filled = usernameInput.value.trim() !== "" && passwordInput.value.trim() !== "";
            loginBtn.disabled = !filled;
            loginBtn.classList.toggle("active", filled);
        };

        usernameInput.addEventListener("input", checkInputs);
        passwordInput.addEventListener("input", checkInputs);

        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (username === "admin" && password === "Admin123!") {
                window.location.href = "./pages/auth/verify.html";
            } else if (username === "newuser" && password === "TempPass123!") {
                window.location.href = "./pages/auth/new-user/new-user.html";
            } else {
                alert("Invalid email or password");
            }
        });
    }

    const newPasswordInput = document.getElementById("newPassword");
    const confirmInput = document.getElementById("confirmPassword");
    const submitBtn = document.querySelector("button[type='submit']");
    const reqIcons = document.querySelectorAll(".req-icon");

    const requirements = [
        /.{8,}/,           // 8+ chars
        /[a-z]/,           // lowercase
        /[A-Z]/,           // uppercase
        /[0-9]/,           // number
        /[^A-Za-z0-9]/     // special char
    ];

    const updateRequirements = (value) => {
        requirements.forEach((regex, i) => {
            if (regex.test(value)) {
                reqIcons[i].classList.add("valid");
            } else {
                reqIcons[i].classList.remove("valid");
            }
        });
    };

    const checkMatch = () => {
        const passwordsMatch = newPasswordInput.value && newPasswordInput.value === confirmInput.value;
        const allValid = Array.from(reqIcons).every(icon => icon.classList.contains("valid"));
        submitBtn.disabled = !(passwordsMatch && allValid);
    };

    newPasswordInput.addEventListener("input", e => {
        updateRequirements(e.target.value);
        checkMatch();
    });

    confirmInput.addEventListener("input", checkMatch);



    document.getElementById("passwordForm").addEventListener("submit", e => {
        e.preventDefault();
        alert("Password updated successfully!");
        window.location.href = "../../index.html";
    });
});


