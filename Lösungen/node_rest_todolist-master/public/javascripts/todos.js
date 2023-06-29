document.addEventListener('DOMContentLoaded', async function() {
    // Element mit ID list zwischenspeichern
    const listNode = document.getElementById('list')

    // Einfügen eines neuen Eintrages
    document.getElementById('newTodo').addEventListener('click', async function (event) {
        const fetchOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'text/plain'
            },
            body: document.getElementById('item').value
        }
        // Eintrag übermitteln
        const res = await fetch("/todos", fetchOptions)
        const todoItem = await res.json()
        await addTodo(todoItem)
    })

    function getDeleteClickHandler(itemNode) {
        return async function () {
            const fetchOptions = {
                method: "DELETE",
            }

            const url = "/todos/" + itemNode.id
            await fetch(url, fetchOptions)
            itemNode.remove()
        }
    }

    function getDoneClickHandler(itemNode) {
        return async function () {
            const url = "/todos/" + itemNode.id

            fetchOptions = {
                method: "PATCH",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify([
                    {
                        "op": "replace",
                        "path": "/done",
                        "value": !(itemNode.classList.contains('done'))
                    }
                ])
            }

            await fetch(url, fetchOptions)
            itemNode.classList.toggle('done')
        }
    }

    // Fügt ein ToDo dem DOM hinzu
    // Erwartet ein Objekt, wie z.B.:
    // { title : "Einkaufen gehen", done : false, id : 10 }
    // hier muss die Template-Engine genutzt werden
    // und die Click-Handler an die Klassen aus dem Template gebunden werden
    async function addTodo(item) {
        // get list item template from backend (static file)
        const res = await fetch('./templates/todos_tpl.html')
        const template = await res.text()
        const output = Mustache.render(template, item)
        listNode.insertAdjacentHTML('beforeend', output)

        const listItem = document.getElementById(item.id)
        listItem.querySelector('.todo_item').addEventListener('click', getDoneClickHandler(listItem))
        listItem.querySelector('.delete_links').addEventListener('click', getDeleteClickHandler(listItem))

        // Falls übergebenes Todo bereits erledigt ist, auf der Website die done-Klasse hinzufügen
        if (item.done) {
            listItem.classList.add("done")
        }
    }

    // Alle Todos laden
    async function loadAll() {
        const res = await fetch("/todos")
        const list = await res.json()
        for (let element of list) {
            await addTodo(element)
        }
    }

    // Alle erledigten löschen
    document.getElementById('deleteChecked').addEventListener('click', async function (event) {
        // fetch-Anfrage (Node-Backend sucht entsprechend die erledigten Einträge)
        const fetchOptions = {
            method: "DELETE"
        }

        await fetch("/todos?done=true", fetchOptions)
        while (listNode.firstChild)
            listNode.removeChild(listNode.firstChild);
        await loadAll()
    })

    // Bei Beginn alle Einträge laden
    await loadAll()
})
