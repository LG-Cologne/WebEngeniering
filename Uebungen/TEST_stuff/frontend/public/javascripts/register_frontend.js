document.addEventListener("DOMContentLoaded", function () {
    // alert(document.getElementById('submit').textContent) 

    getColorCode = (note) => {
        //check if note is numeric
        if (note === 1 || note === 2) {
            return '#5cb85c'
        }
        else if (note === 3 || note === 4) {
            return "#f0ad4e"
        }
        else if (note === 5 || note === 6) {
            return "#d9534f"
        }
        else {
            return '#000000'
        }
    }

    document.getElementById('inputNote').addEventListener('change', changeButtonColor)

    function changeButtonColor() {
        const currentNote = parseInt(document.getElementById("inputNote").value)
        document.getElementById("submit").style.backgroundColor = getColorCode(currentNote)
    }

    document.querySelector('form').addEventListener('submit', sendSubmit())

    function sendSubmit(event) {
        outputField = document.getElementById('output');
        outputField.innerHTML = ''
        if (isFormAllowed()) {

        }
        else {
            outputField.append('Passwort und Name müssen ausgefüllt sein');
            event.preventDefault();
        }
    }

    function isFormAllowed() {
        const nameinput = document.getElementById("inputName").value
        const pwinput = document.getElementById("inputPasswort").value

        return (nameinput === '' || pwinput === '')
    }

    document.getElementById('showContent').addEventListener('click', showContent)

    function showContent() {
        outputField = document.getElementById('output');
        outputField.innerHTML = ''


        const table = document.createElement('table')
        row = table.insertRow();

        header_name = row.insertCell();
        header_name.textContent = "Feld"
        
        header_val = row.insertCell();
        header_val.textContent = "Inhalt"

        content = [document.getElementById("inputName"), document.getElementById("inputPasswort"), document.getElementById("inputNote")]

        content.forEach(element => {
            row = table.insertRow();

            tc_name = row.insertCell();
            tc_name.textContent = element.placeholder
            
            tc_value = row.insertCell();
            tc_value.textContent = element.value

        });

        outputField.appendChild(table);

    }

});