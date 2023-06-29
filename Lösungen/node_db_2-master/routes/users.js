import express from 'express'
const router = express.Router()

import database_access from '../modules/database.js'

// input validator
import { check, validationResult } from 'express-validator'

// Parse URL-encoded bodies (as sent by HTML forms)
router.use(express.urlencoded({extended: true}))

router.get('/login', function(req, res){
    // Check if session exists
    if (req.session && req.session.user) {
        res.redirect('/info')
    }
    else{
        res.render('login_tpl')
    }
})

router.post('/check_login', [check('user').escape()], async (req, res) => {
    const user = req.body.user
    const password = req.body.pw

    try{
        const db = await database_access.getInstance()
        await db.validateUser(user, password)
        req.session.user = user
        res.redirect('/info')

    } catch (err) {
        let rData = {}
        console.log("error validateUser ", err)
        if(err.error === "user-not-exists" || err.error === "password-wrong"){
            rData.err_msg = "Password and Username do not match."
        }
        else{
            rData.err_msg = "Something went wrong."
        }
        res.render('login_tpl', rData)
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
        res.render('register_tpl', {err_msg: "Username or password missing!"})
        return
    }

    // check if grade is between 1 and 6 and integer type
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.render('register_tpl', {err_msg: errors.mapped().note.msg})
        return
    }

    const grade = parseInt(req.body.note)

    let rData = {}
    try{
        const db = await database_access.getInstance()
        const user_exists = await db.userExists(user)
        if(!user_exists) {
            await db.registerUser(user, password, grade)
            req.session.user = user
            console.log('redirect')
            return res.redirect('/info')
        }
        else{
            rData.err_msg = "User already exists."
        }

    } catch (err) {
        console.log("error register: ", err.error)
        rData.err_msg = "Something went wrong."
    }

    res.render('register_tpl', rData)
})

router.get('/logout', function(req, res){
    req.session.destroy()
    res.redirect('/')
})


export default router

