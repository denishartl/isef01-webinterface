// Funktion zum Formatieren des Datums
function formatCreatedAtDate(createdAt) {
    const date = new Date(createdAt);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
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
        return data.shortname;
    } catch (error) {
        console.error('Fehler beim Abrufen des Kursnamens: ', error);
        return '';
    }
}


// Funktion zum Laden der Daten und Befüllen der Tabelle
async function loadTableData() {
    try {
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
            data: [], 
            columns: [
                { data: 'id', title: 'Nr.' },
                { data: 'documentName', title: 'Dokumententitel' },
                { data: 'documentType', title: 'Dokumentenart' },
                { data: 'ccourseName', title: 'Kurs' },
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

        // Befüllen der Tabelle mit Daten
        const response = await fetch('https://iu-isef01-functionapp.azurewebsites.net/api/GetTickets?');
        const data = await response.json();

        // Aktualisieren der DataTable mit den abgerufenen Daten
        table.clear().rows.add(data).draw();

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


// Laden der Tabelle und Aktivieren des Filters, wenn Seite geladen ist
$(document).ready(function() {
    loadTableData();
});

// Aktivieren der Column Filters-Erweiterung
$(document).ready(function() {
    $('#meldungenTable tfoot th').each(function() {
        var title = $(this).text();
        $(this).html('<input type="text" placeholder="Suchen in ' + title + '" />');
    });

    var table = $('#meldungenTable').DataTable({
        searchPanes: {
            viewTotal: true
        },
    });
 
     table.columns().every( function() {
        var that = this;
  
        $('input', this.footer()).on('keyup change', function() {
            if (that.search() !== this.value) {
                that
                    .search(this.value)
                    .draw();
            }
        });
    });
});

