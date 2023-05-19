const todoForm = document.getElementById('todo-form')
const todoInput = document.getElementById('todo-input')
const todoList = document.getElementById('todo-list')
const addTodoForm = document.getElementById('add-todo-form')
const addTodoInput = document.getElementById('add-todo-input')
const addTodoButton = document.getElementById('add-todo-button')

// Function to create a new todo item
const createTodoItem = (text) => {
  // Creating the list item
  const listItem = document.createElement('li')
  listItem.textContent = text

  // Creating the delete button
  const deleteButton = document.createElement('button')
  deleteButton.textContent = 'Delete'
  deleteButton.addEventListener('click', () => {
    listItem.remove()
  });

  // Appending the delete button to the list item
  listItem.appendChild(deleteButton)

  // Appending the list item to the todo list
  todoList.appendChild(listItem);
}

// Event listener for form submission
todoForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const todoText = todoInput.value.trim()

  if (todoText !== '') {
    createTodoItem(todoText)
    todoInput.value = ''
    todoInput.focus()
  }
})

// Event listener for alternative form submission
addTodoForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const todoText = addTodoInput.value.trim()

  if (todoText !== '') {
    createTodoItem(todoText)
    addTodoInput.value = ''
    addTodoInput.focus()
  }
})

// Event listener for add button (alternative)
addTodoButton.addEventListener('click', (event) => {
  event.preventDefault()
  const todoText = addTodoInput.value.trim()

  if (todoText !== '') {
    createTodoItem(todoText)
    addTodoInput.value = ''
    addTodoInput.focus()
  }
})