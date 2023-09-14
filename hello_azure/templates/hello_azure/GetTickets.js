// Funktion zum Abrufen des Dokumentennamens anhand der ID
function getDocumentTitleById(id) {
    fetch(`https://iu-isef01-functionapp.azurewebsites.net/api/GetDocument?id=${id}`)
        .then(response => response.json())
        .then(data => {
            const documentTitle = data.title;
            const tableRow = document.querySelector(`#tableRow_${id}`);
            if (tableRow) {
                const titleCell = tableRow.querySelector('.documentTitleCell');
                if (titleCell) {
                    titleCell.textContent = documentTitle;
                }
            }
        })
        .catch(error => {
            console.error('Fehler beim Abrufen des Dokumentennamens: ', error);
        });
}

// Funktion zum Abrufen der Dokumentenart anhand der ID
function getDocumentTypeById(id) {
    fetch(`https://iu-isef01-functionapp.azurewebsites.net/api/GetDocument?id=${id}`)
        .then(response => response.json())
        .then(data => {
            const documentType = data.doctype;
            const tableRow = document.querySelector(`#tableRow_${id}`);
            if (tableRow) {
                const typeCell = tableRow.querySelector('.documentTypeCell');
                if (typeCell) {
                    typeCell.textContent = documentType;
                }
            }
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Dokumentenart: ', error);
        });
}

// Funktion zum Abrufen der Dokumentenart anhand der ID
function getCourseById(id) {
    fetch(`https://iu-isef01-functionapp.azurewebsites.net/api/GetCourse?id=${id}`)
        .then(response => response.json())
        .then(data => {
            const Course = data.doctype;
            const tableRow = document.querySelector(`#tableRow_${id}`);
            if (tableRow) {
                const typeCell = tableRow.querySelector('.courseCell');
                if (typeCell) {
                    typeCell.textContent = Course;
                }
            }
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Dokumentenart: ', error);
        });
}


// Ausfüllen der Tabelle
function getTableData() {
    fetch('https://iu-isef01-functionapp.azurewebsites.net/api/GetTickets?')
        .then(response => response.json())
        .then(data => {

            const table = document.getElementById('meldungenTable');
            const tbody = table.querySelector('tbody');
            tbody.innerHTML = ''; 

            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td class="documentTitleCell"></td>
                    <td class="documentTypeCell"></td>
                    <td class="courseCell"></td>
                    <td>${item.ticket_type}</td>
                    <td>${item.status}</td>
                    <td>${item.createdAt}</td>
                `;
                tbody.appendChild(row);
                getDocumentTitleById(item.document_id);
                getDocumentTypeById(item.document_id);
                getCourseById(item.course_id);
            });
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Daten: ', error);
        });
}

window.addEventListener('load', getTableData);
