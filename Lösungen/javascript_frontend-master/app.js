// core modules
import path from 'path'
import { fileURLToPath } from 'url'

// third party modules
import express from 'express'
const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(3000, () => console.log('App listening on port 3000!'))