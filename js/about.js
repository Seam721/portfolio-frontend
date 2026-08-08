const API =
    "https://portfolio-backend-production-5e12.up.railway.app/api";

async function loadAbout() {

    try {

        const response =
            await fetch(`${API}/profile`);

        const result =
            await response.json();

        const profile =
            result.data;

        document.getElementById(
            "about-name"
        ).textContent =
            profile.full_name;

        document.getElementById(
            "about-title"
        ).textContent =
            profile.title;

        document.getElementById(
            "about-bio"
        ).textContent =
            profile.bio;

        if (profile.profile_image) {

            document.getElementById(
                "about-image"
            ).src =
                `${API.replace("/api", "")}${profile.profile_image}`;

        }

        if (profile.github_url) {

            document.getElementById(
                "github-link"
            ).href =
                profile.github_url;

        }

        if (profile.linkedin_url) {

            document.getElementById(
                "linkedin-link"
            ).href =
                profile.linkedin_url;

        }

        if (profile.cv_file) {

            document.getElementById(
                "cv-link"
            ).href =
                `${API.replace("/api", "")}${profile.cv_file}`;

        }

    } catch (error) {

        console.error(
            "About Error:",
            error
        );

    }
}

loadAbout();
