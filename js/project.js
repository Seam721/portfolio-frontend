const API =
"https://portfolio-backend-production-5e12.up.railway.app/api";

const token =
localStorage.getItem("token");

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

/*
API headers
*/

function getHeaders() {

return {

    "Content-Type":
        "application/json",

    "Authorization":
        `Bearer ${token}`

};

}

/*
Load projects
*/

async function loadProjects() {

try {

    projectsContainer.innerHTML =
        "<p>Loading projects...</p>";


    const response =
        await fetch(
            `${API}/projects`,
            {
                method: "GET",
                headers: getHeaders()
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
        result.data ||
        result.projects ||
        [];


    displayProjects(projects);


} catch (error) {

    console.error(
        "Load projects error:",
        error
    );


    projectsContainer.innerHTML = `
        <p>
            Cannot load projects.
        </p>
    `;

}

}

/*
Display projects
*/

function displayProjects(projects) {

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
    projects.map(project => `

        <div
            class="project-admin-card"
        >

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

    `).join("");

}

/*
Open Add Project form
*/

addProjectButton.addEventListener(
"click",
function () {

    formTitle.textContent =
        "Add Project";

    projectForm.reset();

    document.getElementById(
        "projectId"
    ).value = "";

    projectFormContainer.style.display =
        "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

);

/*
Cancel
*/

cancelProjectButton.addEventListener(
"click",
function () {

    projectForm.reset();

    projectFormContainer.style.display =
        "none";

}

);

/*
Save Project
*/

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


    const github_url =
        document.getElementById(
            "github_url"
        ).value.trim();


    const projectData = {

        title,

        description,

        github_url

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

/*
Edit Project
*/

async function editProject(id) {

try {

    const response =
        await fetch(
            `${API}/projects/${id}`,
            {
                method: "GET",
                headers: getHeaders()
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
        result.data ||
        result.project;


    if (!project) {

        throw new Error(
            "Project data not found."
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
        "github_url"
    ).value =
        project.github_url || "";


    formTitle.textContent =
        "Edit Project";


    projectFormContainer.style.display =
        "block";


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

/*
Delete Project
*/

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
                headers: getHeaders()
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

/*
Basic HTML escaping
*/

function escapeHtml(value) {

return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}

/*
Start
*/

loadProjects();