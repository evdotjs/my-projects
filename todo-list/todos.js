//create and manipulate an array of to-dos
let todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    let todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    let totalTodos = this.todos.length;
    let completedTodos = this.todos.filter(todo => todo.completed === true).length;
    completedTodos === totalTodos ?
      this.todos.forEach( todo => todo.completed = false ) :
      this.todos.forEach( todo => todo.completed = true );
  }
}

//handle user interations
const handlers = {
  addTodo: () => {
    const addTodoInput = document.querySelector('.addTodoInput');
    todoList.addTodo(addTodoInput.value);
    addTodoInput.value = '';
    view.displayTodos();
  },
  changeTodo: () => {
    const changeTodoPosition = document.querySelector('.changeTodoPosition');
    const changeTodoText = document.querySelector('.changeTodoText');

    todoList.changeTodo(changeTodoPosition.valueAsNumber-1, changeTodoText.value);
    changeTodoPosition.value = '';
    changeTodoText.value = '';
    view.displayTodos();
  },
  deleteTodo: (position) => {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: () => {
    const toggleCompletedPosition = document.querySelector('.toggleCompletedPosition');
    todoList.toggleCompleted(toggleCompletedPosition.valueAsNumber-1);
    toggleCompletedPosition.value = '';
    view.displayTodos();
  },
  toggleAll: () => {
    todoList.toggleAll();
    view.displayTodos();
  }
};

//show the to-do list in the DOM
const view = {
  displayTodos: function() {
    const toDoUL = document.querySelector('.toDoUL');
    toDoUL.innerHTML = "";
    todoList.todos.forEach((todo, index) => {
      let toDoLi = document.createElement('li');
      toDoLi.id = index;
      todo.completed ?
        toDoLi.textContent = `[x] ${todo.todoText}`:
        toDoLi.textContent = `[ ] ${todo.todoText}`;
      toDoUL.appendChild(toDoLi);
      toDoLi.appendChild(this.createDeleteButton());
    });
  },
  createDeleteButton: function() {
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton'
    return deleteButton;
  },
  setUpEventListeners: function() {
    const toDoUL = document.querySelector('.toDoUL');
    toDoUL.addEventListener('click', function(event){
      let elementClicked = event.target;
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
}

view.setUpEventListeners();
