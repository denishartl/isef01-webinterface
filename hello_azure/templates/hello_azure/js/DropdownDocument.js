$(document).ready(function () {
    const selectedDocumentDropdown = document.getElementById('selectedDocument');
    const customDocumentInput = document.getElementById('customDocument');

    async function updateDocumentDropdown(course_Id, document_doctype) {
        try {
            let apiUrl = 'https://iu-isef01-functionapp.azurewebsites.net/api/GetDocumentsByCourseandType?course=' + course_Id;

            if (document_doctype) {
                apiUrl += '&doctype=' + document_doctype;
            }

            const response = await fetch(apiUrl);
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
        const selectedDocumentType = $('#doctype').val();
        updateDocumentDropdown(selectedCourseId, selectedDocumentType);
    });

    $('#doctype').on('change', function () {
        const selectedCourseId = $('#dynamicDropdownCourse').val();
        const selectedDocumentType = $(this).val();
        updateDocumentDropdown(selectedCourseId, selectedDocumentType);
    });
});