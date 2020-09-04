const myForm = document.getElementById("loginForm");

myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    this.querySelector("button[type='submit']").innerHTML="LOADING";
    const formData = {};
    this.querySelectorAll("input").forEach((e) => {
        formData[e.name] = e.value;
    });
    console.log(formData);

    fetch("https://pluslife-api.herokuapp.com/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { 
            "Content-type": "application/json; charset=UTF-8"
        } 
    })
    .then(function (response) {
        if (response.ok) {
						localStorage.setItem('auth-token',response.headers.get('auth-token'));
            return response.json();
        } else {
            throw new Error("Email or Password Incorrect");
        }
    })
    .then((jsonResponse)=>{
        if(jsonResponse.designation == 'doctor') {
            window.location = '../DoctorPortal';
        } else if (jsonResponse.designation == 'patient') {
            window.location = '../PatientPortal';
        }
    })
    .catch((err) => {
        alert(err);
    });
});
