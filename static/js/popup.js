document.getElementById("callFunction").addEventListener("click", () => {
    fetch("hhttps://iu-isef01-functionapp.azurewebsites.net/api/CreateTicket?code=Lwxj3HyBdBta0G9OjlJrpxR-uzple7iu44aXbZ2MHxPCAzFu3pwm3A==")
        .then(response => response.json())
        .then(data => {
            document.getElementById("result").textContent = JSON.stringify(data);
        })
        .catch(error => {
            console.error("Fehler beim Aufrufen der Funktion:", error);
        });
});