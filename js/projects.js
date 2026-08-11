const API =
"https://portfolio-backend-production-5e12.up.railway.app/api";

// const token =
// localStorage.getItem("token");

const projectsContainer =
document.getElementById(
"projectsContainer"
);

const projectFormContainer =
document.getElementById(
"projectFormContainer"
);

const projectForm =
document.getElementById(
"projectForm"
);

const addProjectButton =
document.getElementById(
"addProjectButton"
);

const cancelProjectButton =
document.getElementById(
"cancelProjectButton"
);

const formTitle =
document.getElementById(
"formTitle"
);

const projectMessage =
document.getElementById(
"projectMessage"
);

/* =========================
API HEADERS
========================= */

function getHeaders() {

return {

    "Content-Type":
        "application/json",

    "Authorization":
        `Bearer ${token}`

};

}

/* =========================
LOAD PROJECTS
========================= */

async function loadProjects() {

try {

    projectsContainer.innerHTML =
        "<p>Loading projects...</p>";


    const response =
        await fetch(
            `${API}/projects`,
            {
                method: "GET",

                headers:
                    getHeaders()
            }
        );


    const result =
        await response.json();


    console.log(
        "Projects API:",
        result
    );


    if (!response.ok) {

        throw new Error(
            result.message ||
            "Failed to load projects."
        );

    }


    const projects =
        result.data || [];


    displayProjects(
        projects
    );


} catch (error) {

    console.error(
        "Load projects error:",
        error
    );


    projectsContainer.innerHTML = `
        <p>
            ${escapeHtml(
                error.message
            )}
        </p>
    `;

}

}

/* =========================
DISPLAY PROJECTS
========================= */

function displayProjects(
projects
) {

if (
    !Array.isArray(projects) ||
    projects.length === 0
) {

    projectsContainer.innerHTML = `
        <p>
            No projects found.
        </p>
    `;

    return;

}


projectsContainer.innerHTML =
    projects.map(
        project => {

            const technologies =
                parseTechnologies(
                    project.technologies
                );


            return `

            <div
                class="project-admin-card"
            >

                ${
                    project.image
                        ? `
                        <img
                            src="${escapeHtml(
                                project.image
                            )}"
                            alt="${escapeHtml(
                                project.title || "Project"
                            )}"
                            class="project-admin-image"
                        >
                        `
                        : ""
                }


                <h3>
                    ${escapeHtml(
                        project.title || ""
                    )}
                </h3>


                <p>
                    ${escapeHtml(
                        project.description || ""
                    )}
                </p>


                ${
                    technologies.length
                        ? `
                        <div
                            class="project-technologies"
                        >

                            ${technologies.map(
                                tech => `
                                <span
                                    class="project-tech"
                                >
                                    ${escapeHtml(
                                        tech
                                    )}
                                </span>
                                `
                            ).join("")}

                        </div>
                        `
                        : ""
                }


                <div
                    class="project-links"
                >

                    ${
                        project.github_url
                            ? `
                            <a
                                href="${escapeHtml(
                                    project.github_url
                                )}"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub
                            </a>
                            `
                            : ""
                    }


                    ${
                        project.demo_url
                            ? `
                            <a
                                href="${escapeHtml(
                                    project.demo_url
                                )}"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Live Demo
                            </a>
                            `
                            : ""
                    }

                </div>


                <div
                    class="project-actions"
                >

                    <button
                        class="edit-button"
                        onclick="editProject(
                            ${project.id}
                        )"
                    >
                        Edit
                    </button>


                    <button
                        class="delete-button"
                        onclick="deleteProject(
                            ${project.id}
                        )"
                    >
                        Delete
                    </button>

                </div>

            </div>

            `;

        }
    ).join("");

}

/* =========================
ADD PROJECT BUTTON
========================= */

