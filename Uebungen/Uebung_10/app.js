// core modules
const path = require('path')

// third party modules
const express = require('express')
const todoAPI = require('./roots/todos.routes.js')
const app = express()

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/scripts/mustache', express.static(path.join(__dirname, 'node_modules/mustache')))
app.use(express.json())
app.use(express.text())
app.use('/todos', todoAPI);


app.listen(3000, () => console.log('Student app listening on port 3000!'))



