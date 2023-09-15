var jsonData;

// Annahme: Verwenden von jQuery für die AJAX-Anfrage
$.ajax({
    url: 'https://iu-isef01-functionapp.azurewebsites.net/api/GetTickets?',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
        jsonData = data;
        initializeDataTable();
    },
    error: function(error) {
        console.error('Fehler beim Laden der JSON-Daten:', error);
    }
});

function initializeDataTable() {
    $('#meldungenTable').DataTable({
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
        data: jsonData,
        columns: [
            { data: 'id' },
            { data: 'document_id' },
            { data: 'document_id' },
            { data: 'course_id' },
            { data: 'ticket_type' },
            { data: 'status' },
            { data: 'createdAt' }
        ]
    });
}

