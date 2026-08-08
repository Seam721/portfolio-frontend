async function loadDashboard() {

    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    try {

        const response = await fetch(
            "https://portfolio-backend-production-5e12.up.railway.app/api/dashboard",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!data.success) {

            localStorage.removeItem("token");
            window.location.href = "login.html";
            return;

        }

        document.getElementById("total").innerText =
            data.data.totalMessages;

        const table =
            document.getElementById("messages");

        table.innerHTML = "";

        data.data.latestMessages.forEach(item => {

            table.innerHTML += `

                <tr>

                    <td>${item.name}</td>

                    <td>${item.email}</td>

                    <td>${item.message}</td>

                    <td>${item.created_at}</td>

                </tr>

            `;

        });

    } catch (error) {

        console.error(
            "Dashboard API Error:",
            error
        );

    }

}

loadDashboard();