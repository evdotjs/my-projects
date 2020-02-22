let todoList = {
  todos: [],
  displayTodos: function() {
    if(this.todos.length === 0) {
      console.log('Your todo list is empty!')
    } else {
      console.log('My Todos:');
      for (let i = 0; i < this.todos.length; i++) {
        if (this.todos[i].completed) {
          console.log(`[x] ${this.todos[i].todoText}`);
        } else {
          console.log(`[ ] ${this.todos[i].todoText}`);
        }
      }
    }
    return this.todos;
  },
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
    return this.displayTodos();
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
    return this.displayTodos();
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
    return this.displayTodos();
  },
  toggleCompleted: function(position) {
    let todo = this.todos[position];
    todo.completed = !todo.completed;
    return this.displayTodos();
  },
  toggleAll: function() {
    let totalTodos = this.todos.length;
    let completedTodos = this.todos.filter(todo => todo.completed === true).length;

    //if everything is true, make everything false
    if (completedTodos === totalTodos) {
      this.todos.forEach( todo => todo.completed = false );
    } else {
      this.todos.forEach( todo => todo.completed = true );
    }
    return this.displayTodos();
  }
}

const handlers = {
  displayTodos: () => { todoList.displayTodos(); },
  addTodo: () => {
    const addTodoInput = document.querySelector('.addTodoInput');
    todoList.addTodo(addTodoInput.value);
    addTodoInput.value = '';
  },
  changeTodo: () => {
    const changeTodoPosition = document.querySelector('.changeTodoPosition');
    const changeTodoText = document.querySelector('.changeTodoText');

    todoList.changeTodo(changeTodoPosition.valueAsNumber-1, changeTodoText.value);
    changeTodoPosition.value = '';
    changeTodoText.value = '';
  },
  deleteTodo: () => {
    const deleteTodoPosition = document.querySelector('.deleteTodoPosition');
    todoList.deleteTodo(deleteTodoPosition.valueAsNumber-1);
    deleteTodoPosition.value = '';
  },
  toggleCompleted: () => {
    const toggleCompletedPosition = document.querySelector('.toggleCompletedPosition');
    todoList.toggleCompleted(toggleCompletedPosition.valueAsNumber-1);
    toggleCompletedPosition.value = '';
  },
  toggleAll: () => { todoList.toggleAll(); }
};
