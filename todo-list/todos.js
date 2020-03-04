const today = new Date();
const months = ['January', 'February', 'March', 'April',
                'May', 'June', 'July', 'August',
                'September', 'October', 'November', 'December'];

const toDoList = [
  {
         text: "first",
    completed: false,
        class: 'incomplete',
         edit: false,
  },
  {
         text: "second",
    completed: false,
        class: 'incomplete',
         edit: false,
  },
  {
         text: "third",
    completed: false,
        class: 'incomplete',
         edit: false,
  },
];

new Vue({
  el: '#app',
  data: {
         title: 'To-Do List',
         todos: toDoList,
         newToDo: "",
         date: `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`,
  },
  methods: {
    addToDo: function() {
      //add a new to-do object if the text field is not empty
      if (this.newToDo) {
        toDoList.push({
               text: this.newToDo,
          completed: false,
              class: 'incomplete',
               edit: false,
        });
        this.newToDo = "";
      }
    },
    deleteToDo: function(index) {
      this.todos.splice(index,1);
    },
    editToDo: function(index) {
      //get the li that was selected, hide the current text, and unhide the input field
      let selected = document.querySelector('.toDoUL').childNodes[index];
      let toDo = this.todos[index];
      toDo.edit = !toDo.edit;
    },
    replaceToDo: function(index){
      //update the to-do text with the input value, then hide the input field
      let toDo = this.todos[index];
      let selected = document.querySelector('.toDoUL').childNodes[index].childNodes[2]; //input
      toDo.text = selected.value
      toDo.edit = !toDo.edit;
    },
    toggleCompleted: function(index) {
      //toggle between the .complete and .incomplete css rules
      let todo = this.todos[index];
      let toggleButton = document.querySelector('.toDoUL')
        .childNodes[index].childNodes[4].childNodes[2].firstChild;
      todo.completed = !todo.completed;
      if (todo.completed) {
        todo.class = 'complete';
        toggleButton.innerText = "Mark Incomplete";
      } else {
        todo.class = 'incomplete';
        toggleButton.innerText = "Mark Complete";
      }
    }
  }
});
