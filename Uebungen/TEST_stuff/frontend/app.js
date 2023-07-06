// core modules
import path from 'path'
import { fileURLToPath } from 'url'

// third party modules
import express from 'express'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use('/', express.static(path.join(__dirname, 'public')))

const PORT = 3001

app.listen(PORT, () => console.log('Student app listening on port ' + PORT + '!'))