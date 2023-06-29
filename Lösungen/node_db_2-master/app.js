// core modules
import path from 'path'
import { fileURLToPath } from 'url'

// third party modules
import express from 'express'
import session from 'express-session'
import consolidate from 'consolidate'

// own modules
import info from './routes/info.js'
import users from './routes/users.js'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.engine('html', consolidate.mustache);
// set .html as the default extension
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(session({
    secret: '6m3jjHymOKD~C>n',
    resave: false,
    saveUninitialized: true,
}))

app.use('/', info)
app.use('/users', users)

app.get('/', function(req, res){
    res.redirect('/users/login')
})

app.listen(3000, () => console.log('App is listening on "http://localhost:3000/"'))