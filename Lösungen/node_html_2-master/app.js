// third party modules
import express from 'express'
import { check, validationResult  } from 'express-validator' // input validator
import  cookieParser from 'cookie-parser'
import consolidate from 'consolidate' // template engine

const app = express()

// own modules
import Student from './modules/student.js'

// core modules
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// static files (no default index.html anymore)
app.use(express.static(path.join(__dirname, 'public'), {fallthrough: true, index: false}))

// urlencoded
app.use(express.urlencoded({extended: true}))

// for parsing Cookies
app.use(cookieParser()) 

// Template Engine
app.engine('html', consolidate.mustache)
app.set('view engine', 'html')
app.set('views', path.join(__dirname,'views'))

// set a cookie - Middleware reacts to all requests (Entrypoint for all requests, same as with '/')
app.use(function (req, res, next) {
    res.cookie('lastVisit', new Date().toLocaleTimeString('de-de'), { maxAge: 900000, httpOnly: true })
    next() // <-- important! calls next Middleware-Function
})

// new "index.html" route
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

    // standard
    //res.render('index_tpl', rData)

    // with bootstrap
    res.render('index_bootstrap_tpl', rData)
})

app.post('/print', check('user').escape(), check('note').isInt({min: 1, max: 6}).toInt(), function(req, res){
    const errorFormatter = ({ location, msg, param, value, nestedErrors}) => {
        return `${location}[${param}]: ${msg}`;
    };
    const errorResult = validationResult(req).formatWith(errorFormatter);

    if (!errorResult.isEmpty()) {
        return res.json({errors: errorResult.array()});
    }

    // only for testing
    console.log('POST:')
    console.log(req.body)

    let result = "POST: " + JSON.stringify({ user: req.body.user, note: req.body.note}) + " GET: " + JSON.stringify({ user: req.query.user, note: req.query.note})
    res.type("text/plain").send(result)
})

app.get('/print', check('user').escape(), check('note').isInt({min: 1, max: 6}).toInt(), function(req, res){

    const errorFormatter = ({ location, msg, param, value, nestedErrors}) => {
        return `${location}[${param}]: ${msg}`;
    };
    const errorResult = validationResult(req).formatWith(errorFormatter);

    if (!errorResult.isEmpty()) {
        return res.json({errors: errorResult.array()});
    }

    // only for testing
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