/* eslint-disable no-restricted-globals */
document.addEventListener('DOMContentLoaded', () => {
  const todoList = document.getElementById('todo-list')
  const completedTodosList = document.getElementById('completed-todos')
  const todoForm = document.getElementById('add-todo-form')
  const showTodosButton = document.getElementById('show-todos-button')
  const deleteAllButton = document.getElementById('delete-all-button')

  let colorIndex = 0

  function getRandomColor() {
    const colors = ['#FFC0CB', '#FFD700', '#00FFFF', '#90EE90', '#EE82EE', '#FFA500', '#00CED1']
    const color = colors[colorIndex]
    colorIndex = (colorIndex + 1) % colors.length
    return color
  }

  function createTodoItem(todoText) {
    const card = document.createElement('div')
    card.classList.add('card')
    card.style.backgroundColor = getRandomColor()

    const todoTextElement = document.createElement('div')
    todoTextElement.classList.add('todo-text')
    todoTextElement.textContent = todoText
    card.appendChild(todoTextElement)

    const dueDateLabel = document.createElement('label')
    dueDateLabel.textContent = 'Due Date:'

    const dueDateInput = document.createElement('input')
    dueDateInput.type = 'date'

    const dueDateContainer = document.createElement('div')
    dueDateContainer.classList.add('due-date')
    dueDateContainer.appendChild(dueDateLabel)
    dueDateContainer.appendChild(dueDateInput)
    card.appendChild(dueDateContainer)

    const actionsContainer = document.createElement('div')
    actionsContainer.classList.add('actions')

    const completeCheckbox = document.createElement('input')
    completeCheckbox.type = 'checkbox'
    actionsContainer.appendChild(completeCheckbox)

    const updateBtn = document.createElement('button')
    updateBtn.textContent = 'Update'
    updateBtn.classList.add('update-button')
    actionsContainer.appendChild(updateBtn)

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete'
    deleteBtn.classList.add('delete-button')
    actionsContainer.appendChild(deleteBtn)

    card.appendChild(actionsContainer)

    return card
  }

  function addTodoToList(todoText) {
    const todoItem = createTodoItem(todoText)
    todoList.appendChild(todoItem)
  }

  function moveTodoToCompletedList(todoItem) {
    const listItem = createTodoItem(todoItem.querySelector('.todo-text').textContent)
    listItem.querySelector('.update-button').addEventListener('click', () => {
      updateTodoItem(listItem)
    })
    listItem.querySelector('.delete-button').addEventListener('click', () => {
      deleteTodoItem(listItem)
    })

    completedTodosList.appendChild(listItem)
    todoItem.remove()
  }

  function updateTodoItem(todoItem) {
    const updatedText = prompt('Update the todo:', todoItem.querySelector('.todo-text').textContent)
    if (updatedText !== null) {
      todoItem.querySelector('.todo-text').textContent = updatedText.trim()
    }
  }

  function deleteTodoItem(todoItem) {
    todoItem.remove()
  }

  function displayTodoList() {
    todoList.innerHTML = ''
    completedTodosList.innerHTML = ''

    fetch('http://localhost:4040/todos')
      .then(response => response.json())
      .then(todos => {
        todos.forEach(todo => {
          const todoItem = createTodoItem(todo.text);
          todoItem.querySelector('.update-button').addEventListener('click', () => {
            updateTodoItem(todoItem)
          })
          todoItem.querySelector('.delete-button').addEventListener('click', () => {
            deleteTodoItem(todoItem)
          })

          if (todo.completed) {
            completedTodosList.appendChild(todoItem)
          } else {
            todoList.appendChild(todoItem)
          }
        })
      })
      .catch(error => {
        console.error('Error fetching todo list:', error)
      })
  }

  function handleDeleteAll() {
    const confirmed = confirm('Are you sure you want to delete all todos?')
    if (confirmed) {
      todoList.innerHTML = ''
      completedTodosList.innerHTML = ''
      console.log('All todos have been deleted.')
    } else {
      console.log('Deletion canceled.')
    }
  }

  showTodosButton.addEventListener('click', () => {
    displayTodoList()
    showTodosButton.style.display = 'none'
    deleteAllButton.style.display = 'block'
  })

  todoForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const todoInput = document.getElementById('todo-input')
    const todoText = todoInput.value.trim()

    if (todoText !== '') {
      addTodoToList(todoText)
      todoInput.value = ''
    }
  })

  todoList.addEventListener('click', (event) => {
    const target = event.target
    if (target.classList.contains('update-button')) {
      const card = target.closest('.card')
      updateTodoItem(card)
    } else if (target.classList.contains('delete-button')) {
      const card = target.closest('.card')
      deleteTodoItem(card)
    } else if (target.type === 'checkbox') {
      const card = target.closest('.card')
      moveTodoToCompletedList(card)
    }
  })

  completedTodosList.addEventListener('click', (event) => {
    const target = event.target
    if (target.classList.contains('update-button')) {
      const card = target.closest('.card')
      updateTodoItem(card)
    } else if (target.classList.contains('delete-button')) {
      const card = target.closest('.card')
      deleteTodoItem(card)
    }
  })

  deleteAllButton.addEventListener('click', handleDeleteAll)
})
































