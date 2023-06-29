// core modules
//const path = require('path')
import path from 'path'
import { fileURLToPath } from 'url';

// third party modules
//const express = require('express')
import express from 'express'
const app = express()

// own modules
//const Student = require('./modules/student')
import Student from './modules/student.js'

// urlencoded
app.use(express.urlencoded({extended: true}))

// deliver single static file
// app.get('/', function(req, res){
//     res.sendFile(path.join(__dirname + '/public/index.html'))
// })

// deliver all static files in public folder
// app.use(express.static(path.join(__dirname, 'public'), {fallthrough: true, index: false}))
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname, 'public')))

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

app.post('/print', function(req, res){
    // only for testing
    console.log('POST:')
    console.log(req.body)

    let result = "POST: " + JSON.stringify({ user: req.body.user, note: req.body.note})
    res.type("text/plain").send(result)
})

app.get('/print', function(req, res){
    // only for testing
    console.log('GET:')
    console.log(req.query)

    let result = " GET: " + JSON.stringify({ user: req.query.user, note: req.query.note})
    res.type("text/plain").send(result)
})

app.listen(3000, () => console.log('Student app listening on port 3000!'))