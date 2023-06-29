$(async function () {
    // Element mit ID list zwischenspeichern
    let listNode = $('#list')

    // Einfügen eines neuen Eintrages
    $('#newTodo').click(async function () {
        let fetchOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'text/plain'
            },
            body: $('#item').val()
        }
        // Eintrag übermitteln
        let res = await fetch("/todos", fetchOptions)
        let todoItem = await res.json()
        await addTodo(todoItem)
    })

    function getDeleteClickHandler(itemNode) {
        return async function(){
            let fetchOptions = {
                method: "DELETE",
            }
    
            let url = "/todos/" + itemNode.attr("data_id")
            await fetch(url, fetchOptions)
            itemNode.remove()
        }
    }

    function getDoneClickHandler(itemNode) {
        return async function(){
            let url = "/todos/" + itemNode.attr("data_id")
    
            fetchOptions = {
                method: "PATCH",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify([
                    {
                        "op": "replace",
                        "path": "/done",
                        "value": !(itemNode.hasClass('done'))
                    }
                ])
            }
    
            await fetch(url, fetchOptions)
            itemNode.toggleClass('done')
        }
    }

    // Fügt ein ToDo dem DOM hinzu
    // Erwartet ein Objekt, wie z.B.:
    // { title : "Einkaufen gehen", done : false, id : 10 }
    // hier muss die Template-Engine genutzt werden
    // und die Click-Handler an die Klassen aus dem Template gebunden werden
    async function addTodo(item) {
        // get list item template from backend (static file)
        let res = await fetch('/templates/todos_tpl.html')
        let template = await res.text()
        let output = Mustache.render(template, item)
        let itemNode = $(output)

        $(itemNode).find('.todo_item').click(getDoneClickHandler(itemNode))
        $(itemNode).find('.delete_links').click(getDeleteClickHandler(itemNode))
        
        // Erstelltes Element zum DOM hinzufügen
        listNode.append(itemNode)

        // Falls übergebenes Todo bereits erledigt ist, auf der Website die done-Klasse hinzufügen
        if (item.done) {
            $(itemNode).addClass('done')
        }
    }

    // Alle Todos laden
    async function loadAll() {
        let res = await fetch("/todos")
        let list = await res.json()
        for(let element of list){
            await addTodo(element)
        }
    }

    // Alle erledigten löschen
    $('#deleteChecked').click(async function () {
        // fetch-Anfrage (Node-Backend sucht entsprechend die erledigten Einträge)
        let fetchOptions = {
            method: "DELETE"
        }

        await fetch("/todos?done=true", fetchOptions)
        listNode.empty()
        await loadAll()
    })

    // Bei Beginn alle Einträge laden
    await loadAll()
})