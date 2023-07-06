import todoList from '../modules/todo.model.js'
import express from 'express'
const router = express.Router();
const todos = new todoList();

const volume = [
    "Weihnachtsgeschenke kaufen",
    "Eis essen mit der Liebsten",
    "neues Fahrrad kaufen"
]

volume.forEach((todo) => {
    todos.addTodo(todo);
})

todos.setDone(0, true)


// GET all todos
router.get('/', function (req, res) {
    res.type('application/json');
    res.send(todos.getAllTodos());
})

// POST new todo
router.post('/', function (req, res) {
    const todo = req.body;
    const id = todos.addTodo(todo);

    res.type('application/json');
    res.send(todos.getTodo(id));
});

// GET todo with id
router.get('/:id', function (req, res) {
    const id = parseInt(req.params.id);
    const todo = todos.getTodo(id);

    res.type('application/json');
    res.send(todo);
});


// DELETE todo with id
router.delete('/:id', function (req, res) {
    const id = parseInt(req.params.id);

    let isDeleted = todos.removeTodo(id);

    if (isDeleted) {
        console.log("Todo was deleted with id:", id);
        res.status(200).send();
    } else {
        console.log("No Entry with id:", id);
        res.status(404).send();
    }
});

// DELETE all todos and DELETE todos marked as done
router.delete('/', (req, res) => {
    if (req.query.done) {
        console.log("deleted done");

        todos.clearDone();
        res.send(todos.getAllTodos())
    } else {
        console.log("deleted all");

        todos.clear();
        res.send();
    }
});

// PATCH todo with id: alters todos' status to done/undone
router.patch('/:id', (req, res) => {
    console.log("hallo")
    const id = parseInt(req.params.id);
    const data = req.body[0]
    
    todos.setDone(id, data.value)
    const todo = todos.getTodo(id)
    console.log(todos)
    res.send(todo)
});

export default router