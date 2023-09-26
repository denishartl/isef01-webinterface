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


async function getDocument(document_id) {
    let url = 'https://iu-isef01-functionapp.azurewebsites.net/api/GetDocument?id=' + document_id;
    return fetch(url)
        .then(response => response.json())
        .then(responseJson => { return responseJson });
}

async function addOptionSelect(select_id, value) {
    var option_html = '<option value="' + value + '">' + value + '</option>'
    document.getElementById(select_id).insertAdjacentHTML('beforeend', option_html)
}

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
