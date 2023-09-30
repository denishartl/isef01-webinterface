function formatDate(inputdate) {
    const date = new Date(inputdate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

async function getAttachments(ticket_id) {
    let url = 'https://iu-isef01-functionapp2.azurewebsites.net/api/GetAttachments?ticket_id=' + ticket_id;
    return fetch(url)
        .then(response => response.json())
        .then(responseJson => { return responseJson });
}

async function createAttachment(ticket_id, filename, file_b64) {
    let url = 'https://iu-isef01-functionapp2.azurewebsites.net/api/CreateAttachment?name=' + filename + '&ticket_id=' + ticket_id;
    let body = {
        'file': file_b64
    }
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body)
    })
        .then(response => { return response });
}


async function deleteAttachment(attachment_id) {
    let url = 'https://iu-isef01-functionapp2.azurewebsites.net/api/DeleteAttachment?attachment_id=' + attachment_id;
    await fetch(url, {
        method: 'DELETE'
    });
    const urlParams = new URLSearchParams(window.location.search);
    const ticket_id = urlParams.get('ticket_id');
    printAttachments(ticket_id)
}

async function printAttachments(ticket_id) {
    document.getElementById('divAttachments').hidden = true;
    document.getElementById('tableAttachments').innerHTML = null;
    var all_attachments = await getAttachments(ticket_id)
    if (all_attachments.length > 0) {
        for (var i = 0; i < all_attachments.length; i++) {
            var innerHTML = '<tr class="tableAttachments">\n' +
                '<td class="tableAttachments">' + all_attachments[i]['name'] + '</td>\n' +
                '<td class="tableAttachments"><a download="' + all_attachments[i]['name'] + '" href="' + all_attachments[i]['blob_link'] + '">Click here to Download</a></td>\n' +
                '<td class="tableAttachments"><a onclick="deleteAttachment(\'' + all_attachments[i]['id'] + '\')">Löschen</a></td>\n' +
                '</tr>\n'
            document.getElementById('tableAttachments').innerHTML += innerHTML;
        }
        document.getElementById('divAttachments').hidden = false;
    }
}



async function getTicket(ticket_id) {
    let url = 'https://iu-isef01-functionapp2.azurewebsites.net/api/GetTicket?id=' + ticket_id;
    return fetch(url)
        .then(response => response.json())
        .then(responseJson => { return responseJson });
}


async function getCourse(course_id) {
    let url = 'https://iu-isef01-functionapp2.azurewebsites.net/api/GetCourse?id=' + course_id;
    return fetch(url)
        .then(response => response.json())
        .then(responseJson => { return responseJson });
}

async function getCourseByShortname(shortname) {
    let url = 'https://iu-isef01-functionapp2.azurewebsites.net/api/GetCourseByShortname?shortname=' + shortname;
    return fetch(url)
        .then(response => response.json())
        .then(responseJson => { return responseJson });
}


async function getComments(ticket_id) {
    let url = 'https://iu-isef01-functionapp2.azurewebsites.net/api/GetComments?ticket_id=' + ticket_id;
    return fetch(url)
        .then(response => response.json())
        .then(responseJson => { return responseJson });
}

async function createComment(ticket_id, author_id, text) {
    let url = 'https://iu-isef01-functionapp2.azurewebsites.net/api/CreateComment'
    let body = {
        'ticket_id': ticket_id,
        'author_id': author_id,
        'text': text
    }
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body)
    })
        .then(response => { return response });
}

async function getDocument(document_id) {
    let url = 'https://iu-isef01-functionapp2.azurewebsites.net/api/GetDocument?id=' + document_id;
    return fetch(url)
        .then(response => response.json())
        .then(responseJson => { return responseJson });
}

