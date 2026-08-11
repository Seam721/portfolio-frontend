const API_URL =
    "https://portfolio-backend-production-5e12.up.railway.app/api";


// ========================================
// ELEMENTS
// ========================================

const skillsContainer =
    document.getElementById("skillsContainer");

const skillFormContainer =
    document.getElementById("skillFormContainer");

const skillForm =
    document.getElementById("skillForm");

const addSkillButton =
    document.getElementById("addSkillButton");

const closeSkillForm =
    document.getElementById("closeSkillForm");

const cancelSkillButton =
    document.getElementById("cancelSkillButton");

const skillFormTitle =
    document.getElementById("skillFormTitle");

const skillId =
    document.getElementById("skillId");

const skillName =
    document.getElementById("skillName");

const skillCategory =
    document.getElementById("skillCategory");

const skillLevel =
    document.getElementById("skillLevel");

const skillPercentage =
    document.getElementById("skillPercentage");


// ========================================
// AUTH TOKEN
// ========================================

function getToken() {

    const token =
        localStorage.getItem("token");

    if (!token) {

        console.error(
            "No authentication token found."
        );

        alert(
            "Your session has expired. Please login again."
        );

        return null;
    }

    return token;
}


// ========================================
// AUTH HEADERS
// ========================================

function getHeaders() {

    const token =
        getToken();

    if (!token) {
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
// LOAD SKILLS
// ========================================

async function loadSkills() {

    try {

        skillsContainer.innerHTML =
            "<p>Loading skills...</p>";


        const headers =
            getHeaders();


        if (!headers) {
            return;
        }


        const response =
            await fetch(
                `${API_URL}/skills`,
                {
                    method: "GET",
                    headers: headers
                }
            );


        const result =
            await response.json();


        console.log(
            "Skills API:",
            result
        );


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Failed to load skills."
            );

        }


        const skills =
            result.data || result;


        displaySkills(skills);


    } catch (error) {

        console.error(
            "Load skills error:",
            error
        );


        skillsContainer.innerHTML = `

            <div class="projects-empty">

                <h3>
                    Failed to Load Skills
                </h3>

                <p>
                    ${escapeHtml(error.message)}
                </p>

            </div>

        `;

    }

}


// ========================================
// DISPLAY SKILLS
// ========================================

function displaySkills(skills) {

    if (
        !Array.isArray(skills) ||
        skills.length === 0
    ) {

        skillsContainer.innerHTML = `

            <div class="projects-empty">

                <h3>
                    No Skills Found
                </h3>

                <p>
                    Add your first skill to your portfolio.
                </p>

            </div>

        `;

        return;

    }


    skillsContainer.innerHTML =
        skills.map(skill => {

            const percentage =
                Number(
                    skill.proficiency ||
                    skill.percentage ||
                    0
                );


            return `

                <div
                    class="skill-card"
                    data-id="${skill.id}"
                >

                    <div class="skill-card-header">

                        <div>

                            <h3>
                                ${escapeHtml(
                                    skill.name ||
                                    skill.skill_name ||
                                    ""
                                )}
                            </h3>


                            ${
                                skill.category
                                    ? `
                                        <span class="skill-category">
                                            ${escapeHtml(
                                                skill.category
                                            )}
                                        </span>
                                    `
                                    : ""
                            }

                        </div>


                        <span class="skill-level">

                            ${escapeHtml(
                                skill.level ||
                                skill.skill_level ||
                                ""
                            )}

                        </span>

                    </div>


                    <div class="skill-progress">

                        <div
                            class="skill-progress-bar"
                            style="width: ${percentage}%"
                        ></div>

                    </div>


                    <div
                        style="
                            margin-top: 7px;
                            font-size: 12px;
                            color: #6b7280;
                        "
                    >

                        ${percentage}% proficiency

                    </div>


                    <div class="skill-actions">

                        <button
                            type="button"
                            class="edit-skill-button"
                            onclick="editSkill(${skill.id})"
                        >
                            Edit
                        </button>


                        <button
                            type="button"
                            class="delete-skill-button"
                            onclick="deleteSkill(${skill.id})"
                        >
                            Delete
                        </button>

                    </div>

                </div>

            `;

        }).join("");

}


// ========================================
// OPEN ADD FORM
// ========================================

