async function login() {

    try {

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value.trim();

        console.log("Email:", email);

        const response = await fetch(
            "https://portfolio-backend-production-5e12.up.railway.app/api/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        console.log("HTTP Status:", response.status);

        const data =
            await response.json();

        console.log("Response:", data);

        if (data.success) {

            localStorage.setItem(
                "token",
                data.token
            );

            alert("Login successful!");

            window.location.href =
                "dashboard.html";

        } else {

            document.getElementById(
                "message"
            ).innerText =
                data.message || "Login failed";

        }

    } catch (error) {

        console.error(
            "Error:",
            error
        );

        document.getElementById(
            "message"
        ).innerText =
            "Cannot connect to server.";

    }

}