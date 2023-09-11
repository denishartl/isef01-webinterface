$(document).ready(function () {
    const selectedDocumentDropdown = document.getElementById('selectedDocument');
    const customDocumentInput = document.getElementById('customDocument');

    async function updateDocumentDropdown(course_Id) {
        try {

            const response = await fetch('https://iu-isef01-functionapp.azurewebsites.net/api/GetDocumentsByCourse?course=' + course_Id);
            const data = await response.json();

            selectedDocumentDropdown.innerHTML = '';

            data.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.id;
                optionElement.textContent = option.title;
                selectedDocumentDropdown.appendChild(optionElement);
            });

            $(selectedDocumentDropdown).select2(); 
        } catch (error) {
            console.error('Fehler beim Befüllen der Dokumenten-Dropdown-Liste:', error);
        }
    }

    $('#dynamicDropdownCourse').on('change', function () {
        const selectedCourseId = $(this).val();
        updateDocumentDropdown(selectedCourseId);
    });
});
