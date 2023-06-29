import path from 'path'
import { fileURLToPath } from 'url'

import todoListAPI from './routes/todos.routes.js'

import express from 'express'
const app = express();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// serve static files
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/scripts/mustache', express.static(path.join(__dirname, 'node_modules/mustache')))

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// for parsing request bodies as plain text
app.use(express.text());

app.use('/todos',todoListAPI);

app.listen(3000, () => console.log('Todo app listening on http://localhost:3000!'));

