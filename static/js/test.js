var dropdown = document.getElementById('dynamicDropdown');

async function populateDropdown() {
    try {
        var response = await fetch('https://iu-isef01-functionapp.azurewebsites.net/api/GetCourses/', {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*', 
            }
        });
        var jsonStr = await response.text();
        var data = JSON.parse(jsonStr);
        
        data.forEach(option => {
            var optionElement = document.createElement('option');
            optionElement.value = option.id; 
            optionElement.textContent = option.shortname; 
            dropdown.appendChild(optionElement);
        });
    } catch (error) {
        console.error('Fehler beim Befüllen der Dropdown-Liste:', error);
    }
}
populateDropdown();
