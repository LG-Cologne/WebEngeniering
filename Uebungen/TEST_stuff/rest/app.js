import path from 'path'
import { fileURLToPath } from 'url'

import todoAPI from './routes/todos.routes.js';
import express from 'express';

const app = express();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/scripts/mustache', express.static(path.join(__dirname, 'node_modules/mustache')))


// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// for parsing request bodies as plain text
app.use(express.text());


app.use('/todos', todoAPI);


const PORT = 3001
app.listen(PORT, () => console.log('Todo app listening on http://localhost:'+ PORT +'!'));
