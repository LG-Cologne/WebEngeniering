const Student = require('./modules/student')

// Objekte
const andre = new Student('Andre', 1)
const nico = new Student('Nico', 2)
const jonas = new Student('Jonas', 3)

let students = [nico, andre, jonas]

students.forEach(student => {
    student.note++;
    console.log(student.toString())
})

// Anonyme Funktion
console.log('before sorting:');
students.forEach(student => {
    console.log(student.toString());
});

students.sort(function (a, b) {
        return a.note - b.note;
    }
)
;

console.log('after sorting:');
students.forEach(student => {
    console.log(student.toString());
});


//Closures
function createStudentFactory(note) {
    return function (name) {
        return new Student(name, note);
    }
}

let studentFactory = createStudentFactory(5);

let factoryStudents = [
    studentFactory('David'),
    studentFactory('Landon'),
    studentFactory('Andreas'),
];

console.log('factory students:');
factoryStudents.forEach(student => {
    console.log(student.toString());
});

const express = require('express');
let app = express();

app.get('/student', function (req, res){
    let sending = ""
    students.forEach(student => {
        sending += student.toString() + "\n"
    })
    res.type("text/plain")
    res.send(sending)
})

app.get('/studentFactory', function (req, res){
    let sending = ""
    factoryStudents.forEach(student => {
        sending += student.toString() + "\n"
    })
    res.type("text/plain")
    res.send(sending)
})

let path = require('path')
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, function(){
    console.log("Server is now listening to Port: 3000");
});