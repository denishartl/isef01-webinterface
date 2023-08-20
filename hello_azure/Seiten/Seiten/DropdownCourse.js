// script.js

const dropdown = course.getElementById('dynamicDropdownCourse');

// Funktion zum Befüllen der Dropdown-Liste
async function populateDropdown() {
    try {
        const response = await fetch('http://localhost:7871/api/GetCourse');
        const data = await response.json();

        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.name;
            dropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Fehler beim Befüllen der Dropdown-Liste:', error);
    }
}

// Dropdown beim Laden der Seite befüllen
populateDropdown();
