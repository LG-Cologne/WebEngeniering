const todoList = require('../modules/todo.model.js')
const express = require('express')
const router = express.Router()
const todos = new todoList()

todos.addTodo("Sport")
todos.addTodo("Blumen für die Mama kaufen")

router.get('/', function (req, res) {
    res.json(todos.getAllTodos());
})

router.post('/', function (req, res) {
    const id = parseInt(todos.addTodo(req.body));
    res.json(todos.getTodo(id));
})

router.get('/:id', function (req, res) {
    const id = parseInt(req.params.id)
    res.json(todos.getTodo(id));
})

router.delete('/:id', function (req, res) {
    const id = parseInt(req.params.id)
    todos.removeTodo(id)
    res.send();
})

router.delete('/', function (req, res) {
    if (req.query.done === true) {
        todos.clearDone()
        res.json(todos.getAllTodos());
    } else {
        todos.clear()
        res.send();
    }
})

router.patch('/:id', function (req, res) {
    const id = parseInt(req.params.id)
    todos.setDone(id, req.body[0].value)
    res.json(todos.getTodo(id));
})

module.exports = router;