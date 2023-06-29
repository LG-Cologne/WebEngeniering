
// alert($('#submit').text());

$(document).ready(function() {
    // alert($('#submit').text())

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
        const note = parseInt($('#inputNote').val())
        $("#submit").css("background-color", getColorCode(note))
    }

    $('#inputNote').change(colorChange)

    $("form").submit(function(evt){
        $("#output").empty()
        if($("#inputName").val() === "" || $("#inputPasswort").val() === ""){
            $("#output").append("Username oder Passwort nicht gesetzt!")
            return false
        }
    })

    $("button[type=button]").click(function(){
        const arr = [$("#inputName"), $("#inputPasswort"), $("#inputNote")]
        const table = $("<table></table>")
        $("#output").empty().append(table)

        $.each(arr, function(index, value){
            let tr = $("<tr></tr>")
            let td = $("<td></td>")
            td.append(value.attr('name')+': ')
            tr.append(td)
            td = $("<td></td>")
            td.append(value.val())
            tr.append(td)
            table.append(tr)
        })
    })
})