// document.addEventListener('DOMContentLoaded', () => {
//   const todoList = document.getElementById('todo-list');
//   const completedTodosList = document.getElementById('completed-todos');
//   const todoForm = document.getElementById('add-todo-form');
//   const showTodosButton = document.getElementById('show-todos-button');

//   let colorIndex = 0;

//   function getRandomColor() {
//     const colors = ['#FFC0CB', '#FFD700', '#00FFFF', '#90EE90', '#EE82EE', '#FFA500', '#00CED1'];
//     const color = colors[colorIndex];
//     colorIndex = (colorIndex + 1) % colors.length;
//     return color;
//   }

//   function createTodoItem(todoText) {
//     const card = document.createElement('div');
//     card.classList.add('card');
//     card.style.backgroundColor = getRandomColor();

//     const todoTextElement = document.createElement('div');
//     todoTextElement.classList.add('todo-text');
//     todoTextElement.textContent = todoText;
//     card.appendChild(todoTextElement);

//     const actionsContainer = document.createElement('div');
//     actionsContainer.classList.add('actions');

//     const completeCheckbox = document.createElement('input');
//     completeCheckbox.type = 'checkbox';
//     actionsContainer.appendChild(completeCheckbox);

//     const updateBtn = document.createElement('button');
//     updateBtn.textContent = 'Update';
//     updateBtn.classList.add('update-button');
//     actionsContainer.appendChild(updateBtn);

//     const deleteBtn = document.createElement('button');
//     deleteBtn.textContent = 'Delete';
//     deleteBtn.classList.add('delete-button');
//     actionsContainer.appendChild(deleteBtn);

//     card.appendChild(actionsContainer);

//     return card;
//   }

//   function addTodoToList(todoText) {
//     const todoItem = createTodoItem(todoText);
//     todoList.appendChild(todoItem);
//   }

//   function moveTodoToCompletedList(todoItem) {
//     const listItem = createTodoItem(todoItem.querySelector('.todo-text').textContent);
//     listItem.querySelector('.update-button').addEventListener('click', () => {
//       updateTodoItem(listItem);
//     });
//     listItem.querySelector('.delete-button').addEventListener('click', () => {
//       deleteTodoItem(listItem);
//     });

//     completedTodosList.appendChild(listItem);
//     todoItem.remove();
//   }

//   function updateTodoItem(todoItem) {
//     const updatedText = prompt('Update the todo:', todoItem.querySelector('.todo-text').textContent);
//     if (updatedText !== null) {
//       todoItem.querySelector('.todo-text').textContent = updatedText.trim();
//     }
//   }

//   function deleteTodoItem(todoItem) {
//     todoItem.remove();
//   }