addProjectButton.addEventListener(
"click",
function () {

    projectForm.reset();


    document.getElementById(
        "projectId"
    ).value = "";


    formTitle.textContent =
        "Add Project";


    projectFormContainer.style.display =
        "block";


    projectMessage.textContent =
        "";


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

);

/* =========================
CLOSE / CANCEL FORM
========================= */

function closeProjectForm() {

    projectForm.reset();

    document.getElementById(
        "projectId"
    ).value = "";

    projectFormContainer.style.display =
        "none";

    projectMessage.textContent = "";

}


/* × CLOSE BUTTON */

document
    .getElementById("closeProjectForm")
    .addEventListener(
        "click",
        closeProjectForm
    );


/* CANCEL BUTTON */

document
    .getElementById("cancelProjectButton")
    .addEventListener(
        "click",
        closeProjectForm
    );

/* =========================
SAVE PROJECT
========================= */

projectForm.addEventListener(
"submit",
async function (event) {

    event.preventDefault();


    const id =
        document.getElementById(
            "projectId"
        ).value;


    const title =
        document.getElementById(
            "title"
        ).value.trim();


    const description =
        document.getElementById(
            "description"
        ).value.trim();


    const image =
        document.getElementById(
            "image"
        ).value.trim();


    const github_url =
        document.getElementById(
            "github_url"
        ).value.trim();


    const demo_url =
        document.getElementById(
            "demo_url"
        ).value.trim();


    const technologies =
        document.getElementById(
            "technologies"
        ).value.trim();


    const featured =
        document.getElementById(
            "featured"
        ).checked;


    const projectData = {

        title,

        description,

        image,

        github_url,

        demo_url,

        technologies,

        featured

    };


    try {

        const url = id
            ? `${API}/projects/${id}`
            : `${API}/projects`;


        const method = id
            ? "PUT"
            : "POST";


        const response =
            await fetch(
                url,
                {
                    method,

                    headers:
                        getHeaders(),

                    body:
                        JSON.stringify(
                            projectData
                        )
                }
            );


        const result =
            await response.json();


        console.log(
            "Save project:",
            result
        );


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Failed to save project."
            );

        }


        projectMessage.textContent =
            id
                ? "Project updated successfully."
                : "Project created successfully.";


        projectForm.reset();


        document.getElementById(
            "projectId"
        ).value = "";


        projectFormContainer.style.display =
            "none";


        await loadProjects();


    } catch (error) {

        console.error(
            "Save project error:",
            error
        );


        projectMessage.textContent =
            error.message ||
            "Failed to save project.";

    }

}

);




/* =========================
EDIT PROJECT
========================= */

async function editProject(id) {

try {

    const response =
        await fetch(
            `${API}/projects/${id}`,
            {
                method: "GET",

                headers:
                    getHeaders()
            }
        );


    const result =
        await response.json();


    console.log(
        "Project:",
        result
    );


    if (!response.ok) {

        throw new Error(
            result.message ||
            "Failed to load project."
        );

    }


    const project =
        result.data;


    if (!project) {

        throw new Error(
            "Project not found."
        );

    }


    document.getElementById(
        "projectId"
    ).value =
        project.id;


    document.getElementById(
        "title"
    ).value =
        project.title || "";


    document.getElementById(
        "description"
    ).value =
        project.description || "";


    document.getElementById(
        "image"
    ).value =
        project.image || "";


    document.getElementById(
        "github_url"
    ).value =
        project.github_url || "";


    document.getElementById(
        "demo_url"
    ).value =
        project.demo_url || "";


    document.getElementById(
        "technologies"
    ).value =
        project.technologies || "";


    document.getElementById(
        "featured"
    ).checked =
        project.featured === true;


    formTitle.textContent =
        "Edit Project";


    projectFormContainer.style.display =
        "block";


    projectMessage.textContent =
        "";


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });


} catch (error) {

    console.error(
        "Edit project error:",
        error
    );


    projectMessage.textContent =
        error.message ||
        "Failed to load project.";

}

}

/* =========================
DELETE PROJECT
========================= */

async function deleteProject(id) {

const confirmed =
    confirm(
        "Are you sure you want to delete this project?"
    );


if (!confirmed) {

    return;

}


try {

    const response =
        await fetch(
            `${API}/projects/${id}`,
            {
                method: "DELETE",

                headers:
                    getHeaders()
            }
        );


    const result =
        await response.json();


    console.log(
        "Delete project:",
        result
    );


    if (!response.ok) {

        throw new Error(
            result.message ||
            "Failed to delete project."
        );

    }


    projectMessage.textContent =
        "Project deleted successfully.";


    await loadProjects();


} catch (error) {

    console.error(
        "Delete project error:",
        error
    );


    projectMessage.textContent =
        error.message ||
        "Failed to delete project.";

}

}

/* =========================
TECHNOLOGIES
========================= */

function parseTechnologies(
technologies
) {

if (!technologies) {

    return [];

}


if (Array.isArray(
    technologies
)) {

    return technologies;

}


return String(
    technologies
)
    .split(",")
    .map(
        item =>
            item.trim()
    )
    .filter(Boolean);

}

/* =========================
HTML ESCAPE
========================= */

function escapeHtml(
value
) {

return String(value)

    .replaceAll(
        "&",
        "&amp;"
    )

    .replaceAll(
        "<",
        "&lt;"
    )

    .replaceAll(
        ">",
        "&gt;"
    )

    .replaceAll(
        '"',
        "&quot;"
    )

    .replaceAll(
        "'",
        "&#039;"
    );

}

/* =========================
START
========================= */

loadProjects();