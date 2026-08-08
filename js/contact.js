const API = "https://portfolio-backend-production-5e12.up.railway.app/api";

const form = document.getElementById("contact-form");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    status.textContent = "Sending...";
    status.style.color = "";

    const data = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        message: document.getElementById("message").value.trim()
    };

    try {
        const response = await fetch(`${API}/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            status.style.color = "green";
            status.textContent = "Message sent successfully.";
            form.reset();
        } else {
            status.style.color = "red";
            status.textContent =
                result.message || "Failed to send message.";
        }

    } catch (error) {
        console.error("Contact API Error:", error);

        status.style.color = "red";
        status.textContent = "Cannot connect to server.";
    }
});
