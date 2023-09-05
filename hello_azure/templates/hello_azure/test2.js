var dropdown = document.getElementById('dynamicDropdown');

var options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

function populateDropdown() {
    options.forEach(option => {
        var optionElement = document.createElement('option');
        optionElement.textContent = option;
        dropdown.appendChild(optionElement);
    });
}

populateDropdown();