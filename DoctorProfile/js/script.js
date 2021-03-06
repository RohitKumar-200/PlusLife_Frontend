let response;

if (window.location.href.split("?")[1]) {
    response = fetch(
        "https://pluslife-api.herokuapp.com/profile?" +
            window.location.href.split("?")[1]
    );
} else if (localStorage.getItem("auth-token")) {
    response = fetch("https://pluslife-api.herokuapp.com/myProfile", {
        headers: {
            "auth-token": localStorage.getItem("auth-token"),
        },
    });
} else {
    alert("Error: Login / Email parameter required");
}
if(response)
response
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Login / Email parameter required");
        }
    })
    .then((profile) => {
        document.getElementById('profileDetails').innerHTML = `
        <ul type="disc">
            <li style="padding: 0.5em;">Name : ${profile.name}</li>
            <li style="padding: 0.5em;">Phone Number : ${profile.phoneNo}</li>
            <li style="padding: 0.5em;">Age : ${profile.age}</li>
            <li style="padding: 0.5em;">Email : ${profile.email}</li>
            <li style="padding: 0.5em;">Address : ${profile.address}</li>
            <li style="padding: 0.5em;">Alternate Phone Number : ${profile.altPhoneNo}</li>
            <li style="padding: 0.5em;">Gender : ${profile.gender}</li>
            <li style="padding: 0.5em;">Degree : ${profile.degree}</li>
            <li style="padding: 0.5em;">Specialization : ${profile.specialization}</li>
            <li style="padding: 0.5em;">Work Experience: ${profile.workExperience} years</li>
            <li style="padding: 0.5em;">Working Week days: ${profile.weekDays}</li>
            <li style="padding: 0.5em;">Fees: ${profile.fees}</li>
            <li style="padding: 0.5em;">Timings: ${profile.timings}</li>
            <li style="padding: 0.5em;"><a href="${profile.certificates}" class="button">Degree/Specialization Certificates</a></li>
        </ul>
        `;
        if(profile.profilePic && profile.profilePic !=''){
            document.getElementById('profilePic').src = profile.profilePic;
        }
    })
    .catch((err) => {
        alert(err);
    });
