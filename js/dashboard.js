async function loadDashboard() {

    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const totalElement = document.getElementById("total");
    const table = document.getElementById("messages");

    try {

        const response = await fetch(
            "https://portfolio-backend-production-5e12.up.railway.app/api/dashboard",
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("Dashboard HTTP Status:", response.status);

        const data = await response.json();

        console.log("Dashboard API Response:", data);

        if (!response.ok) {

            totalElement.innerText = "Error";

            table.innerHTML = `
                <tr>
                    <td colspan="4">
                        ${data.message || "Dashboard request failed"}
                    </td>
                </tr>
            `;

            return;
        }

        if (!data.success) {

            localStorage.removeItem("token");

            window.location.href = "login.html";

            return;
        }

        /*
         * Support the expected API structure:
         *
         * {
         *   success: true,
         *   data: {
         *      totalMessages: 1,
         *      latestMessages: []
         *   }
         * }
         */

        const dashboardData = data.data;

        if (!dashboardData) {

            totalElement.innerText = "0";

            table.innerHTML = `
                <tr>
                    <td colspan="4">
                        Dashboard API returned no data.
                    </td>
                </tr>
            `;

            console.error(
                "Missing data property:",
                data
            );

            return;
        }

        const totalMessages =
            dashboardData.totalMessages ?? 0;

        const latestMessages =
            dashboardData.latestMessages ?? [];

        totalElement.innerText =
            totalMessages;

        table.innerHTML = "";

        if (latestMessages.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="4">
                        No messages found.
                    </td>
                </tr>
            `;

            return;
        }

        latestMessages.forEach(item => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${item.name ?? ""}</td>
                <td>${item.email ?? ""}</td>
                <td>${item.message ?? ""}</td>
                <td>${item.created_at ?? ""}</td>
            `;

            table.appendChild(row);

        });

    } catch (error) {

        console.error(
            "Dashboard API Error:",
            error
        );

        totalElement.innerText = "Error";

        table.innerHTML = `
            <tr>
                <td colspan="4">
                    Cannot connect to dashboard API.
                </td>
            </tr>
        `;

    }
}

loadDashboard();
