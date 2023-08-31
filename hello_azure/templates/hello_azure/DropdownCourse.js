
const dropdown = document.getElementById('dynamicDropdownCourse');

async function populateDropdown() {
    try {
        const response = await fetch('https://iu-isef01-functionapp.azurewebsites.net/api/GetCourses?');
        const data = await response.json();

        data.forEach(item => {
            const option = document.createElement('option');
            option.textContent = course.courseName;
            option.value = course.courseId;
            dropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Fehler beim Befüllen der Dropdown-Liste:', error);
    }
}

populateDropdown();
