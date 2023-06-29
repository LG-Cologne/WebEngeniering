//Aufgabe Node.js & HTML

// core modules
const path = require('path')
const fs = require('fs')

// third party modules
const express = require('express')
const { check  } = require('express-validator') // input validator
const cookieParser = require('cookie-parser')
const morgan = require('morgan') // http request logger
const consolidate = require('consolidate') // template engine

// own modules
const Student = require('./modules/student')

const app = express()

app.engine('html', consolidate.mustache)
app.set('view engine', 'html')
app.set('views', path.join(__dirname,'views'))

app.use(morgan('tiny')) // logger

app.use(express.urlencoded({extended: true})) // access url encoded form data

app.use(cookieParser()) // for parsing Cookies

// for serving static files, express needs to know the folder where the static files are located
// in this case the stylesheet login.css
app.use(express.static(path.join(__dirname, 'public'), {fallthrough: true, index: false}))
//app.use(express.static(path.join(__dirname, 'public')))


// set a cookie - Middleware reacts to all requests (Entrypoint for all requests, same as with '/')
app.use(function (req, res, next) {
    res.cookie('lastVisit', new Date().toLocaleTimeString('de-de'), { maxAge: 900000, httpOnly: true })
    next() // <-- important! calls next Middleware-Function
})


// Routes
app.get('/', function (req, res, next) {
    const cookie = req.cookies
    let result = ''
    if ('lastVisit' in cookie) {
        result = 'Du hast die Seite zuletzt um ' + cookie['lastVisit'] + ' Uhr besucht!'
        console.log(cookie['lastVisit'])
    } else {
        result = 'Erster Besuch!'
    }

    let rData = {'cookie_data': result}
    res.render('index_bootstrap_tpl', rData)
})


// without using template engine
// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/index.html_'))      ///index_bootstrap.html
// })



app.post('/print', check('user').escape(), check('note').isInt({min: 1, max: 6}).toInt(), function(req, res){
    // only for testing)
    console.log('POST:')
    console.log(req.body)

    let result = "POST: " + JSON.stringify({ user: req.body.user, note: req.body.note}) + " GET: " + JSON.stringify({ user: req.query.user, note: req.query.note})
    res.type("text/plain").send(result)
})

app.get('/print', check('user').escape(), check('note').isInt({min: 1, max: 6}).toInt(), function(req, res){
    console.log('GET:')
    console.log(req.query)
    let result = " GET: " + JSON.stringify({ user: req.query.user, note: req.query.note})
    res.type("text/plain").send(result)
})


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

    result += "\n Nach dem Sortieren: \n"
    students.forEach(s =>{
        result+=s.toString()+"\n"
    })

    console.log(result)
    res.type("text/plain").send(result)
})

app.get('/studentFactory', function(req, res){
    var createStudentFactory = (function(note){
        return function (name) {
            let s = new Student(name)
            s.note = note
            return s
        }
    })

    let studentFactory = createStudentFactory(5)
    let studentMax = studentFactory('Max')
    res.type("text/plain").send(studentMax.toString())
})


app.listen(3000, () => console.log('Student app listening on port 3000!'))


