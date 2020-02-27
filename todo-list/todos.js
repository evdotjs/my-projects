const toDoList = [
  {
         text: "first",
    completed: false,
        class: 'incomplete'
  },
  {
         text: "second",
    completed: false,
        class: 'incomplete'
  },
  {
         text: "third",
    completed: false,
        class: 'incomplete'
  },
];

new Vue({
  el: 'main',
  data: {
         title: 'To-Do List',
         todos: toDoList,
         newToDo: ""
  },
  methods: {
    addToDo: function() {
      if (this.newToDo) {
        toDoList.push({
               text: this.newToDo,
          completed: false,
              class: 'incomplete'
        });
        this.newToDo = "";
      }
    },
    toggleCompleted: function(index) {
      let todo = this.todos[index];
      todo.completed = !todo.completed;
      todo.completed ?
        todo.class = 'complete':
        todo.class = 'incomplete';
    }
  }
});
