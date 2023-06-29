// core modules
import path from 'path'
import { fileURLToPath } from 'url'

// third party modules
import express from 'express'
import consolidate from 'consolidate'

// own modules
import users from './routes/users.js'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// statische dateien
app.use('/', express.static(path.join(__dirname, 'public'), {index: 'login.html'}))

app.engine('html', consolidate.mustache);
// set .html as the default extension
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use('/users', users)

app.listen(3000, () => console.log('App is listening on "http://localhost:3000/"'))