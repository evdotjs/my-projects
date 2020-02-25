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
  toggleCompleted: (position) => {
    todoList.toggleCompleted(position);
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
      let buttonGroup = document.createElement('div');
      buttonGroup.className = 'btn-group';
      toDoLi.id = index;
      todo.completed ?
        toDoLi.textContent = `[x] ${todo.todoText}`:
        toDoLi.textContent = `[ ] ${todo.todoText}`;
      toDoUL.appendChild(toDoLi);
      toDoLi.appendChild(buttonGroup);
      buttonGroup.appendChild(this.createToggleButton());
      buttonGroup.appendChild(this.createDeleteButton());
    });
  },
  createToggleButton: function() {
    let toggleButton = document.createElement('button');
    toggleButton.textContent = 'Complete';
    toggleButton.className = 'toggleButton btn btn-outline-primary btn-sm';
    return toggleButton;
  },
  createDeleteButton: function() {
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton btn btn-outline-primary btn-sm';
    return deleteButton;
  },
  setUpEventListeners: function() {
    const toDoUL = document.querySelector('.toDoUL');
    toDoUL.addEventListener('click', function(event){
      let elementClicked = event.target;
      if (elementClicked.className.startsWith('deleteButton')) {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.parentNode.id));
      } else if (elementClicked.className.startsWith('toggleButton')) {
        handlers.toggleCompleted(parseInt(elementClicked.parentNode.parentNode.id));
      }
    });
  }
}

view.setUpEventListeners();
