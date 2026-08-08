const API =
    "https://portfolio-backend-production-5e12.up.railway.app/api";

async function loadProjects() {

    try {

        const response =
            await fetch(`${API}/projects`);

        const result =
            await response.json();

        const projects =
            result.data;

        const container =
            document.getElementById(
                "projects-container"
            );

        if (!container) return;

        container.innerHTML = "";

        projects.forEach(project => {

            const image =
                project.image
                    ? `${API.replace("/api", "")}${project.image}`
                    : "images/no-image.png";

            container.innerHTML += `

                <div class="project-card">

                    <img
                        src="${image}"
                        alt="${project.title}"
                    >

                    <div class="project-content">

                        <h3>
                            ${project.title}
                        </h3>

                        <p>
                            ${project.description}
                        </p>

                        <p class="tech">
                            ${project.technologies}
                        </p>

                        <div class="project-buttons">

                            <a
                                class="btn"
                                href="project.html?id=${project.id}"
                            >
                                View Details
                            </a>

                        </div>

                    </div>

                </div>

            `;

        });

    } catch (error) {

        console.error(
            "Projects Error:",
            error
        );

    }
}

loadProjects();
