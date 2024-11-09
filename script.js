let titulo = document.getElementById('cabeca')
let all = []
let done = []
let notDone = []



window.onload = function(){
    loadTasks()
}





function addTask() {
    let input = document.getElementById('input')
    let lista = document.querySelector('.listaConversivel')

    if (input.value.trim()) {
        const listItem = createTaskElement(input.value, false)
        lista.appendChild(listItem)
        notDone.push(listItem)
        
        saveTasks() // Save the updated task list to localStorage
        input.value = ""
    } else {
        alert('Adicione uma tarefa')
    }
}

function createTaskElement(taskText, isDone) {
    const listItem = document.createElement("li")
    listItem.innerHTML = `${taskText} <button onclick="removeTask(this)">Delete</button> <button onclick="taskDone(this)" type="button">Done</button>`
    
    // Apply appropriate class and add to the correct list
    if (isDone) {
        listItem.classList.add("done")
        done.push(listItem)
    } else {
        listItem.classList.add("not-done")
        notDone.push(listItem)
    }

    return listItem
}

function removeTask(button) {
    const listItem = button.parentElement
    listItem.remove()

    done = done.filter(item => item !== listItem)
    notDone = notDone.filter(item => item !== listItem)
    saveTasks()
}

function taskDone(item) {
    const listItem = item.parentElement

    listItem.classList.add("done")
    listItem.classList.remove("not-done")

    notDone = notDone.filter(task => task !== listItem)
    done.push(listItem)
    saveTasks()



}

function showDone() {
    let lista = document.querySelector('.listaConversivel')
    lista.innerHTML = ""
    done.forEach(task => lista.appendChild(task))
}

function showNotDone() {
    let lista = document.querySelector('.listaConversivel')
    lista.innerHTML = ""  // Clear the current list

    // Display only not-done tasks
    notDone.forEach(task => lista.appendChild(task))
}

function showAll() {
    let lista = document.querySelector('.listaConversivel')
    lista.innerHTML = ""  // Clear the current list
    all = done.concat(notDone)
    // Display all tasks
    all.forEach(task => lista.appendChild(task))
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = {
        done: done.map(task => task.textContent.trim().replace("Delete Done", "")),
        notDone: notDone.map(task => task.textContent.trim().replace("Delete Done", ""))
    }
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"))
    if (savedTasks) {
        let lista = document.querySelector('.listaConversivel')
        lista.innerHTML = ""  // Clear current list
        
        // Load done tasks
        savedTasks.done.forEach(taskText => {
            const taskElement = createTaskElement(taskText, true)
            lista.appendChild(taskElement)
        })

        // Load not-done tasks
        savedTasks.notDone.forEach(taskText => {
            const taskElement = createTaskElement(taskText, false)
            lista.appendChild(taskElement)
        })
    }
}