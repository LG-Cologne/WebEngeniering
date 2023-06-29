import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import ws from 'ws'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, 'public')))

let userRecords = []
let choices = ['rock', 'paper', 'scissors']
// t = tie
// a = player a wins
// b = player b wins
const results = [
    ['t', 'b', 'a'],
    ['a', 't', 'b'],
    ['b', 'a', 't'],
]

const server = app.listen(3000, () => console.log('RPS app listening on port 3000!'))
const wsServer = new ws.Server({ noServer: true })

wsServer.on('connection', (socket) => {
    socket.on('message', (data) => {
        let userInfos = JSON.parse(data)

        for (let record of userRecords) {
            if (userInfos.user == record.user) {
                socket.send(JSON.stringify("already chosen"))
                return
            }
        }

        userRecords.push(userInfos)
        if (userRecords.length == 2) {
            // get index of choice
            let userAChoiceIndex = choices.indexOf(userRecords[0].value.toLowerCase())
            let userBChoiceIndex = choices.indexOf(userRecords[1].value.toLowerCase())
            let userResult = results[userAChoiceIndex][userBChoiceIndex]
            let winner = userResult == 't' ? 'Tie' : userResult == 'a' ? userRecords[0].user : userRecords[1].user
            // userRecords.push({winner: winner})

            wsServer.clients.forEach((client) => {
                client.send(JSON.stringify({
                    'playerA' : userRecords[0].user,
                    'valueA' : userRecords[0].value,
                    'playerB' : userRecords[1].user,
                    'valueB' : userRecords[1].value,
                    'winner' : winner}))
            })
            userRecords = []
        }
    })
})

// Verbindung wird auf neues Protokoll geupgraded (von normal auf Websockets-Protokoll)
server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request);
    })
})

// Mount the express app here
// server.on('request', app)

