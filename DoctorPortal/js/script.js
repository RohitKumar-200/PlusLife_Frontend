//Authentication
if(!localStorage.getItem('auth-token')) {
    alert("Error: Login Required");
    window.location = '../Home';
} else {

let doctorToken = '';
//-------------------------------------------------------------------------------------//
// Pending Appointments
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const pendingAppointmentFun = () => {
    const date = (document.getElementById('todayRadio').checked)? today.getDate(): tomorrow.getDate();
    fetch("https://pluslife-api.herokuapp.com/meetings/doctor?date="+date, {
        headers: {
            "auth-token": localStorage.getItem("auth-token")
        }
    }).then(response => {
        if(response.ok) {
            return response.json();
        }
    }).then(jsonResponse => {
        // console.log(jsonResponse);
        const tokenDetails = jsonResponse.tokenDetails;
        const meetingList = jsonResponse.meetings;
        if(tokenDetails && meetingList){
            doctorToken = tokenDetails._id;
        document.getElementById('currentToken').innerHTML = tokenDetails.currentTokenNo;
        document.getElementById('totalTokens').innerHTML = tokenDetails.totalTokens;

        const temp = document.getElementById('pendingAppointmentTemplate').innerHTML;
        const tempFun = Handlebars.compile(temp)
        const html = tempFun({arr: meetingList});
        document.getElementById("pendingAppointments").innerHTML = html;
        } else {
        document.getElementById("pendingAppointments").innerHTML = "No pending appointments";
        }
    }).catch(err => {
        alert(err);
    });
}
pendingAppointmentFun();

document.getElementById('todayRadio').addEventListener('click', ()=>{
    pendingAppointmentFun();
});
document.getElementById('tomorrowRadio').addEventListener('click', ()=>{
    pendingAppointmentFun();
});

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

//-------------------------------------------------------------------------------------------//
// Function to change current token and redirect to meeting
function joinMeetingClick(newCurrentToken, meetingUrl) {
    fetch("https://pluslife-api.herokuapp.com/changeCurrentTokenNo", {
        method: "POST",
        headers: {
            "auth-token": localStorage.getItem("auth-token"),
            "content-type": "application/json"
        },
        body: JSON.stringify({
            doctorToken: doctorToken,
            newCurrentToken: newCurrentToken
        })
    }).then(response => {
        if(response.ok) {
            pendingAppointmentFun();
            return response.json();
        }
    }).then(jsonResponse => {
        // console.log(jsonResponse);
        window.location = meetingUrl;
    }).catch(err => {
        alert(err);
    });
}

//--------------------------------------------------------------------//
//To logout
document.getElementById('logoutLink').addEventListener('click', ()=>{
    localStorage.removeItem("auth-token");
    localStorage.removeItem("zoomMeetingUrl");
    window.location.href = "../Home";
});


}