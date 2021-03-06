const Student = require('./modules/student')

// Objekte
const andre = new Student('Andre', 1)
const nico = new Student('Nico', 2)
const jonas = new Student('Jonas', 3)

let students = [nico, andre, jonas]

students.sort(function (a, b) {
        return a.note - b.note;
    }
)
;

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
//----------------------------------------------------------------------------

const express = require('express');
let app = express();

const { check } = require('express-validator');

app.listen(3000, function(){
    console.log("Server is now listening to Port: 3000");
});

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

app.use(express.urlencoded(({extended: true})))

app.get('/print', function (req, res) {
    let name = check('name').isAlphanumeric('de-DE').isLength({max: 5})
    check('note').isIn("sehr gut", "gut", "befriedigend", "ausreichend", "mangelhaft", "ungenügend")

    res.type("text/plain");
    res.send(name + " " + req.query.pw + " " + req.query.note)
})
app.put('/update-product', check('id').toInt(), productUpdateHandler)


app.post('/print', function (req, res) {
    res.type("text/plain");
    res.send(req.body.name + " " + req.body.pw + " " + req.body.note)
})

