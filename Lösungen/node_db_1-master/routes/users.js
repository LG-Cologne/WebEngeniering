import express from 'express'
const router = express.Router()

import path from 'path'
import { fileURLToPath } from 'url'

import Sequelize from 'sequelize'
import bcrypt from 'bcryptjs'

// input validator
import { check, validationResult } from 'express-validator'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Parse URL-encoded bodies (as sent by HTML forms)
router.use(express.urlencoded({extended: true}))

router.post('/check_login', [check('user').escape()], async (req, res) => {
    const user = req.body.user
    const password = req.body.pw

    // connect to database
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path.join(__dirname, '..', 'db', 'webengDB.db')
    })

    // testing the connection
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }

    // database request
    const userinfos = await sequelize.query("SELECT password FROM users WHERE username=:user",
            {replacements: {user: user, password: password}, type: sequelize.QueryTypes.SELECT})
    
    if(userinfos.length != 0){
        const result = await bcrypt.compare(password, userinfos["0"].password)
        if(result === true){
            return res.type('text/plain').send('Login successful.')
        } else{
            return res.status(403).type('text/plain').send('Login failed.')
        }
    } else{
        return res.status(403).type('text/plain').send('Login failed.')
    }

})

router.get('/register', function(req, res){
    res.render('register_tpl')
})

router.post('/register', [check('user').escape(), check('note').isInt({min: 1, max: 6}).withMessage('Keine Note zwischen 1 und 6 eingegeben').toInt()], async (req, res) => {
    
    const user = req.body.user
    const password = req.body.pw

    // check if user and password were set
    if(!user || !password){
        res.render('register_tpl', {error_msg: "Username or password missing!"})
        return
    }

    // check if grade is between 1 and 6 and integer type
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.render('register_tpl', {error_msg: errors.mapped().note.msg})
        return
    }

    const grade = parseInt(req.body.note)

    // connect to database
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path.join(__dirname, '..', 'db', 'webengDB.db')
    })

    // testing the connection
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
        res.render('register_tpl', {error_msg: "Unable to connect to the database."})
        return
    }
    
    // inserting the new user
    try{
        const saltRounds = 7;
        const hash = await bcrypt.hash(password, saltRounds)
        await sequelize.query("INSERT INTO users(username, password, grade) VALUES(:user, :password, :grade)",
            { replacements: { user: user, password: hash, grade: grade }, type: sequelize.QueryTypes.INSERT })
        
            return res.type('text/plain').send('User successfully created.')
    } catch(err) {
        console.error('Error while inserting into the database.')
        res.render('register_tpl', {error_msg: "Error while inserting into the database."})
        return
    }
})

export default router

