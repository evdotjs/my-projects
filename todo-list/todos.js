let todoList = {
  todos: [],
  displayTodos: function() {
    console.log('My Todos:');
    if(this.todos.length === 0) {
      console.log('Your todo list is empty!')
    } else {
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

//get access to the display todos button
const displayTodosButton = document.querySelector('.display');
const toggleAllButton = document.querySelector('.toggle');

//run displaytodos on click
displayTodosButton.addEventListener('click', function() {
  todoList.displayTodos();
});

toggleAllButton.addEventListener('click', function() {
  todoList.toggleAll();
});