//   function displayTodoList() {
//     todoList.innerHTML = '';
//     completedTodosList.innerHTML = '';

//     fetch('http://localhost:4040/todos')
//       .then(response => response.json())
//       .then(todos => {
//         todos.forEach(todo => {
//           const todoItem = createTodoItem(todo.text);
//           todoItem.querySelector('.update-button').addEventListener('click', () => {
//             updateTodoItem(todoItem);
//           });
//           todoItem.querySelector('.delete-button').addEventListener('click', () => {
//             deleteTodoItem(todoItem);
//           });

//           if (todo.completed) {
//             completedTodosList.appendChild(todoItem);
//           } else {
//             todoList.appendChild(todoItem);
//           }
//         });
//       })
//       .catch(error => {
//         console.error('Error fetching todo list:', error);
//       });
//   }

//   showTodosButton.addEventListener('click', displayTodoList);

//   todoForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const todoInput = document.getElementById('todo-input');
//     const todoText = todoInput.value.trim();

//     if (todoText !== '') {
//       addTodoToList(todoText);
//       todoInput.value = '';
//     }
//   });

//   todoList.addEventListener('click', (event) => {
//     const target = event.target;
//     if (target.classList.contains('update-button')) {
//       const card = target.closest('.card');
//       updateTodoItem(card);
//     } else if (target.classList.contains('delete-button')) {
//       const card = target.closest('.card');
//       deleteTodoItem(card);
//     } else if (target.type === 'checkbox') {
//       const card = target.closest('.card');
//       moveTodoToCompletedList(card);
//     }
//   });

//   completedTodosList.addEventListener('click', (event) => {
//     const target = event.target;
//     if (target.classList.contains('update-button')) {
//       const card = target.closest('.card');
//       updateTodoItem(card);
//     } else if (target.classList.contains('delete-button')) {
//       const card = target.closest('.card');
//       deleteTodoItem(card);
//     }
//   });
// });
















/**the best working code */
// document.addEventListener('DOMContentLoaded', () => {
//   const todoList = document.getElementById('todo-list')
//   const completedTodosList = document.getElementById('completed-todos')
//   const todoForm = document.getElementById('add-todo-form')
//   let colorIndex = 0

//   function getRandomColor() {
//     const colors = ['#FFC0CB', '#FFD700', '#00FFFF', '#90EE90', '#EE82EE', '#FFA500', '#00CED1']
//     const color = colors[colorIndex]
//     colorIndex = (colorIndex + 1) % colors.length
//     return color
//   }

//   function createTodoItem(todoText) {
//     const card = document.createElement('div')
//     card.classList.add('card')
//     card.style.backgroundColor = getRandomColor()

//     const todoTextElement = document.createElement('div')
//     todoTextElement.classList.add('todo-text')
//     todoTextElement.textContent = todoText
//     card.appendChild(todoTextElement)

//     const actionsContainer = document.createElement('div')
//     actionsContainer.classList.add('actions')

//     const completeCheckbox = document.createElement('input')
//     completeCheckbox.type = 'checkbox'
//     actionsContainer.appendChild(completeCheckbox)

//     const updateBtn = document.createElement('button')
//     updateBtn.textContent = 'Update'
//     updateBtn.classList.add('update-button')
//     actionsContainer.appendChild(updateBtn)

//     const deleteBtn = document.createElement('button')
//     deleteBtn.textContent = 'Delete'
//     deleteBtn.classList.add('delete-button')
//     actionsContainer.appendChild(deleteBtn)

//     card.appendChild(actionsContainer)

//     return card
//   }

//   function addTodoToList(todoText) {
//     const todoItem = createTodoItem(todoText)
//     todoList.appendChild(todoItem)
//   }

//   function moveTodoToCompletedList(todoItem) {
//     const listItem = createTodoItem(todoItem.querySelector('.todo-text').textContent)
//     listItem.querySelector('.update-button').addEventListener('click', () => {
//       updateTodoItem(listItem)
//     })
//     listItem.querySelector('.delete-button').addEventListener('click', () => {
//       deleteTodoItem(listItem)
//     })

