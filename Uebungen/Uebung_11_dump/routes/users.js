const path = require("path");
const express = require('express');
const router = express.Router();
const {Sequelize, QueryTypes} = require('sequelize');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'db', 'webengDB.db')
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

router.post('/check_login', async (req, res) => {
    let userinfos = await sequelize.query(
        'SELECT * FROM users WHERE username = :inputUsername AND password = :inputPassword',
        {
            replacements: {inputUsername: req.body.user, inputPassword: bcrypt.hashSync(req.body.pw, salt)},
            type: QueryTypes.SELECT
        }
    );
    if (userinfos.length === 0) {
        res.status(403).send('Benutzer nicht vorhanden oder Passwort falsch!');
    } else {
        res.send(userinfos["0"].password);
    }
});

router.post('/register',
    check('user').isAlpha().withMessage('Nur alphanumerische Zeichen zulässig'),
    check('grade').isIn([1, 2, 3, 4, 5, 6]).withMessage('Die Note muss zwischen 1 und 6 liegen'),
    async (req, res) => {
        const errors = validationResult(req);
        // console.log(errors.errors[0].msg);
        // console.log(errors.mapped());
        let message = '';
        if (!errors.isEmpty()) {
            errors.errors.forEach(error => {
                message += error.msg + '\n';
            });
            res.render('register_tpl', {
                error_message: message
            });
        } else {
            let username = req.body.user;
            let password = req.body.pw;
            let grade = req.body.grade;
            let hashedPassword = bcrypt.hashSync(password, salt);
            await sequelize.query(
                'INSERT INTO users (username, password, grade) VALUES (:inputUsername, :inputPassword, :inputGrade)',
                {
                    replacements: {inputUsername: username, inputPassword: hashedPassword, inputGrade: grade},
                    type: QueryTypes.INSERT
                }
            );
            res.send('Registrierung hat geklappt!');
        }
    });

router.get('/register', (req, res) => {
    res.render('register_tpl');
});

module.exports = router;