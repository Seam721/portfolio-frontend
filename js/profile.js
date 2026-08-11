const API_URL = "http://localhost:5000/api";
const API = "https://portfolio-backend-production-5e12.up.railway.app/api";

// ========================================
// ELEMENTS
// ========================================

const profileForm =
    document.getElementById("profileForm");

const fullName =
    document.getElementById("full_name");

const title =
    document.getElementById("title");

const email =
    document.getElementById("email");

const phone =
    document.getElementById("phone");

const locationField =
    document.getElementById("location");

const website =
    document.getElementById("website");

const bio =
    document.getElementById("bio");

const profileImage =
    document.getElementById("profile_image");

const resumeUrl =
    document.getElementById("resume_url");

const github =
    document.getElementById("github");

const linkedin =
    document.getElementById("linkedin");

const facebook =
    document.getElementById("facebook");

const telegram =
    document.getElementById("telegram");

const saveProfileButton =
    document.getElementById("saveProfileButton");


// ========================================
// LOAD PROFILE
// ========================================

async function loadProfile() {

    try {

        console.log("Loading profile...");


        const response = await fetch(
            `${API_URL}/profile`
        );


        const result =
            await response.json();


        console.log(
            "Profile API:",
            result
        );


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Failed to load profile."
            );

        }


        const profile =
            result.data || result;


        // ========================================
        // BASIC INFORMATION
        // ========================================

        fullName.value =
            profile.full_name || "";


        title.value =
            profile.title || "";


        email.value =
            profile.email || "";


        phone.value =
            profile.phone || "";


        locationField.value =
            profile.location || "";


        website.value =
            profile.website || "";


        bio.value =
            profile.bio || "";


        profileImage.value =
            profile.profile_image ||
            profile.profile_image_url ||
            "";


        resumeUrl.value =
            profile.resume_url || "";


        // ========================================
        // SOCIAL LINKS
        // ========================================

        github.value =
            profile.github || "";


        linkedin.value =
            profile.linkedin || "";


        facebook.value =
            profile.facebook || "";


        telegram.value =
            profile.telegram || "";


        console.log(
            "Profile loaded successfully."
        );


    } catch (error) {

        console.error(
            "Load profile error:",
            error
        );


        alert(
            "Failed to load profile."
        );

    }

}


// ========================================
// SAVE PROFILE
// ========================================

async function saveProfile(event) {

    event.preventDefault();


    // ========================================
    // GET FORM DATA
    // ========================================

    const profileData = {

        full_name:
            fullName.value.trim(),

        title:
            title.value.trim(),

        email:
            email.value.trim(),

        phone:
            phone.value.trim(),

        location:
            locationField.value.trim(),

        website:
            website.value.trim(),

        bio:
            bio.value.trim(),

        profile_image:
            profileImage.value.trim(),

        resume_url:
            resumeUrl.value.trim(),

        github:
            github.value.trim(),

        linkedin:
            linkedin.value.trim(),

        facebook:
            facebook.value.trim(),

        telegram:
            telegram.value.trim()

    };


    // ========================================
    // VALIDATION
    // ========================================

    if (!profileData.full_name) {

        alert(
            "Please enter your full name."
        );

        fullName.focus();

        return;

    }


    if (!profileData.title) {

        alert(
            "Please enter your professional title."
        );

        title.focus();

        return;

    }


    if (!profileData.bio) {

        alert(
            "Please enter your biography."
        );

        bio.focus();

        return;

    }


    // ========================================
    // BUTTON LOADING
    // ========================================

    const originalButton =
        saveProfileButton.innerHTML;


    saveProfileButton.disabled = true;


    saveProfileButton.innerHTML = `
        <span>⏳</span>
        Saving...
    `;


    try {

        console.log(
            "Saving profile:",
            profileData
        );


        const response = await fetch(
            `${API_URL}/profile`,
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(
                        profileData
                    )
            }
        );


        const result =
            await response.json();


        console.log(
            "Save profile response:",
            result
        );


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Failed to save profile."
            );

        }


        alert(
            "Profile updated successfully."
        );


        // Reload latest data

        await loadProfile();


    } catch (error) {

        console.error(
            "Save profile error:",
            error
        );


        alert(
            error.message ||
            "Failed to save profile."
        );


    } finally {

        saveProfileButton.disabled =
            false;


        saveProfileButton.innerHTML =
            originalButton;

    }

}


// ========================================
// FORM EVENT
// ========================================

profileForm.addEventListener(
    "submit",
    saveProfile
);


// ========================================
// INITIAL LOAD
// ========================================

loadProfile();