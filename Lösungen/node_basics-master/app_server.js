//Aufgabe Javascript/Node.js Basics - Aufgabenteil: Webserver-Funktionalität ("Umstellung auf Node.js")

// core modules
const path = require('path')

// third party modules
const express = require('express')

// own modules
const Student = require('./modules/student')

const app = express()

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/public/index_js_basics.html'));
// });

app.get('/student', function(req, res){
    let students = [new Student("Fritz"),new Student("Anna"),new Student("Bob")]
    let result = ""

    students.forEach(s => {
        s.note = parseInt(Math.random()*6+1)
    })

    result += "Vor dem Sortieren: \n"

    students.forEach(s =>{
        result+=s.toString()+"\n"
    })

    students.sort(function(a,b){
        return(a.note-b.note)
    })

    result += "\nNach dem Sortieren: \n"
    students.forEach(s =>{
        result+=s.toString()+"\n"
    })

    //console.log(result)
    res.type("text/plain").send(result)
})

app.get('/studentFactory', function(req, res){
    var createStudentFactory = (function(note){
        return function (name) {
            let s = new Student(name);
            s.note = note
            return s;
        }
    })

    let studentFactory = createStudentFactory(5)
    let studentMax = studentFactory('Max')
    res.type("text/plain").send(studentMax.toString())
})


// Route not found (404)
// app.use(function(req, res, next) {
//     return res.status(404).send();
// });


app.listen(3000, () => console.log('Student app listening on port 3000!'))