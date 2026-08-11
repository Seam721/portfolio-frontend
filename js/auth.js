const token = localStorage.getItem("token");

/*
Protect admin pages.

If there is no JWT token,
send the user back to login.

*/

if (!token) {

window.location.href = "login.html";

}

/*
Logout
*/

const logoutButton =
document.getElementById("logoutButton");

if (logoutButton) {

logoutButton.addEventListener(
    "click",
    function () {

        localStorage.removeItem("token");

        localStorage.removeItem("admin");

        window.location.href =
            "login.html";

    }
);

}