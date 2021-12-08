const todoApp = {
    data() {
        return {
            todoList: [],
            newTodoItem: {}
        }
    },
    methods: {
        orderedTodoList: function() {
            return this.todoList.sort((todo1, todo2) => (todo1.done === todo2.done) ? 0 : todo1.done ? 1 : -1);
        },
        addTodoItem: function() {
            if (!this.newTodoItem.description || this.newTodoItem.description.trim() === ""){
                alert("Informe a descrição da tarefa.");
                return;
            }
            this.todoList.push(this.newTodoItem);
            this.newTodoItem = {};
        }
    }
}

Vue.createApp(todoApp).mount('#app');