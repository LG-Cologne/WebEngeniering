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

    //Eventlistener
    inputNote.addEventListener('change', function (){
        submit.style.backgroundColor = getColorCode(inputNote.value);
    });

    form.addEventListener('submit', function(evt){
        if(inputName.value === '' || inputPasswort.value === '' || inputNote.value ===''){
            output.textContent = "Incomplete Input! You need to fill all the Input-Boxes."
            evt.preventDefault()
        }
    });
});