//     completedTodosList.appendChild(listItem)
//     todoItem.remove()
//   }

//   function updateTodoItem(todoItem) {
//     const updatedText = prompt('Update the todo:', todoItem.querySelector('.todo-text').textContent);
//     if (updatedText !== null) {
//       todoItem.querySelector('.todo-text').textContent = updatedText.trim()
//     }
//   }

//   function deleteTodoItem(todoItem) {
//     todoItem.remove()
//   }

//   todoForm.addEventListener('submit', (e) => {
//     e.preventDefault()
//     const todoInput = document.getElementById('todo-input')
//     const todoText = todoInput.value.trim()

//     if (todoText !== '') {
//       addTodoToList(todoText)
//       todoInput.value = ''
//     }
//   })

//   todoList.addEventListener('click', (event) => {
//     const target = event.target
//     if (target.classList.contains('update-button')) {
//       const card = target.closest('.card')
//       updateTodoItem(card);
//     } else if (target.classList.contains('delete-button')) {
//       const card = target.closest('.card')
//       deleteTodoItem(card)
//     } else if (target.type === 'checkbox') {
//       const card = target.closest('.card')
//       moveTodoToCompletedList(card)
//     }
//   })

//   completedTodosList.addEventListener('click', (event) => {
//     const target = event.target
//     if (target.classList.contains('update-button')) {
//       const card = target.closest('.card')
//       updateTodoItem(card)
//     } else if (target.classList.contains('delete-button')) {
//       const card = target.closest('.card')
//       deleteTodoItem(card)
//     }
//   })
// })

/**Next to final code changes perfect */
// document.addEventListener('DOMContentLoaded', () => {
//   const todoList = document.getElementById('todo-list');
//   const todoForm = document.getElementById('add-todo-form');
//   const completedTodos = document.getElementById('completed-todos');

//   let colorIndex = 0;

//   function getRandomColor() {
//     const colors = ['#FFC0CB', '#FFD700', '#00FFFF', '#90EE90', '#EE82EE', '#FFA500', '#00CED1'];
//     const color = colors[colorIndex];
//     colorIndex = (colorIndex + 1) % colors.length;
//     return color;
//   }

//   function addTodoToList(todoText) {
//     const card = document.createElement('div');
//     card.classList.add('card');
//     card.style.backgroundColor = getRandomColor();

//     const todoTextElement = document.createElement('div');
//     todoTextElement.classList.add('todo-text');
//     todoTextElement.textContent = todoText;
//     card.appendChild(todoTextElement);

//     const actionsContainer = document.createElement('div');
//     actionsContainer.classList.add('actions');

//     const completeCheckbox = document.createElement('input');
//     completeCheckbox.type = 'checkbox';
//     actionsContainer.appendChild(completeCheckbox);

//     const updateBtn = document.createElement('button');
//     updateBtn.textContent = 'Update';
//     updateBtn.classList.add('update-button');
//     actionsContainer.appendChild(updateBtn);

//     const deleteBtn = document.createElement('button');
//     deleteBtn.textContent = 'Delete';
//     deleteBtn.classList.add('delete-button');
//     actionsContainer.appendChild(deleteBtn);

//     card.appendChild(actionsContainer);

//     todoList.appendChild(card);
//   }

//   function moveCompletedTodo(todoItem) {
//     const card = todoItem.closest('.card');
//     card.remove();
//     completedTodos.appendChild(card);
//   }

//   todoForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const todoInput = document.getElementById('todo-input');
//     const todoText = todoInput.value.trim();

//     if (todoText !== '') {
//       addTodoToList(todoText);
//       todoInput.value = '';
//     }
//   });

//   todoList.addEventListener('change', (event) => {
//     const target = event.target;
//     if (target.type === 'checkbox' && target.checked) {
//       moveCompletedTodo(target);
//     }
//   });