function openAddSkillForm() {

    skillForm.reset();

    skillId.value = "";


    skillFormTitle.textContent =
        "Add Skill";


    skillFormContainer.style.display =
        "block";


    skillName.focus();


    skillFormContainer.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// ========================================
// CLOSE FORM
// ========================================

function closeForm() {

    skillForm.reset();

    skillId.value = "";


    skillFormTitle.textContent =
        "Add Skill";


    skillFormContainer.style.display =
        "none";

}


// ========================================
// EDIT SKILL
// ========================================

async function editSkill(id) {

    try {

        const headers = getHeaders();

        if (!headers) {
            return;
        }

        const response = await fetch(
            `${API_URL}/skills/${id}`,
            {
                method: "GET",
                headers: headers
            }
        );

        const result = await response.json();

        console.log("Edit Skill API:", result);

        if (!response.ok) {
            throw new Error(
                result.message ||
                "Failed to load skill."
            );
        }

        const skill = result.data || result;

        console.log("Skill being edited:", skill);

        // Fill hidden ID
        skillId.value = skill.id;

        // Fill form
        skillName.value =
            skill.name ||
            "";

        skillCategory.value =
            skill.category ||
            "";

        skillLevel.value =
            skill.level ||
            "";

        skillPercentage.value =
            skill.proficiency ?? 0;

        // Change title
        skillFormTitle.textContent =
            "Edit Skill";

        // Show form
        skillFormContainer.style.display =
            "block";

        // Scroll to form
        skillFormContainer.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        skillName.focus();

    } catch (error) {

        console.error(
            "Edit skill error:",
            error
        );

        alert(
            error.message ||
            "Failed to load skill."
        );
    }
}


// ========================================
// SAVE SKILL
// ========================================

async function saveSkill(event) {

    event.preventDefault();

    const id =
        skillId.value.trim();

    const proficiency =
        Number(
            skillPercentage.value
        );


    // ========================================
    // VALIDATION
    // ========================================

    if (!skillName.value.trim()) {

        alert(
            "Please enter a skill name."
        );

        return;
    }


    if (!skillCategory.value) {

        alert(
            "Please select a category."
        );

        return;
    }


    if (!skillLevel.value) {

        alert(
            "Please select a skill level."
        );

        return;
    }


    if (
        Number.isNaN(proficiency) ||
        proficiency < 0 ||
        proficiency > 100
    ) {

        alert(
            "Proficiency must be between 0 and 100."
        );

        return;
    }


    const skillData = {

        name:
            skillName.value.trim(),

        category:
            skillCategory.value,

        level:
            skillLevel.value,

        proficiency:
            proficiency
    };


    console.log(
        "Submitting skill:",
        skillData
    );


    try {

        const headers =
            getHeaders();

        if (!headers) {
            return;
        }


        const url =
            id
                ? `${API_URL}/skills/${id}`
                : `${API_URL}/skills`;


        const method =
            id
                ? "PUT"
                : "POST";


        console.log(
            "Request:",
            method,
            url,
            skillData
        );


        const response =
            await fetch(
                url,
                {
                    method: method,

                    headers: headers,

                    body:
                        JSON.stringify(
                            skillData
                        )
                }
            );


        const result =
            await response.json();


        console.log(
            "Save Skill API:",
            result
        );


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Failed to save skill."
            );
        }


        alert(
            id
                ? "Skill updated successfully."
                : "Skill added successfully."
        );


        closeForm();

        await loadSkills();


    } catch (error) {

        console.error(
            "Save skill error:",
            error
        );

        alert(
            error.message ||
            "Failed to save skill."
        );
    }
}


// ========================================
// DELETE SKILL
// ========================================

async function deleteSkill(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this skill?"
        );


    if (!confirmed) {
        return;
    }


    try {

        const headers =
            getHeaders();


        if (!headers) {
            return;
        }


        const response =
            await fetch(
                `${API_URL}/skills/${id}`,
                {
                    method: "DELETE",
                    headers: headers
                }
            );


        const result =
            await response.json();


        console.log(
            "Delete skill:",
            result
        );


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Failed to delete skill."
            );

        }


        alert(
            "Skill deleted successfully."
        );


        loadSkills();


    } catch (error) {

        console.error(
            "Delete skill error:",
            error
        );


        alert(
            error.message ||
            "Failed to delete skill."
        );

    }

}


// ========================================
// ESCAPE HTML
// ========================================

function escapeHtml(value) {

    const div =
        document.createElement("div");


    div.textContent =
        value ?? "";


    return div.innerHTML;

}


// ========================================
// EVENTS
// ========================================

addSkillButton.addEventListener(
    "click",
    openAddSkillForm
);


closeSkillForm.addEventListener(
    "click",
    closeForm
);


cancelSkillButton.addEventListener(
    "click",
    closeForm
);


skillForm.addEventListener(
    "submit",
    saveSkill
);


// ========================================
// INITIAL LOAD
// ========================================

loadSkills();