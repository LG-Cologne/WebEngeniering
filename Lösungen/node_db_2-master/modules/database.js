import Sequelize from 'sequelize'
import bcrypt from 'bcryptjs'
import Student from './student.js'

export default class Database{

    constructor(database) {
        if (typeof database === 'undefined') {
            throw new Error('Cannot be called directly')
        }
        this._database = database
    }

    static async _init() {
        //Connection to database 
        const database =  new Sequelize({
            dialect: 'sqlite',
            storage: 'db/webengDB.db'
        })

        //Testing the connection
        try {
            await database.authenticate()
            console.log('Connection has been established successfully.')
        } catch (error) {
            console.error('Unable to connect to the database:', error)
        }
        return database
    }

    static async getInstance() {
        // check if Database instance already exists
        if(!Database.instance){
            let database = await Database._init()
            Database.instance = new Database(database)
        }
        return Database.instance
    }

    async validateUser(user, password){
        try{
            const userinfos = await this._database.query("SELECT password FROM users WHERE username=:user",
                { replacements: {user: user}, type: this._database.QueryTypes.SELECT }
            )
            if(userinfos.length != 0){
                const result = await bcrypt.compare(password, userinfos["0"].password)
                if(result === false){
                    return Promise.reject({error: "password-wrong"})
                }
                else{
                    return Promise.resolve(true)
                }
            }
            else{
                console.log("reject")
                return Promise.reject({error: "user-not-exists"})
            }
        } catch(err){
            return Promise.reject({error: "database-error"})
        }
    }

    async userExists(user){
        try{
            const userinfos = await this._database.query("SELECT count(*) as num FROM users WHERE username=:user",
                { replacements: {user: user}, type: this._database.QueryTypes.SELECT }
            )

            // Each record will now be an instance of userinfos
            if(userinfos['0'].num === 0){
                console.log("user doesn't exist")
                return Promise.resolve(false)
            }
            else{
                console.log("user exists")
                return Promise.resolve(true)
            }
        } catch(err){
            return Promise.reject({error: "database-error"})
        }
    }

    async registerUser(user, password, grade){
        try{
            const saltRounds = 7
            const hash = await bcrypt.hash(password, saltRounds)
            console.log(hash)
            return this._database.query("INSERT INTO users(username, password, grade) VALUES(:user, :password, :grade)",
                { replacements: {user: user, password: hash, grade: grade}, type: this._database.QueryTypes.INSERT }
            )
        } catch(err) {
            return Promise.reject({error: "user-insert-failed"})
        }
    }

    async getStudent(user){
        try{
            const userinfos = await this._database.query("SELECT grade FROM users WHERE username = :user",
                { replacements: { user: user}, type: this._database.QueryTypes.SELECT })

            if(userinfos.length != 0){
                let student = new Student(user)
                student.note = userinfos['0'].grade
                return Promise.resolve(student) // = return student
            }
            else{
                return Promise.reject(false) // = throw false
            }
        } catch(err) {
            return Promise.reject({error: "database-error"})
        }
    }
}