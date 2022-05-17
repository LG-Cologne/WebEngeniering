document.addEventListener("DOMContentLoaded", function (event) {
    // alert(document.getElementById('submit').textContent) 

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

    function getColorCode2(note) {
        const colors = ["#5cb85c", "#f0ad4e", "#d9534f"]
        return colors[(parseInt(note) - 1) / 2]
    }

    console.log(getColorCode2(1))
    console.log(getColorCode2(2))
    console.log(getColorCode2(3))
    console.log(getColorCode2(4))
    console.log(getColorCode2(5))
    console.log(getColorCode2(6))

});