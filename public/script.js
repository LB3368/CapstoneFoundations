document.addEventListener('DOMContentLoaded', () => {
  const todoList = document.getElementById('todo-list')
  const todoForm = document.getElementById('add-todo-form')

  function addTodoToList(todoText) {
    const todoItem = document.createElement('li')
    todoItem.innerHTML = todoText
    //todoItem.addEventListener = todoText

    todoItem.addEventListener('click', () => {
      toggleTodoCompleted(todoItem)
    })

    todoItem.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      updateTodoItem(todoItem)
    })
//change the color of the todo listed to red
    todoItem.addEventListener('mouseover', () => {
      todoItem.style.color = 'red'
    })
//go back to default color
    todoItem.addEventListener('mouseout', () => {
      todoItem.style.color = ''
    })

    todoItem.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      alert('Right-click to update the todo item')
    })

    todoList.appendChild(todoItem)

    //todoText.map((todo) => addTodoToList(todo.text))

  }

  todoForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const todoInput = document.getElementById('todo-input')
      const todoText = todoInput.value.trim()

      if (todoText !== '') {
          addTodoToList(todoText)
          todoInput.value = ''
      }
  })

  function toggleTodoCompleted(todoItem) {
      todoItem.classList.toggle('completed')
  }

  function updateTodoItem(todoItem) {
      const updatedText = prompt('Update the todo:', todoItem.innerText)
      if (updatedText !== null) {
          todoItem.innerText = updatedText.trim()
      }
  }
  //fetchAllTodos()
})

/*async function fetchAllTodos() {
  try {
    const todoList = document.getElementById('todo-list')

    // get all todos from database
    const response = await fetch('/todos')
    const todos = await response.json()

    // clear the existing todo list
    todoList.innerHTML = ''

    //show each todo item
    //todos.map((todo) => addTodoToList(todo.text))

    todos.forEach((todo) => {
      addTodoToList(todo.text)
    })
  } catch (error) {
    console.error('Error fetching todos:', error)
  }
}*/









/*const todoForm = document.getElementById('todo-form')
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
})*/