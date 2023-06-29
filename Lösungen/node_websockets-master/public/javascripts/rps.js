const playernames = ["Mathilda", "Lisa", "Louisa", "Ina", "Moritz", "Theo", "Paul", "Felix", "Sophie", "Josephine",
             "Martin", "Jan", "Max"]

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('name').value = playernames[Math.floor(Math.random() * playernames.length)]

    // open Websocket connection
    const socket = new WebSocket("ws://localhost:3000")

    // some standard event handlers
    socket.onopen = () => {
        console.log("WebSocket opened")
    }

    socket.onerror = (error) => {
        console.log(`WebSocket error: ${error}`)
    }

    document.getElementById('submit').addEventListener('click', function(){
        // show choice buttons
        document.getElementById("choices").style.display = "block"
    })

    document.querySelectorAll('.choice').forEach(item => {
        item.addEventListener('click', function(){
            // send infos (username + choice) to server
            socket.send(JSON.stringify( {user: document.getElementById("name").value, value: item.textContent} ))
        })
    })

    // message from server
    socket.onmessage = message => {
        console.log("message received")
        const res = JSON.parse(message.data)
        const infos = document.getElementById("infos")
        if(res != "already chosen"){
            setTimeout(() => {
                infos.append(res.playerA + " has chosen " + res.valueA + ".")
                infos.append(document.createElement("br"))
            }, 0)
            setTimeout(() => {
                infos.append(res.playerB + " has chosen " + res.valueB + ".")
                infos.append(document.createElement("br"))
            }, 1000)
            setTimeout(() => {
                infos.append("And the winner is.....    ")
            }, 2000)
            setTimeout(() => {
                infos.append(res.winner + "!")
                infos.append(document.createElement("br"))
            }, 3500)
        }
        else{
            infos.append(document.getElementById("name").value + ", you already chose!")
            infos.append(document.createElement("br"))
        }
    }
})

