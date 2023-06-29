// https://stackoverflow.com/questions/32656594/domcontentloaded-blocks-page-loading

//alert(document.getElementById('submit').textContent)


// Chrome: zeigt zwar leere Seite an, aber man kann auf die Elemente des DOMs zugreifen d.h. mit Chrome sieht man
// nicht so gut, dass DOM schon aufgebaut ist
document.addEventListener('DOMContentLoaded', function() {
     //alert("Hello World!")
     //alert(document.getElementById('submit').textContent)

    function getColorCode(note){
        if(note === 1 || note === 2){
            return '#5cb85c'
        }
        else if(note === 3 || note === 4){
            return '#f0ad4e'
        }
        else if(note === 5 || note === 6){
            return '#d9534f'
        }
        else{
            return '#000000'
        }
    }

    function colorChange(){
        const note = parseInt(document.getElementById('inputNote').value)
        document.getElementById('submit').style.backgroundColor = getColorCode(note)
    }

    document.getElementById('inputNote').addEventListener('change', colorChange)

    document.querySelector('form').addEventListener('submit', function(evt) {
        document.getElementById('output').innerHTML = ''
        if(document.getElementById('inputName').value=== '' || document.getElementById('inputPasswort').value === ''){
            document.getElementById('output').append('Username oder Passwort nicht gesetzt!')
        }

        evt.preventDefault()
    })


    document.querySelector('button[type=button]').addEventListener('click', function(){
        const arr = [document.getElementById('inputName'), document.getElementById('inputPasswort'), document.getElementById('inputNote')]
        const table = document.createElement('table')
        document.getElementById('output').innerHTML = ''
        document.getElementById('output').append(table)

         arr.forEach(function(elem){
             const tr = document.createElement('tr')
             let td = document.createElement('td')
             td.append(elem.getAttribute('name')+': ')
             tr.append(td)
             td = document.createElement('td')
             td.append(elem.value)
             tr.append(td)
             table.append(tr)
        })
    })

    console.log(getColorCode(1))

})