//   todoList.addEventListener('click', (event) => {
//     const target = event.target;
//     if (target.classList.contains('update-button')) {
//       const card = target.closest('.card');
//       const todoTextElement = card.querySelector('.todo-text');
//       const updatedText = prompt('Update the todo:', todoTextElement.textContent);
//       if (updatedText !== null) {
//         todoTextElement.textContent = updatedText.trim();
//       }
//     } else if (target.classList.contains('delete-button')) {
//       const card = target.closest('.card');
//       card.remove();
//     }
//   });
// });


/**Best code block */
// document.addEventListener('DOMContentLoaded', () => {
//   const todoList = document.getElementById('todo-list');
//   const todoForm = document.getElementById('add-todo-form');
//   let colorIndex = 0;

//   function getRandomColor() {
//     const colors = ['#FFC0CB', '#FFD700', '#00FFFF', '#90EE90', '#EE82EE', '#FFA500', '#00CED1'];
//     const color = colors[colorIndex];
//     colorIndex = (colorIndex + 1) % colors.length;
//     return color;
//   }

//   function addTodoToList(todoText) {
//     const card = document.createElement('div');
//     card.classList.add('card');
//     card.style.backgroundColor = getRandomColor();

//     const todoTextElement = document.createElement('div');
//     todoTextElement.classList.add('todo-text');
//     todoTextElement.textContent = todoText;
//     card.appendChild(todoTextElement);

//     const actionsContainer = document.createElement('div');
//     actionsContainer.classList.add('actions');

//     const completeCheckbox = document.createElement('input');
//     completeCheckbox.type = 'checkbox';
//     actionsContainer.appendChild(completeCheckbox);

//     const updateBtn = document.createElement('button');
//     updateBtn.textContent = 'Update';
//     updateBtn.classList.add('update-button');
//     actionsContainer.appendChild(updateBtn);

//     const deleteBtn = document.createElement('button');
//     deleteBtn.textContent = 'Delete';
//     deleteBtn.classList.add('delete-button');
//     actionsContainer.appendChild(deleteBtn);

//     card.appendChild(actionsContainer);

//     todoList.appendChild(card);
//   }

//   todoForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const todoInput = document.getElementById('todo-input');
//     const todoText = todoInput.value.trim();

//     if (todoText !== '') {
//       addTodoToList(todoText);
//       todoInput.value = '';
//     }
//   });

//   todoList.addEventListener('click', (event) => {
//     const target = event.target;
//     if (target.classList.contains('update-button')) {
//       const card = target.closest('.card');
//       const todoTextElement = card.querySelector('.todo-text');
//       const updatedText = prompt('Update the todo:', todoTextElement.textContent);
//       if (updatedText !== null) {
//         todoTextElement.textContent = updatedText.trim();
//       }
//     } else if (target.classList.contains('delete-button')) {
//       const card = target.closest('.card');
//       card.remove();
//     }
//   });
// });








//**working code below */
// document.addEventListener('DOMContentLoaded', () => {
//   const todoList = document.getElementById('todo-list')
//   const todoForm = document.getElementById('add-todo-form')

//   function addTodoToList(todoText) {
//     const todoItem = document.createElement('li')
//     todoItem.innerHTML = todoText;

//     const todoForm = document.createElement('form')
//     todoForm.classList.add('todo-form')

//     const updateBtn = document.createElement('button')
//     updateBtn.textContent = 'Update'
//     updateBtn.classList.add('update-button')

//     updateBtn.addEventListener('click', () => {
//       updateTodoItem(todoForm, todoItem)
//     })

//     const deleteBtn = document.createElement('button')
//     deleteBtn.textContent = 'Delete'
//     deleteBtn.classList.add('delete-button')

//     deleteBtn.addEventListener('click', () => {
//       deleteTodoItem(todoItem)
//     })

//     todoForm.appendChild(updateBtn)
//     todoForm.appendChild(deleteBtn)

