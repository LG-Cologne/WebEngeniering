//Aufgabe Javascript Basics

let students = [new Student("Fritz"),new Student("Anna"),new Student("Bob")]

// set random grade
students.forEach(s => {
    s.note = parseInt(Math.random()*6+1)
})


// build string to print studi information
function printStudis(){
    // students.forEach(s => {
    //     console.log(s.toString())
    // })

    students.forEach(s =>{
        console.log(""+s)
    })
}

printStudis()

// sort students by grade
students.sort(function(a,b){
    return(a.note-b.note)
})

console.log("After sorting:")
printStudis()

students[0].note = 4
console.log("First Studi: set grade to 4:")
printStudis()

// call static function getNotenbewertung
console.log(Student.getNotenBewertung(1))


const createStudentFactory = (function(note){
    return function (name) {
        let s = new Student(name)
        s.note = note
        return s
    }
})

const studentFactory = createStudentFactory(5)
let studentMax = studentFactory('Max')
console.log(studentMax.toString())

