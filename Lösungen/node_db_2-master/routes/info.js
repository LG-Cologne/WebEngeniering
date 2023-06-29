import Student from '../modules/student.js'
import database_access from '../modules/database.js'

import express from  'express'
const router = express.Router()


router.get('/info', async function(req, res){
    if(req.session.user){
        try{
            const db = await database_access.getInstance()
            const student = await db.getStudent(req.session.user)
            const rData = {'username': student.name, 'note': Student.getNotenBewertung(student.note)}
            res.render('info_tpl', rData)
        } catch (err) {
            res.type("text/html").send("Something went wrong.")
        }
    }
    else{
        res.status(403)
        res.send('Access forbidden')
    }
})

export default router