//     todoItem.appendChild(todoForm)
//     todoList.appendChild(todoItem)
//   }

//   todoForm.addEventListener('submit', (e) => {
//     e.preventDefault()
//     const todoInput = document.getElementById('todo-input')
//     const todoText = todoInput.value.trim()

//     if (todoText !== '') {
//       addTodoToList(todoText)
//       todoInput.value = ''
//     }
//   })

//   function updateTodoItem(todoForm, todoItem) {
//     const updatedText = prompt('Update the todo:', todoItem.innerText)
//     if (updatedText !== null) {
//       todoItem.innerText = updatedText.trim()
//     }
//   }

//   function deleteTodoItem(todoItem) {
//     todoItem.remove()
//   }
// })

// document.addEventListener('DOMContentLoaded', () => {
//   const todoList = document.getElementById('todo-list');
//   const todoForm = document.getElementById('add-todo-form');

//   function addTodoToList(todoText) {
//     const todoItem = document.createElement('li');
//     todoItem.innerHTML = todoText;

//     todoItem.addEventListener('contextmenu', (e) => {
//       e.preventDefault();
//       alert('Right-click to update the todo item');
//     });

//     todoItem.addEventListener('click', () => {
//       toggleTodoCompleted(todoItem);
//     });

//     todoItem.addEventListener('mouseover', () => {
//       todoItem.style.color = 'red';
//     });

//     todoItem.addEventListener('mouseout', () => {
//       todoItem.style.color = '';
//     });

//     const deleteBtn = document.createElement('button');
//     deleteBtn.textContent = 'Delete';
//     deleteBtn.classList.add('delete-button');

//     deleteBtn.addEventListener('click', () => {
//       deleteTodoItem(todoItem);
//     });

//     const updateBtn = document.createElement('button');
//     updateBtn.textContent = 'Update';
//     updateBtn.classList.add('update-button');

//     updateBtn.addEventListener('click', () => {
//       updateTodoItem(todoItem);
//     });

//     todoItem.appendChild(deleteBtn);
//     todoItem.appendChild(updateBtn);
//     todoList.appendChild(todoItem);
//   }

//   todoForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const todoInput = document.getElementById('todo-input');
//     const todoText = todoInput.value.trim();

//     if (todoText !== '') {
//       addTodoToList(todoText);
//       todoInput.value = '';
//     }
//   });

//   function toggleTodoCompleted(todoItem) {
//     todoItem.classList.toggle('completed');
//   }

//   function updateTodoItem(todoItem) {
//     const updatedText = prompt('Update the todo:', todoItem.innerText);
//     if (updatedText !== null) {
//       todoItem.innerText = updatedText.trim();
//     }
//   }

//   function deleteTodoItem(todoItem) {
//     todoItem.remove();
//   }
// });


/*document.addEventListener('DOMContentLoaded', () => {
  const todoList = document.getElementById('todo-list')
  const todoForm = document.getElementById('add-todo-form')

  function addTodoToList(todoText) {
    const todoItem = document.createElement('li')
    todoItem.innerHTML = todoText

    //todoItem.addEventListener = todoText
    todoItem.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      alert('Right-click to update the todo item')
    })

    todoItem.addEventListener('click', () => {
      toggleTodoCompleted(todoItem)
    })

    todoItem.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      updateTodoItem(todoItem)
    })

    todoItem.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      alert('Right-click to update the todo item')
    })

//change the color of the todo listed to red
    todoItem.addEventListener('mouseover', () => {
      todoItem.style.color = 'red'
    })
//go back to default color
    todoItem.addEventListener('mouseout', () => {
      todoItem.style.color = ''
    })

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete'
    deleteBtn.classList.add('delete-button')

    deleteBtn.addEventListener('click', () => {
      deleteTodoItem(todoItem)
    })

    todoItem.appendChild(deleteBtn)
    todoList.appendChild(todoItem)
  }

  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
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

  function deleteTodoItem(todoItem) {
    todoItem.remove()
  }
})*/

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