async function getDocumentsByCourse(course_id) {
    let url = 'https://iu-isef01-functionapp2.azurewebsites.net/api/GetDocumentsByCourse?course=' + course_id;
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

async function getUser(user_id) {
    let url = 'https://iu-isef01-functionapp2.azurewebsites.net/api/GetUser?user_id=' + user_id;
    return fetch(url)
        .then(response => response.json())
        .then(responseJson => { return responseJson });
}

async function getUsersbyRole(role) {
    let url = 'https://iu-isef01-functionapp2.azurewebsites.net/api/GetUsersByRole?role=' + role;
    return fetch(url)
        .then(response => response.json())
        .then(responseJson => { return responseJson });
}

function formatUserDisplayName(user) {
    return user['surname'] + ' ' + user['lastname']
}

async function addOptionSelect(select_id, value) {
    var option_html = '<option value="' + value + '">' + value + '</option>'
    document.getElementById(select_id).insertAdjacentHTML('beforeend', option_html)
}


async function addOptionSelectWithDifferentValue(select_id, value, display) {
    var option_html = '<option value="' + value + '">' + display + '</option>'
    document.getElementById(select_id).insertAdjacentHTML('beforeend', option_html)
}

async function addOptionSelectWithDifferentValueAndClass(select_id, value, display, optionclass) {
    var option_html = '<option class="' + optionclass + '" value="' + value + '">' + display + '</option>'
    document.getElementById(select_id).insertAdjacentHTML('beforeend', option_html)
}

async function getAllCourses() {
    let url = 'https://iu-isef01-functionapp2.azurewebsites.net/api/GetCourses';
    return fetch(url)
        .then(response => response.json())
        .then(responseJson => { return responseJson });
}

async function updateTicket(ticket_id, author_id, course_id, document_id, ticket_type, description, ticket_status, assignee) {
    let url = 'https://iu-isef01-functionapp2.azurewebsites.net/api/UpdateTicket?ticket_id=' + ticket_id
    let body = {
        'course_id': course_id,
        'document_id': document_id,
        'ticket_type': ticket_type,
        'description': description,
        'status': ticket_status,
        'assignee': assignee
    }
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body)
    })
        .then(response => { return response });
}

async function printComments(ticket_id) {
    document.getElementById('tableComments').innerHTML = null;
    var comments = await getComments(ticket_id)
    for (var i = 0; i < comments.length; i++) {
        var user = await getUser(comments[i]['author'])
        var innerHTML = '<tr class="tableComments">\n' +
            '<td class="tableComments">' + formatUserDisplayName(user) + ', ' + formatDate(comments[i]['createdAt']) + '</td>\n' +
            '<td class="tableComments">' + comments[i]['text'] + '</td>\n' +
            '</tr>\n'
        document.getElementById('tableComments').innerHTML += innerHTML;
    }
}

function printError(message) {
    document.getElementById('error').innerHTML = message;
    document.getElementById('error').hidden = false;
}

function printSuccess(message) {
    document.getElementById('success').innerHTML = message;
    document.getElementById('success').hidden = false;
}

document.getElementById('attachment').addEventListener('change', async function () {
    document.getElementById("loadinggif").style.display = "block";
    document.getElementById('error').hidden = true;
    const reader = new FileReader();
    const selectedFile = document.getElementById("attachment").files[0];
    if (selectedFile.size < 4000000) {
        reader.readAsDataURL(selectedFile);
        reader.onload = function (e) {
            localStorage.setItem('attachment_name', selectedFile.name);
            localStorage.setItem('attachment_b64', reader.result.replace(/^.+?;base64,/, ''))
        };
    }
    else {
        printError('Uploads dürfen max. 4MB groß sein!')
    }
    document.getElementById("loadinggif").style.display = "none";
});

document.getElementById('buttonedit').addEventListener('click', async function () {
    document.getElementById("loadinggif").style.display = "block";
    current_user = await getUser(localStorage.getItem('user_id'));
    if ((current_user['role']).toUpperCase() == 'USER') {
        if ((document.getElementById('dropDownTicketStatus').value).toUpperCase() == 'NEU') {
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
            document.getElementById('attachment').disabled = false;
            document.getElementById('buttonedittd').hidden = true;
            document.getElementById('buttonsendtd').hidden = false;
        }
        else {
            printError('Das Ticket ist schon in Bearbeitung, Anpassung nicht möglich!')
        }
    }
    else if ((current_user['role']).toUpperCase() == 'BEARBEITER') {
        var existing_options = document.getElementsByClassName('assignee')
        var existing_options_list = []
        for (var i = 0; i < existing_options.length; i++) {
            existing_options_list.push(existing_options[i]['value'])
        }
        var all_users = await getUsersbyRole('Bearbeiter')
        for (var i = 0; i < all_users.length; i++) {
            if (!existing_options_list.includes(all_users[i]['id'])) {
                await addOptionSelectWithDifferentValueAndClass('dropDownAssignee', all_users[i]['id'], formatUserDisplayName(all_users[i]), "assignee")
            }
        };
        document.getElementById('dropDownTicketStatus').disabled = false;
        document.getElementById('dropDownAssignee').disabled = false;
        document.getElementById('buttonedittd').hidden = true;
        document.getElementById('buttonsendtd').hidden = false;
    }
    document.getElementById("loadinggif").style.display = "none";
});

document.getElementById('documenttype').addEventListener('change', async function () {
    document.getElementById("loadinggif").style.display = "block";
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
    document.getElementById("loadinggif").style.display = "none";
});


