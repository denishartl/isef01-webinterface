window.onload = function () {
    const dropdown = document.getElementById('dynamicDropdownCourse');

    async function populateDropdown() {
        try {
            const response = await fetch('https://iu-isef01-functionapp.azurewebsites.net/api/GetCourses?');
            const data = await response.json();

            // Fügt Daten zum Dropdown-Feld hinzu
            data.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.id;
                optionElement.textContent = option.shortname;
                dropdown.appendChild(optionElement);
            });

            // Initialisiert Dropdown-Feld mit Select2
            $(dropdown).select2(); 
        } catch (error) {
            console.error('Fehler beim Befüllen der Dropdown-Liste:', error);
        }
    }

    populateDropdown();
};