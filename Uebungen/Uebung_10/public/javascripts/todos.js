document.addEventListener('DOMContentLoaded', async function() {
 
    const listNode = document.getElementById('list') // id der unordered list im HTML
    const input = document.getElementById('input');
 
    // Einfügen eines neuen Todos (POST /todos) &
    // Hinzufügen des Todos auf der Website (Aufruf Funktion: addTodo)
    document.getElementById('newTodo').addEventListener('click', async function (event) {
        // ToDo: Write your Code here

        addTodo(input.value)
    })
 
    function getDeleteClickHandler(itemNode) {
        return async function(){
            // Löschen eines ToDos im Backend und auf der Website
            // ToDo: Write your Code here
        }
    }
 
    function getDoneClickHandler(itemNode) {
        return async function(){ 
            // Ändern (done/undone) eines ToDos im Backend und auf der Website
            // ToDo: Write your Code here
        }
    }
 
    // Fügt ein ToDo dem DOM hinzu
    // Erwartet ein Objekt, wie z.B.:
    // { title : "Einkaufen gehen", done : false, id : 10 }
     // hier muss die Template-Engine genutzt werden
     // und die Click-Handler an die Klassen aus dem Template gebunden werden
    async function addTodo(item) {
        // ToDo: Write your Code here
        listNode.appendChild(item);


    }
 
    // Alle ToDos laden (Route /todos sollte ein Array mit JSON-Objekten zurückgeben) & 
    // auf der Website anzeigen (Iteriere über alle JSON-Objekte und rufe addTodo auf)
    async function loadAll() {
        // ToDo: Write your Code here
    }
 
 
    // Alle erledigten ToDos löschen &
    // auf der Website entfernen
    document.getElementById('deleteChecked').addEventListener('click', async function (event) {
        // ToDo: Write your Code here
    })
 
    // Bei Beginn alle Einträge laden
    await loadAll();
})