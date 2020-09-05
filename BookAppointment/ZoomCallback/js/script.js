
const code = window.location.href.split('?')[1].split('=')[1];

if(code){

	fetch('https://pluslife-api.herokuapp.com/generateMeetingUrl/',{
		method: "POST",
		headers: { 
            "Content-type": "application/json; charset=UTF-8"
    },
		body: JSON.stringify({code: code, redirect_uri: window.location.href.split('?')[0]})
	}).then(response =>{
		if(response.ok){
			return response.json();
		}
	}).then(jsonResponse =>{
		localStorage.setItem('zoomMeetingUrl', jsonResponse.meetingUrl);
		window.close();
	}).catch(err =>{
		alert(err);
		window.close();
	})

}
