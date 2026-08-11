const loginForm = document.getElementById("loginForm");
const loginButton = document.getElementById("loginButton");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async function (event) {

event.preventDefault();


const email =
    document.getElementById("email").value.trim();

const password =
    document.getElementById("password").value;


if (!email || !password) {

    message.textContent =
        "Please enter your email and password.";

    return;
}


try {

    loginButton.disabled = true;

    loginButton.textContent = "Logging in...";

    message.textContent = "";


    const response = await fetch(
        "https://portfolio-backend-production-5e12.up.railway.app/api/auth/login",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email,
                password: password
            })
        }
    );


    const data = await response.json();


    console.log("HTTP Status:", response.status);

    console.log("Login Response:", data);


    const token =
    data.token ||
    data.data?.token;

if (data.success && token) {

    localStorage.setItem(
        "token",
        token
    );


        // Optional: save admin information
        if (data.admin) {

            localStorage.setItem(
                "admin",
                JSON.stringify(data.admin)
            );

        }


        message.textContent =
            "Login successful. Redirecting...";


        // Go to dashboard
        setTimeout(function () {

            window.location.href =
                "dashboard.html";

        }, 500);


    } else {

        message.textContent =
            data.message || "Invalid email or password.";

    }


} catch (error) {

    console.error(
        "Login error:",
        error
    );


    message.textContent =
        "Cannot connect to server. Please try again.";

} finally {

    loginButton.disabled = false;

    loginButton.textContent = "Login";

}

});