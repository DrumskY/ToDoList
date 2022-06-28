let todoInput
let errorInfo
let addBtn
let ulList
let newTodo

let popup
let popupInfo
let todoTeEdit
let popupInput
let popupAddBtn
let popupCloseBtn

const main = () => {
    prepareDOMElements()
    prepareDOMEvents()
}

const prepareDOMElements = () => {
    todoInput = document.querySelector('.todo-input')
    errorInfo = document.querySelector('.error-info')
    addBtn = document.querySelector('.btn-add')
    ulList = document.querySelector('.todolist ul')

    popup = document.querySelector('.popup')
    popupInfo = document.querySelector('.popup-info')
    popupInput = document.querySelector('.popup-input')
    popupAddBtn = document.querySelector('.accept')
    popupCloseBtn = document.querySelector('.cancel')
}

const prepareDOMEvents = () => {
    addBtn.addEventListener('click', addNewTask)
    ulList.addEventListener('click', checkCilck)
    popupCloseBtn.addEventListener('click', closePopup)
    popupAddBtn.addEventListener('click', changeTodoText)
    todoInput.addEventListener('keyup', enterKeyCheck)
}

const addNewTask = () => {
    if (todoInput.value !== '') {
        newTodo = document.createElement('li')
        newTodo.textContent = todoInput.value
        createToolsArea()

        ulList.append(newTodo)

        todoInput.value = ''
        errorInfo.textContent = ''
    }
    else {
        errorInfo.textContent = 'Wpisz treść zadania'
    }
}

const createToolsArea = () => {
    const toolsPanel = document.createElement('div')
    toolsPanel.classList.add('tools')
    newTodo.append(toolsPanel)

    const buttonComplete = document.createElement('button')
    buttonComplete.classList.add('complete')
    buttonComplete.innerHTML = '<i class="fas fa-check"></i>'

    const buttonEdit = document.createElement('button')
    buttonEdit.classList.add('edit')
    buttonEdit.textContent = 'Edit'

    const buttonDelete = document.createElement('button')
    buttonDelete.classList.add('delete')
    buttonDelete.innerHTML = '<i class="fas fa-times"></i>'

    toolsPanel.append(buttonComplete, buttonEdit, buttonDelete)
}

const checkCilck = e => {
    if (e.target.matches('.complete')) {
        e.target.closest('li').classList.toggle('completed')
        e.target.classList.toggle('completed')
    }
    else if (e.target.matches('.edit')) {
        editTodo(e)

    }
    else if (e.target.matches('.delete')) {
        deleteTodo(e)
    }
}

const editTodo = (e) => {
    todoTeEdit = e.target.closest('li')
    popupInput.value = todoTeEdit.firstChild.textContent
    popup.style.display = 'flex'
}
const closePopup = () => {
    popup.style.display = 'none'
    popupInfo.textContent = ''
}

const changeTodoText = () => {
    if (popupInput.value !== '') {
        todoTeEdit.firstChild.textContent = popupInput.value
        popup.style.display = 'none'
        popupInfo.textContent = ''
    }
    else {
        popupInfo.textContent = 'Musisz podać jakąś treść'
    }
}
const deleteTodo = (e) => {
    e.target.closest('li').remove()
    const allTodos = ulList.querySelectorAll('li')
    if(allTodos.lenght === 0){
        errorInfo.textContent = 'Brak zadań na liście.'
    }
}

const enterKeyCheck = (e) => { 
    if(e.key==='Enter'){
        addNewTask()
    }
 }


document.addEventListener('DOMContentLoaded', main)