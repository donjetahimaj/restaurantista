// Newsletter handling
const form = document.querySelector("form");
const emailInput = document.querySelector("#email");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const emailValue = emailInput.value.trim();

    if (!isValidEmail(emailValue)) {
        alert("Please enter a valid email address.");
        emailInput.focus();
    } else {
        form.submit();
    }
});

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

