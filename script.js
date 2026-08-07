const form = document.getElementById("contact-form");
const feedback = document.getElementById("form-feedback");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
        feedback.textContent = "Please fill out all fields before submitting.";
        feedback.style.color = "red";
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        feedback.textContent = "Please enter a valid email address.";
        feedback.style.color = "red";
        return;
    }

    feedback.textContent = "Sending...";

    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            access_key: "2e6d6eaa-708f-4684-919f-0ad489c8e9d1",
            name: name,
            email: email,
            message: message
        })
    })
    .then(response => response.json())
    .then(data => {
        feedback.textContent = "Thanks, " + name + "! Your message has been sent.";
        feedback.style.color = "green";
        form.reset();
    })
    .catch(error => {
        feedback.textContent = "Something went wrong. Please try again.";
        feedback.style.color = "red";
    });
});