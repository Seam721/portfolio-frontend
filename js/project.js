const API =
    "https://portfolio-backend-production-5e12.up.railway.app/api";

const params =
    new URLSearchParams(window.location.search);

const id =
    params.get("id");

async function loadProject() {

    try {

        const response =
            await fetch(`${API}/projects/${id}`);

        const result =
            await response.json();

        const project =
            result.data;

        document.getElementById(
            "project-title"
        ).textContent =
            project.title;

        document.getElementById(
            "project-description"
        ).textContent =
            project.description;

        document.getElementById(
            "project-tech"
        ).textContent =
            project.technologies;

        document.getElementById(
            "github-btn"
        ).href =
            project.github_url;

        document.getElementById(
            "demo-btn"
        ).href =
            project.demo_url;

        if (project.image) {

            document.getElementById(
                "project-image"
            ).src =
                `${API.replace("/api", "")}${project.image}`;

        }

    } catch (error) {

        console.error(
            "Project Error:",
            error
        );

    }
}

loadProject();
