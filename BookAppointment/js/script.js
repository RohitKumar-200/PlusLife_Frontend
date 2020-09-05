//Authentication
if(!localStorage.getItem('auth-token')) {
    alert("Error: Login Required");
    window.location = '../Home';
} else {

fetch("https://pluslife-api.herokuapp.com/profile?" + window.location.href.split("?")[1])
.then((response) => {
    if (response.ok) {
        return response.json();
    }
})
.then((profile) => {
    const profileUrl = (profile.profilePic && profile.profilePic !== '')? profile.profilePic: '../images/davatar.jpg" height="150px';
    document.getElementById('profileDetails').innerHTML = 
        `
        <div class="profile-grid-cell row-1-3">
            <img src="${profileUrl}" height="150px" class="avatar">
        </div>
        <div class="profile-grid-cell ">
            <input type="button" class="button" value="Doctor Name : ${profile.name}">
        </div>
        <div class="profile-grid-cell">
            <input type="button" class="button" value="Degree : ${profile.degree}">
        </div>
        <div class="profile-grid-cell">
            <input type="button" class="button" value="Specialization : ${profile.specialization}">
        </div>
        <div class="profile-grid-cell">
            <input type="button" class="button" value="Email : ${profile.email}">
        </div>
        <div class="profile-grid-cell">
            <input type="button" class="button" value="Phone Number : ${profile.phoneNo}">
        </div>
        <div class="profile-grid-cell">
            <input type="button" class="button" value="Fees : ${profile.fees} rs">
        </div>
        <div class="profile-grid-cell">
            <input type="button" class="button" value="Address : ${profile.address}">
        </div>
        <div class="profile-grid-cell">
            <input type="button" class="button" value="Working Week Days : ${profile.workingWeekDays}">
        `;
})
.catch((err) => {
    alert(err);
});

//-------------------------------------------------------------------------------------//
// New appointment
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

document.getElementById('bookAppointmentSubmit').addEventListener('click', (e)=>{
    e.preventDefault();
    const meetingObj = {};
    meetingObj.meetingUrl = localStorage.getItem('zoomMeetingUrl');
    meetingObj.date = (document.getElementById('todayRadio').checked)? today.getDate(): tomorrow.getDate();
    meetingObj.doctorEmail = window.location.href.split("?")[1].split('=')[1];
    // console.log(meetingObj);
    fetch("https://pluslife-api.herokuapp.com/newMeeting", {
        method: "POST", 
        headers: {
            "auth-token": localStorage.getItem("auth-token"),
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(meetingObj)
    })
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Request failed!,please try again later!');
    })
    .then((jsonResponse)=>{
        alert('Appointment Fixed!');
        window.location = '../PatientPortal';
    }).catch(err => {
        alert(err)
    });
});

//---------------------------------------------------------------------------------------//
// Generate Meeting Url
window.setInterval(()=>{
    if(localStorage.getItem('zoomMeetingUrl')) {
        document.getElementById('bookAppointmentSubmit').style="";
    }
}, 1000);

const url = 'https://zoom.us/oauth/authorize?response_type=code&client_id=X5DpimFZRDf6ItkWSl_jw&redirect_uri=https%3A%2F%2Fplus-life.herokuapp.com%2FBookAppointment%2FZoomCallback%2F';

document.getElementById('generateMeetingUrl').addEventListener('click', ()=>{
    window.open(url, "newWin", "width="+screen.availWidth+",height="+screen.availHeight);
});



}