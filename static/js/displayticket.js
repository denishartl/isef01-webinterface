async function getTicket(ticket_id) {
    let url = 'https://iu-isef01-functionapp.azurewebsites.net/api/GetTicket?id=' + ticket_id;
    return fetch(url)
        .then(response => response.json())
        .then(responseJson => { return responseJson });
}


async function getCourse(course_id) {
    let url = 'https://iu-isef01-functionapp.azurewebsites.net/api/GetCourse?id=' + course_id;
    return fetch(url)
        .then(response => response.json())
        .then(responseJson => { return responseJson });
}

async function getCourseByShortname(shortname) {
    let url = 'https://iu-isef01-functionapp.azurewebsites.net/api/GetCourseByShortname?shortname=' + shortname;
    return fetch(url)
        .then(response => response.json())
        .then(responseJson => { return responseJson });
}


async function getDocument(document_id) {
    let url = 'https://iu-isef01-functionapp.azurewebsites.net/api/GetDocument?id=' + document_id;
    return fetch(url)
        .then(response => response.json())
        .then(responseJson => { return responseJson });
}

async function getDocumentsByCourse(course_id) {
    let url = 'https://iu-isef01-functionapp.azurewebsites.net/api/GetDocumentsByCourse?course=' + course_id;
    return fetch(url)
        .then(response => response.json())
        .then(responseJson => { return responseJson });
}

async function getDocumentFromLocalStorageCourses(document_title) {
    var all_documents = JSON.parse(localStorage.getItem('course_documents'));
    for (var i = 0; i < all_documents.length; i++) {
        if (all_documents[i].title == document_title) {
            return all_documents[i]
        }
    }
}

async function addOptionSelect(select_id, value) {
    var option_html = '<option value="' + value + '">' + value + '</option>'
    document.getElementById(select_id).insertAdjacentHTML('beforeend', option_html)
}


async function getAllCourses() {
    let url = 'https://iu-isef01-functionapp.azurewebsites.net/api/GetCourses';
    return fetch(url)
        .then(response => response.json())
        .then(responseJson => { return responseJson });
}

async function updateTicket(ticket_id, author_id, course_id, document_id, ticket_type, description) {
    let url = 'https://iu-isef01-functionapp.azurewebsites.net/api/UpdateTicket?ticket_id=' + ticket_id
    let body = {
        'author_id': author_id,
        'course_id': course_id,
        'document_id': document_id,
        'ticket_type': ticket_type,
        'description': description
    }
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body)
    })
        .then(response => {return response});
}

function printError(message) {
    document.getElementById('error').innerHTML = message;
    document.getElementById('error').hidden = false;
}

function printSuccess(message) {
    document.getElementById('success').innerHTML = message;
    document.getElementById('success').hidden = false;
}

document.getElementById('buttonedit').addEventListener('click', async function () {
    var all_courses = await getAllCourses();
    addOptionSelect('dynamicDropdownCourse', " ")
    for (var i = 0; i < all_courses.length; i++) {
        addOptionSelect('dynamicDropdownCourse', all_courses[i].shortname)
    };
    document.getElementById('dynamicDropdownCourse').disabled = false;
    document.getElementById('documenttype').disabled = false;
    document.getElementById('selectedDocument').disabled = false;
    document.getElementById('tickettype').disabled = false;
    document.getElementById('description').disabled = false;
    document.getElementById('buttonedittd').hidden = true;
    document.getElementById('buttonsendtd').hidden = false;
});

document.getElementById('documenttype').addEventListener('change', async function () {
    document.getElementById('selectedDocument').innerHTML = '';
    var selected_course_name = document.getElementById('dynamicDropdownCourse').value;
    if (selected_course_name != " ") { // Still need to add actions when no course is selected
        var course_documents = await getDocumentsByCourse(localStorage.getItem('course_id'));
        for (var i = 0; i < course_documents.length; i++) {
            if ((course_documents[i].doctype).toUpperCase() == (document.getElementById('documenttype').value).toUpperCase()) {
                await addOptionSelect('selectedDocument', course_documents[i].title)
            }
        };
        document.getElementById('selectedDocument').dispatchEvent(new Event("change"));
    }
});