document.getElementById('dynamicDropdownCourse').addEventListener('change', async function () {
    var selected_course_shortname = document.getElementById('dynamicDropdownCourse').value;
    var course = await getCourseByShortname(selected_course_shortname);
    localStorage.setItem('course_id', course.id);
    var course_documents = await getDocumentsByCourse(localStorage.getItem('course_id'));
    localStorage.setItem('course_documents', JSON.stringify(course_documents));
    document.getElementById('selectedDocument').value = "";
    document.getElementById('documenttype').dispatchEvent(new Event("change"));
})

document.getElementById('selectedDocument').addEventListener('change', async function () {
    var course_document = await getDocumentFromLocalStorageCourses(document.getElementById('selectedDocument').value);
    localStorage.setItem('document_id', course_document.id);
})

document.getElementById('buttonsend').addEventListener('click', async function () {
    document.getElementById("loadinggif").style.display = "block";
    document.getElementById('error').hidden = true;
    document.getElementById('success').hidden = true;
    if (document.getElementById('dynamicDropdownCourse').value != " ") {
        if (document.getElementById('documenttype').value != "") {
            if (document.getElementById('selectedDocument').value != "") {
                if (document.getElementById('tickettype').value != "") {
                    if (document.getElementById('description').value != "") {
                        var success = 0;
                        const urlParams = new URLSearchParams(window.location.search);
                        const open_ticket_id = urlParams.get('ticket_id');
                        if (document.getElementById('dropDownAssignee').value == "null") {
                            assignee = null
                        }
                        else {
                            assignee = document.getElementById('dropDownAssignee').value
                        }
                        response_ticket = await updateTicket(
                            ticket_id = open_ticket_id,
                            course_id = localStorage.getItem('course_id'),
                            document_id = localStorage.getItem('document_id'),
                            ticket_type = document.getElementById('tickettype').value,
                            description = document.getElementById('description').value,
                            ticket_status = document.getElementById('dropDownTicketStatus').value,
                            assignee = assignee
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
                            document.getElementById('dropDownTicketStatus').disabled = true;
                            document.getElementById('dropDownAssignee').disabled = true;
                            document.getElementById('buttonedittd').hidden = false;
                            document.getElementById('buttonsendtd').hidden = true;
                            printAttachments(ticket_id);
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
    document.getElementById("loadinggif").style.display = "none";
});


document.getElementById('buttonsendcomment').addEventListener('click', async function () {
    document.getElementById("loadinggif").style.display = "block";
    document.getElementById('error').hidden = true;
    document.getElementById('success').hidden = true;
    if (document.getElementById('textAreaComment').value != "") {
        const urlParams = new URLSearchParams(window.location.search);
        const ticket_id = urlParams.get('ticket_id');
        await createComment(
            ticket_id,
            localStorage.getItem('user_id'),
            document.getElementById('textAreaComment').value
        )
        document.getElementById('textAreaComment').value = null;
        printComments(ticket_id);
    }
    else {
        printError('Bitte Kommentar eingeben!')
    }
    document.getElementById("loadinggif").style.display = "none";
});

// Fill the form with the content from the ticket when the page is loading
async function init() {
    if (localStorage.getItem('user_id') == null) {
        window.location.href = "/";
    }
    document.getElementById("loadinggif").style.display = "block";
    const urlParams = new URLSearchParams(window.location.search);
    const ticket_id = urlParams.get('ticket_id');
    var ticket_content = await getTicket(ticket_id);
    var course_content = await getCourse(ticket_content['course_id']);
    var document_content = await getDocument(ticket_content['document_id']);
    document.getElementById('ticketid').value = ticket_content['id']
    addOptionSelect('dynamicDropdownCourse', course_content['shortname'])
    document.getElementById('dynamicDropdownCourse').value = course_content['shortname']
    document.getElementById('documenttype').value = document_content['doctype']
    addOptionSelect('selectedDocument', document_content['title'])
    document.getElementById('selectedDocument').value = document_content['title']
    document.getElementById('tickettype').value = ticket_content['ticket_type']
    document.getElementById('description').innerHTML = ticket_content['description']
    // Attachments
    printAttachments(ticket_id)
    // Assginee
    if (ticket_content['assignee'] != null) {
        await addOptionSelectWithDifferentValueAndClass('dropDownAssignee', ticket_content['assignee'], formatUserDisplayName(await getUser(ticket_content['assignee'])), 'assignee')
        document.getElementById('dropDownAssignee').value = ticket_content['assignee']
    }
    else {
        await addOptionSelectWithDifferentValue('dropDownAssignee', null, "Noch nicht zugewiesen")
        document.getElementById('dropDownAssignee').value = null
    }
    // Status
    document.getElementById('dropDownTicketStatus').value = ticket_content['status']
    // Comments
    printComments(ticket_id)
    document.getElementById("loadinggif").style.display = "none";
}

init();
