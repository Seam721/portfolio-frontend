async function loadProfile(){

    try {

        console.log("Loading profile...");


        const response = await fetch(
            `${API_URL}/profile`
        );


        const result = await response.json();


        console.log("Profile API:", result);


        const profile = result.data;



        document.getElementById("name").textContent =
            profile.full_name;


        document.getElementById("title").textContent =
            profile.title;


        document.getElementById("bio").textContent =
            profile.bio;



    } catch(error){

        console.error(
            "Profile Error:",
            error
        );

    }

}


loadProfile();