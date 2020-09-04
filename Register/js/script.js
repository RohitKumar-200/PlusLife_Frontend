//Form data
const getFormData = function() {
    this.querySelector("button[type='submit']").innerHTML = "LOADING";
    const formData = {};
    this.querySelectorAll("input").forEach((e) => {
        if (e.name === "gender") {
            if (e.checked) {
                formData[e.name] = e.value;
            }
        } else {
            formData[e.name] = e.value;
        }
    });
    return formData;
}

//Registration through POST request
const postRegister = (url, formData) => {
    fetch(url, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { 
            "Content-type": "application/json; charset=UTF-8"
        } 
    })
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        alert('Request failed!, email may have already taken. Check your info and try again!');
        throw new Error();
    })
    .then((jsonResponse)=>{
        alert('Successfully Registered! , Login to enjoy our services');
        window.location = '../Home';
    });
};

// Patient Registration
const patientForm = document.getElementById("patientRegistrationForm");
patientForm.addEventListener("submit", function (e) {
    e.preventDefault();
    postRegister("https://pluslife-api.herokuapp.com/register/patient", getFormData.bind(this)());
});

//Doctor Registration
const doctorForm = document.getElementById("doctorRegistrationForm");
doctorForm.addEventListener("submit", function (e) {
    e.preventDefault();
    postRegister("https://pluslife-api.herokuapp.com/register/doctor", getFormData.bind(this)());
});