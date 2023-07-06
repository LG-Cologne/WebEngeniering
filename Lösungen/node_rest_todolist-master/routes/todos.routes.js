import todoList from '../modules/todo.model.js'
import express from 'express'
const router = express.Router();
const todos = new todoList();

// GET all todos
router.get('/', function (req, res) {
    res.type('application/json');
    res.send(todos.getAllTodos());
})

// POST new todo
router.post('/', function (req, res) {

    let todo = req.body;
    if (!todo) return res.status(400).send("invalid todo")

    console.log('Request Body:', req.body);

    let id = todos.addTodo(todo);

    console.log('todos:', todos);

    res.type('application/json');
    res.send(todos.getTodo(id));
})

// GET specific todo
router.get('/:id([0-9]+)', function (req, res) {
    let id = parseInt(req.params.id)
    console.log(id)
    // if(isNaN(id)) return res.status(400).send("invalid id")

    let result = todos.getTodo(id);
    if (!result) return res.status(404).send("no ToDo with specified id")

    res.type('application/json');
    res.send(result);
})

// DELETE specific todo
router.delete('/:id([0-9]+)', function (req, res) {
    if (todos.removeTodo(parseInt(req.params.id))) {
        res.status(200).send()
    }
    else {
        res.status(404).send("The requested resource was not found")
    }
})

// DELETE /todos --> removes all todos
// DELETE /todos?done=true --> removes all todos done
router.delete('/', function (req, res) {
    if (typeof req.query.done != 'undefined' && req.query.done != 'true') {
        res.status(404).send("Invalid done value");
    }
    else if (typeof req.query.done != 'undefined') {
        // remove alle todos done
        todos.clearDone();
        let results = todos.getAllTodos();
        res.type('application/json');
        res.send(results);
    }
    else {
        // remove all todos
        todos.clear();
        res.status(200).send();
    }
});

// PATCH specific todo: alters todos' status to done/undone
router.patch('/:id([0-9]+)', function (req, res) {
    if (req.body[0].op === 'replace' && req.body[0].path === '/done' && typeof (req.body[0].value) == 'boolean') {
        todos.setDone(parseInt(req.params.id), req.body[0].value);
        res.type('application/json');
        res.send(todos.getTodo(parseInt(req.params.id)));
    }
    else {
        res.status(404).send("The requested resource was not found");
    }
})

export default router