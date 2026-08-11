// ========================================
// API
// ========================================

const API_URL =
    "https://portfolio-backend-production-5e12.up.railway.app/api";


// ========================================
// ELEMENTS
// ========================================

const projectCount =
    document.getElementById("projectCount");

const skillCount =
    document.getElementById("skillCount");

const messageCount =
    document.getElementById("messageCount");

const adminEmail =
    document.getElementById("adminEmail");


// ========================================
// GET AUTH HEADERS
// ========================================

function getHeaders() {

    const token =
        localStorage.getItem("token");


    if (!token) {

        console.error(
            "No authentication token found."
        );

        return null;
    }


    return {

        "Authorization":
            `Bearer ${token}`,

        "Content-Type":
            "application/json"
    };
}


// ========================================
// LOAD DASHBOARD STATS
// ========================================

async function loadDashboardStats() {

    try {

        const headers =
            getHeaders();


        if (!headers) {

            window.location.href =
                "login.html";

            return;
        }


        console.log(
            "Loading dashboard statistics..."
        );


        const [
            projectsResponse,
            skillsResponse,
            messagesResponse
        ] = await Promise.all([

            fetch(
                `${API_URL}/projects`,
                {
                    method: "GET",
                    headers: headers
                }
            ),

            fetch(
                `${API_URL}/skills`,
                {
                    method: "GET",
                    headers: headers
                }
            ),

            fetch(
                `${API_URL}/contact`,
                {
                    method: "GET",
                    headers: headers
                }
            )

        ]);


        // ========================================
        // HANDLE UNAUTHORIZED
        // ========================================

        if (
            projectsResponse.status === 401 ||
            skillsResponse.status === 401 ||
            messagesResponse.status === 401
        ) {

            console.error(
                "Authentication expired."
            );

            localStorage.removeItem("token");

            localStorage.removeItem("admin");

            window.location.href =
                "login.html";

            return;
        }


        // ========================================
        // CONVERT RESPONSES TO JSON
        // ========================================

        const projectsResult =
            await projectsResponse.json();

        const skillsResult =
            await skillsResponse.json();

        const messagesResult =
            await messagesResponse.json();


        console.log(
            "Projects API:",
            projectsResult
        );

        console.log(
            "Skills API:",
            skillsResult
        );

        console.log(
            "Messages API:",
            messagesResult
        );


        // ========================================
        // GET DATA
        // ========================================

        const projects =
            Array.isArray(
                projectsResult.data
            )
                ? projectsResult.data
                : Array.isArray(projectsResult)
                    ? projectsResult
                    : [];


        const skills =
            Array.isArray(
                skillsResult.data
            )
                ? skillsResult.data
                : Array.isArray(skillsResult)
                    ? skillsResult
                    : [];


        const messages =
            Array.isArray(
                messagesResult.data
            )
                ? messagesResult.data
                : Array.isArray(messagesResult)
                    ? messagesResult
                    : [];


        // ========================================
        // UPDATE COUNTS
        // ========================================

        projectCount.textContent =
            projects.length;


        skillCount.textContent =
            skills.length;


        messageCount.textContent =
            messages.length;


        console.log(
            "Dashboard counts:",
            {
                projects: projects.length,
                skills: skills.length,
                messages: messages.length
            }
        );


        // ========================================
        // ADMIN INFORMATION
        // ========================================

        const admin =
            localStorage.getItem("admin");


        if (admin) {

            try {

                const adminData =
                    JSON.parse(admin);


                adminEmail.textContent =
                    adminData.email ||
                    "Administrator";

            } catch (error) {

                console.error(
                    "Admin data error:",
                    error
                );

            }
        }


    } catch (error) {

        console.error(
            "Dashboard error:",
            error
        );


        projectCount.textContent =
            "0";

        skillCount.textContent =
            "0";

        messageCount.textContent =
            "0";

    }

}


// ========================================
// INITIAL LOAD
// ========================================

loadDashboardStats();