document.getElementById('dynamicDropdownCourse').addEventListener('change', async function() {
    var selected_course_shortname = document.getElementById('dynamicDropdownCourse').value;
    var course = await getCourseByShortname(selected_course_shortname);
    localStorage.setItem('course_id', course.id);
    var course_documents = await getDocumentsByCourse(localStorage.getItem('course_id'));
    localStorage.setItem('course_documents', JSON.stringify(course_documents));
    document.getElementById('selectedDocument').value = "";
    document.getElementById('documenttype').dispatchEvent(new Event("change"));
})

document.getElementById('selectedDocument').addEventListener('change', async function() {
    var course_document = await getDocumentFromLocalStorageCourses(document.getElementById('selectedDocument').value);
    localStorage.setItem('document_id', course_document.id);
})

document.getElementById('buttonsend').addEventListener('click', async function () {
    document.getElementById('error').hidden = true;
    document.getElementById('success').hidden = true;
    if (document.getElementById('dynamicDropdownCourse').value != " ") {
        if (document.getElementById('documenttype').value != "") {
            if (document.getElementById('selectedDocument').value != "") {
                if (document.getElementById('tickettype').value != "") {
                    if (document.getElementById('description').value != ""){
                        var success = 0;
                        const urlParams = new URLSearchParams(window.location.search);
                        const open_ticket_id = urlParams.get('ticket_id');
                        response_ticket = await updateTicket(
                            ticket_id = open_ticket_id,
                            author_id = localStorage.getItem('user_id'),
                            course_id = localStorage.getItem('course_id'),
                            document_id = localStorage.getItem('document_id'),
                            ticket_type = document.getElementById('tickettype').value,
                            description = document.getElementById('description').value
                        );
                        if (response_ticket.status != 200) {
                            success = -1;
                        }
                        if (document.getElementById("attachment").files.length > 0) {
                            response_attachment = await createAttachment(
                                ticket_id = await response_ticket.text(),
                                filename = localStorage.getItem('attachment_name'),
                                file_b64 = localStorage.getItem('attachment_b64')
                            )
                            localStorage.removeItem('attachment_name')
                            localStorage.removeItem('attachment_b64')
                            if (response_attachment.status != 200) {
                                success = -1;
                            }
                        }
                        if (success != 0) {
                            printError('Fehler beim bearbeiten der Meldung!')
                        }
                        else {
                            printSuccess('Meldung erfolgreich bearbeitet!');
                            document.getElementById('dynamicDropdownCourse').disabled = true;
                            document.getElementById('documenttype').disabled = true;
                            document.getElementById('selectedDocument').disabled = true;
                            document.getElementById('tickettype').disabled = true;
                            document.getElementById('description').disabled = true;
                            document.getElementById('buttonedittd').hidden = false;
                            document.getElementById('buttonsendtd').hidden = true;
                        } 
                    }
                    else {
                        printError("Bitte Beschreibung ausfüllen!")
                    }
                }
                else {
                    printError('Bitte Meldungsart auswählen!')
                }
            }
            else {
                printError('Bitte Dokumententitel auswählen!')
            }
        }
        else {
            printError("Bitte Dokumentenart auswählen!")
        }
    }
    else {
        printError("Bitte Kurs auswählen!")
    }
});

// Formular beim Laden der Seite mit den Inhalten aus dem Ticket befüllen
async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const ticket_id = urlParams.get('ticket_id');
    var ticket_content = await getTicket(ticket_id);
    var course_content = await getCourse(ticket_content['course_id']);
    var document_content = await getDocument(ticket_content['document_id']);
    addOptionSelect('dynamicDropdownCourse', course_content['shortname'])
    document.getElementById('dynamicDropdownCourse').value = course_content['shortname']
    document.getElementById('documenttype').value = document_content['doctype']
    addOptionSelect('selectedDocument', document_content['title'])
    document.getElementById('selectedDocument').value = document_content['title']
    document.getElementById('tickettype').value = ticket_content['ticket_type']
    document.getElementById('description').innerHTML = ticket_content['description']
}

init();
