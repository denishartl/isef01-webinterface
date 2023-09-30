// Function to format the date
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

// Function to get document name by ID
async function getDocumentTitleById(id) {
    try {
        const response = await fetch(`https://iu-isef01-functionapp2.azurewebsites.net/api/GetDocument?id=${id}`);
        const data = await response.json();
        return data.title;
    } catch (error) {
        console.error('Fehler beim Abrufen des Dokumentennamens: ', error);
        return '';
    }
}

// Function to get document type by ID
async function getDocumentTypeById(id) {
    try {
        const response = await fetch(`https://iu-isef01-functionapp2.azurewebsites.net/api/GetDocument?id=${id}`);
        const data = await response.json();
        return data.doctype;
    } catch (error) {
        console.error('Fehler beim Abrufen der Dokumentenart: ', error);
        return '';
    }
}

// Function to get course name by ID
async function getCourseNameById(id) {
    try {
        const response = await fetch(`https://iu-isef01-functionapp2.azurewebsites.net/api/GetCourse?id=${id}`);
        const data = await response.json();
        return data.shortname;
    } catch (error) {
        console.error('Fehler beim Abrufen des Kursnamens: ', error);
        return '';
    }
}


async function fillColumns(data) {
    data['documentTitle'] = await getDocumentTitleById(data['document_id']);
    data['documentType'] = await getDocumentTypeById(data['document_id']);
    data['courseName'] = await getCourseNameById(data['course_id']);

    return data;
}

async function getTicketsByUserID(user_id) {
    let url = 'https://iu-isef01-functionapp2.azurewebsites.net/api/getticketsbyuserid?user_id=' + user_id;
    return fetch(url)
        .then(response => response.json())
        .then(responseJson => { return responseJson });
}

// Function for loading data and filling the table
async function loadTableData() {
    try {
        document.getElementById("loadinggif").style.display = "block";
        // Filling the table with data
        var data = await getTicketsByUserID(localStorage.getItem('user_id'));
        const promises = [];
        for (let i = 0; i < data.length; i++) {
            promises.push(data[i] = await fillColumns(data[i]));
        };
        Promise.all(promises)
            .then(() => {
                var table = $('#meldungenTable').DataTable({
                    language: {
                        "sEmptyTable": "Keine Daten verfügbar in der Tabelle",
                        "sInfo": "_START_ bis _END_ von _TOTAL_ Einträgen",
                        "sInfoEmpty": "0 bis 0 von 0 Einträgen",
                        "sInfoFiltered": "(gefiltert von _MAX_ Einträgen)",
                        "sInfoPostFix": "",
                        "sInfoThousands": ".",
                        "sLengthMenu": "_MENU_ Einträge pro Seite anzeigen",
                        "sLoadingRecords": "Wird geladen...",
                        "sProcessing": "Bitte warten...",
                        "sSearch": "Suchen:",
                        "sZeroRecords": "Keine passenden Einträge gefunden",
                        "oPaginate": {
                            "sFirst": "Erste",
                            "sLast": "Letzte",
                            "sNext": "Nächste",
                            "sPrevious": "Vorherige"
                        },
                        "oAria": {
                            "sSortAscending": ": aktivieren, um Spalte aufsteigend zu sortieren",
                            "sSortDescending": ": aktivieren, um Spalte absteigend zu sortieren"
                        }
                    },
                    data: data,
                    columns: [
                        { data: 'id', title: 'Nr.' },
                        { data: 'documentTitle', title: 'Dokumententitel' },
                        { data: 'documentType', title: 'Dokumentenart' },
                        { data: 'courseName', title: 'Kurs' },
                        { data: 'ticket_type', title: 'Meldungsart' },
                        { data: 'status', title: 'Status' },
                        {
                            data: 'createdAt',
                            title: 'Stand',
                            render: function (data) {
                                return formatCreatedAtDate(data);
                            }
                        }
                    ],
                    searchPanes: {
                        viewTotal: true
                    }
                });
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
                table.on('click', 'tbody tr', function () {
                    let data = table.row(this).data();

                    console.log(data)
                    window.open('displayticket?ticket_id=' + data['id'], 'Meldung bearbeiten', 'width=800,height=1050')
                });
            }
            );
            document.getElementById("loadinggif").style.display = "none";
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten: ', error);
    }
}


// Loading table and activating the filter, if the page is loaded
$(document).ready(function () {
    loadTableData();
});

// Activates the column filter-extension
$(document).ready(function () {
    $('#meldungenTable tfoot th').each(function () {
        var title = $(this).text();
        $(this).html('<input type="text" placeholder="Suchen in ' + title + '" />');
    });
});

window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById('buttonlogout').addEventListener('click', async function () {
        if (localStorage.getItem('saveUsername') != "true") {
            localStorage.removeItem('user_id');
        }
    });
});
