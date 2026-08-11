const loginForm =
    document.getElementById("loginForm");

const loginButton =
    document.getElementById("loginButton");

const message =
    document.getElementById("message");


// ========================================
// LOGIN
// ========================================

loginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const email =
            document
                .getElementById("email")
                .value
                .trim();


        const password =
            document
                .getElementById("password")
                .value;


        // ========================================
        // VALIDATION
        // ========================================

        if (!email || !password) {

            message.textContent =
                "Please enter your email and password.";

            return;
        }


        // ========================================
        // LOADING STATE
        // ========================================

        loginButton.disabled = true;

        loginButton.textContent =
            "Logging in...";

        message.textContent = "";


        try {

            console.log(
                "Sending login request..."
            );


            const response =
                await fetch(
                    "https://portfolio-backend-production-5e12.up.railway.app/api/auth/login",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            email: email,
                            password: password
                        })
                    }
                );


            console.log(
                "HTTP Status:",
                response.status
            );


            const data =
                await response.json();


            console.log(
                "Login response:",
                data
            );


            // ========================================
            // LOGIN SUCCESS
            // ========================================

            if (
                response.ok &&
                data.success === true &&
                data.token
            ) {

                localStorage.setItem(
                    "token",
                    data.token
                );


                if (data.admin) {

                    localStorage.setItem(
                        "admin",
                        JSON.stringify(
                            data.admin
                        )
                    );

                }


                message.textContent =
                    "Login successful!";


                console.log(
                    "Token saved."
                );


                // Redirect immediately
                window.location.href =
                    "dashboard.html";


                return;
            }


            // ========================================
            // LOGIN FAILED
            // ========================================

            message.textContent =
                data.message ||
                "Invalid email or password.";


        } catch (error) {

            console.error(
                "LOGIN ERROR:",
                error
            );


            message.textContent =
                "Cannot connect to server. Please try again.";


        } finally {

            // ========================================
            // ALWAYS RESTORE BUTTON
            // ========================================

            loginButton.disabled = false;

            loginButton.textContent =
                "Login";

        }

    }
);