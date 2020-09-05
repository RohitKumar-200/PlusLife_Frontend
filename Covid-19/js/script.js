document.getElementById("checkButton").addEventListener("click", (e) => {
    e.preventDefault();
    let percentage = 0;
    document
        .querySelectorAll('input[type="checkbox"]')
        .forEach((e) => {
            if (e.checked) {
                percentage += Number(e.value);
            }
        });
    document.getElementById("output-percentage").innerHTML = percentage.toFixed(
        2
    );
    let risk = '';
    if(percentage > 42) {
        risk = "High probability of having Covid-19 disease, consult a doctor immediately";
    } else if(percentage > 25) {
        risk = "Medium probability of having Covid-19 disease, consult a doctor";
    } else {
        risk = "Low probability of having Covid-19 disease";
    }
    document.getElementById('conclusion').innerHTML = risk;
});
