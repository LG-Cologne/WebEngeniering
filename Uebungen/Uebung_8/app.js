const express = require('express');
const app = express();
const todoAPI = require('./roots/todos.routes.js')

app.use(express.json())
app.use(express.text())
app.use('/todos', todoAPI);

app.listen(3000, function () {
    console.log("Server is now listening to Port: 3000");
});

