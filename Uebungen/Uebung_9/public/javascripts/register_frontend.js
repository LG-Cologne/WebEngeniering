//Functions
function getColorCode(note) {
    switch (note) {
        case '1':
        case '2':
            return "#5cb85c";
        case '3':
        case '4':
            return "#f0ad4e";
        case '5':
        case '6':
            return "#d9534f";
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    // alert(document.getElementById('submit').textContent) 

    //HTML Content
    const submit = document.getElementById('submit');
    const inputNote = document.getElementById('inputNote');
    const inputPasswort = document.getElementById('inputPasswort');
    const inputName = document.getElementById('inputName');

    const form = document.querySelector('form')
    const output = document.getElementById('output');

    const showAll = document.getElementById('showInput')

    //Eventlistener
    inputNote.addEventListener('change', function () {
        submit.style.backgroundColor = getColorCode(inputNote.value);
    });

    form.addEventListener('submit', function (evt) {
        if (inputName.value === '' || inputPasswort.value === '' || inputNote.value === '') {
            output.textContent = "Incomplete Input! You need to fill all the Input-Boxes."
            evt.preventDefault()
        }
    });

    showAll.addEventListener('click', function (evt) {
        const table = document.createElement('table') // creates table

        const firstLine = document.createElement('tr') //creates row
        const secondLine = document.createElement('tr') //creates row
        const thirdLine = document.createElement('tr') //creates row

        //Line1
        let name = document.createElement('td') //creates table cells
        let receivedName = document.createElement('td')

        name.textContent = "Name:" //creates table cells
        receivedName.textContent = inputName.value //creates table cells

        firstLine.append(name, receivedName) // appends cell to row

        //Line2
        let password = document.createElement('td') //creates table cells
        let receivedPassword = document.createElement('td')

        password.textContent = "Password:"
        receivedPassword.textContent = inputPasswort.value

        secondLine.append(password, receivedPassword) // appends cell to row
        
        //Line3
        let note = document.createElement('td') //creates table cells
        let receivedNote = document.createElement('td')

        note.textContent = "Note:"
        receivedNote = inputNote.value

        thirdLine.append(note, receivedNote) // appends cell to row

        table.append(firstLine, secondLine, thirdLine)

        output.replaceChildren(table)
        evt.preventDefault()
    });
});

