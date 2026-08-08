async function loadDashboard(){

    const token =
    localStorage.getItem("token");


    if(!token){

        window.location.href="login.html";
        return;

    }


    const response =
    await fetch(
        "http://localhost:5000/api/dashboard",
        {
            headers:{
                Authorization:
                `Bearer ${token}`
            }
        }
    );


    const data =
    await response.json();



    if(!data.success){

        localStorage.removeItem("token");
        window.location.href="login.html";
        return;

    }


    document.getElementById("total")
    .innerText =
    data.data.totalMessages;



    const table =
    document.getElementById("messages");


    table.innerHTML="";


    data.data.latestMessages.forEach(item=>{


        table.innerHTML += `

        <tr>

        <td>${item.name}</td>

        <td>${item.email}</td>

        <td>${item.message}</td>

        <td>${item.created_at}</td>

        </tr>

        `;


    });


}


loadDashboard();