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
const {check, validationResult} = require('express-validator');
const cookie = require('cookie-parser)');

let app = express();

app.listen(3000, function () {
    console.log("Server is now listening to Port: 3000");
});

app.get('/student', function (req, res) {
    let sending = ""
    students.forEach(student => {
        sending += student.toString() + "\n"
    })
    res.type("text/plain")
    res.send(sending)
})

app.get('/studentFactory', function (req, res) {
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
    res.type("text/plain");
    res.send(req.query.name + " " + req.query.pw + " " + req.query.note)
})

app.post('/print', function (req, res) {
    res.type("text/plain");
    res.send(req.body.name + " " + req.body.pw + " " + req.body.note)
})

app.all('/print', [check('user').isLength(5), check('pw'), check('note').isIn(["Sehr Gut", "Gut", "Befriedigend", "Ausreichend", "Mangelhaft", "Ungenügend"])], function (req, res){
    if(validationResult(req).isEmpty()){
        let user = req.query.user;
        let pw = req.query.pw;
        let note = req.query.note;
        res.type("text/plain").send("User: " + user + " PW: " + pw + " Note: " + note);
        res.cook
    }else{
        res.type('text/plain').status(422).send('Error in input!');
    }
});

app.all('/cookie', function (req, res){
    res.cookie('date', Date).send('Cookie-Parser');
})
