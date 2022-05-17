document.addEventListener("DOMContentLoaded", function (event) {
    // alert(document.getElementById('submit').textContent) 


    //HTML Content
    const submit = document.getElementById('submit');
    const inputNote = document.getElementById('inputNote');
    const inputPasswort = document.getElementById('inputPasswort');
    const inputName = document.getElementById('inputName');

    //Eventlistener
    document.addEventListener('change', function (){
        note = inputNote.value;
        submit.style.backgroundColor = getColorCode(note);
    });

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
});

