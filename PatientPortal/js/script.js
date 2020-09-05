// Authentication
if(!localStorage.getItem('auth-token')) {
    alert("Error: Login Required");
    window.location = '../Home';
} else {

// Pending Appointments
const pendingAppointmentFun = () => {
    fetch("https://pluslife-api.herokuapp.com/meetings/patient", {
        headers: {
            "auth-token": localStorage.getItem("auth-token")
        }
    }).then(response => {
        if(response.ok) {
            return response.json();
        }
    }).then(jsonResponse => {
        // console.log(jsonResponse);
        const arr = jsonResponse;
        const temp = document.getElementById('pendingAppointmentTemplate').innerHTML;
        const tempFun = Handlebars.compile(temp)
        const html = tempFun({arr: arr});
        document.getElementById("pendingAppointments").innerHTML = html;
    }).catch(err => {
        alert(err);
    });
}
pendingAppointmentFun();

//-------------------------------------------------------------------------------------------//
// Delete meeting function
function deleteMeeting(meetingId) {
    fetch("https://pluslife-api.herokuapp.com/removeMeeting", {
        method: "DELETE",
        headers: {
            "auth-token": localStorage.getItem("auth-token"),
            "content-type": "application/json"
        },
        body: JSON.stringify({meetingId: meetingId})
    }).then(response => {
        if(response.ok) {
            pendingAppointmentFun();
            return response.json();
        }
    }).then(jsonResponse => {
        // console.log(jsonResponse);
    }).catch(err => {
        alert(err);
    });
}

//---------------------------------------------------------------------------------//
// Search Results (Book Appointment Section)
const searchBar = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");
const searchFun = () => {
    const searchText = searchBar.value;
    fetch("https://pluslife-api.herokuapp.com/search", {
        method: "POST",
        body: JSON.stringify({ searchStr: searchText }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "auth-token": localStorage.getItem("auth-token"),
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((jsonResponse) => {
            const searchList = jsonResponse.searchList;
            const temp = document.getElementById('searchResultTemplate').innerHTML;
            const tempFun = Handlebars.compile(temp)
            for(let i=0; i<searchList.length; i++) {
                if(!(searchList[i].profilePic && searchList[i].profilePic=='')) {
                    searchList[i].profilePic = '../images/davatar.jpg';
                }
            }
            const html = tempFun({searchList: searchList});
            document.getElementById("searchResults").innerHTML = html;
        })
        .catch((err) => {
            alert(err);
        });
};
searchFun();
searchButton.addEventListener("click", () => {
    searchFun();
});
searchBar.addEventListener("keyup", () => {
    if (event.key === "Enter") {
        event.preventDefault();
        searchFun();
    }
});

//--------------------------------------------------------------------//
//To logout
document.getElementById('logoutLink').addEventListener('click', ()=>{
    localStorage.removeItem("auth-token");
    localStorage.removeItem("zoomMeetingUrl");
    window.location.href = "../Home";
});


}
