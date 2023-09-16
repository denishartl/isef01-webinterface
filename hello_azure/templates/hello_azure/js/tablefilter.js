 // Funktion zum Formatieren des Datums im gewünschten Format
 function formatCreatedAtDate(createdAt) {
    const date = new Date(createdAt);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Monate sind nullbasiert
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

// Funktion zum Abrufen des Dokumentennamens anhand der ID
async function getDocumentTitleById(id) {
    try {
        const response = await fetch(`https://iu-isef01-functionapp.azurewebsites.net/api/GetDocument?id=${id}`);
        const data = await response.json();
        return data.title;
    } catch (error) {
        console.error('Fehler beim Abrufen des Dokumentennamens: ', error);
        return '';
    }
}

// Funktion zum Abrufen der Dokumentenart anhand der ID
async function getDocumentTypeById(id) {
    try {
        const response = await fetch(`https://iu-isef01-functionapp.azurewebsites.net/api/GetDocument?id=${id}`);
        const data = await response.json();
        return data.doctype;
    } catch (error) {
        console.error('Fehler beim Abrufen der Dokumentenart: ', error);
        return '';
    }
}

// Funktion zum Abrufen des Kursnamens anhand der ID
async function getCourseNameById(id) {
    try {
        const response = await fetch(`https://iu-isef01-functionapp.azurewebsites.net/api/GetCourse?id=${id}`);
        const data = await response.json();
        return data.course_shortname;
    } catch (error) {
        console.error('Fehler beim Abrufen des Kursnamens: ', error);
        return '';
    }
}

// Funktion zum Laden der Daten und Befüllen der Tabelle
async function loadTableData() {
    try {
        const response = await fetch('https://iu-isef01-functionapp.azurewebsites.net/api/GetTickets?');
        const data = await response.json();

        const table = $('#meldungenTable').DataTable({
            language: {
                "sEmptyTable":     "Keine Daten verfügbar in der Tabelle",
                "sInfo":           "_START_ bis _END_ von _TOTAL_ Einträgen",
                "sInfoEmpty":      "0 bis 0 von 0 Einträgen",
                "sInfoFiltered":   "(gefiltert von _MAX_ Einträgen)",
                "sInfoPostFix":    "",
                "sInfoThousands":  ".",
                "sLengthMenu":     "_MENU_ Einträge pro Seite anzeigen",
                "sLoadingRecords": "Wird geladen...",
                "sProcessing":     "Bitte warten...",
                "sSearch":         "Suchen:",
                "sZeroRecords":    "Keine passenden Einträge gefunden",
                "oPaginate": {
                    "sFirst":    "Erste",
                    "sLast":     "Letzte",
                    "sNext":     "Nächste",
                    "sPrevious": "Vorherige"
                },
                "oAria": {
                    "sSortAscending":  ": aktivieren, um Spalte aufsteigend zu sortieren",
                    "sSortDescending": ": aktivieren, um Spalte absteigend zu sortieren"
                }
            },
            data: data,
            columns: [
                { data: 'id', title: 'Nr.' },
                { data: 'document_id', title: 'Dokumententitel' },
                { data: 'document_id', title: 'Dokumentenart' },
                { data: 'course_id', title: 'Kurs' },
                { data: 'ticket_type', title: 'Meldungsart' },
                { data: 'status', title: 'Status' },
                { 
                    data: 'createdAt',
                    title: 'Stand',
                    render: function(data) {
                        return formatCreatedAtDate(data);
                    }
                }
            ]
        });

        // Aktivieren der Column Filters-Erweiterung
        table.columns().every(function () {
            var that = this;

            $('input', this.footer()).on('keyup change', function () {
                if (that.search() !== this.value) {
                    that
                        .search(this.value)
                        .draw();
                }
            });
        });

        // Befüllen der Spalten für Dokumentennamen, Dokumentenart und Kursnamen
        const rows = table.rows().nodes();
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const rowData = table.row(row).data();

            const documentTitle = await getDocumentTitleById(rowData.document_id);
            const documentType = await getDocumentTypeById(rowData.document_id);
            const courseName = await getCourseNameById(rowData.course_id);

            $(row).find('td:eq(1)').html(documentTitle);
            $(row).find('td:eq(2)').html(documentType);
            $(row).find('td:eq(3)').html(courseName);
        }
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten: ', error);
    }
}

window.addEventListener('load', loadTableData);               