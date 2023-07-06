document.addEventListener("DOMContentLoaded", async () => {

    list = document.getElementById("list")
    await loadAll()

    async function loadAll() {
        let response = await fetch('/todos',
            {
                method: "GET",
                headers: { 'Content-Type': 'text/plain' }
            })

        let todo_data = await response.json();

        for (let todo of todo_data) {
            await addTodo(todo)
        };
    }

    async function addTodo(todo) {
        // console.log(todo)
        let response = await fetch('/templates/todo.html')
        let template = await response.text()
        let rendered = Mustache.render(template, todo)
        // console.log(rendered)

        list.insertAdjacentHTML('beforeend', rendered)

        list_item = document.getElementById(todo.id)
        list_item.querySelector('input[type="checkbox"]').addEventListener("click", handleCheckboxClick(list_item))
    }

    async function handleCheckboxClick(list_item) {
        return async function () {
            await fetch('/todo/' + list_item.id,
                {
                    method: 'PATCH',
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify([{
                        "op": "replace",
                        "path": "/done",
                        "value": list_item.querySelector('input [type="checkbox"]').checked
                    }])

                }
            )
        }
    }

    async function reloadTodos() {
        while (list.hasChildNodes()) {
            list.removeChild(list.firstChild);
        }
        await loadAll()
    }

    document.getElementById('clearDone').addEventListener('click', async () => {
        await fetch('/todos?done=true',
            {
                method: 'DELETE'
            }
        )
        await reloadTodos()
    })

    // var todo_entries = document.querySelectorAll('li');
    // for (let i = 0; i < todo_entries.length; i++) {
    //     todo_entries[i].addEventListener('click', handleDoneButton)
    // }


    // async function handleDoneButton() {
    //     // isDone = this.classList.contains('done');
    //     console.log(this)
    //     checkbox = this.querySelector("input[type='checkbox']");
    //     console.log(checkbox.checked)


    //     let response = await fetch('/todos/' + this.id, {
    //         method: 'PATCH',
    //         headers: {
    //             "content-type": "application/json"
    //         },
    //         body: JSON.stringify[{
    //             "op": "replace",
    //             "path": "/done",
    //             "value": checkbox.checked
    //         }]
    //     })
    // }



    // const testTodo = {
    //     id: 2,
    //     title: 'neues Fahrrad kaufen',
    //     done: false
    // }
})