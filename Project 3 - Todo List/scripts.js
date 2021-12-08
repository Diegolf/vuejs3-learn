const todoApp = {
    data() {
        return {
            todoList: [],
            newTodoItem: {}
        }
    },
    created() {
        // Carrega a lista do localstorage antes de "montar" o componente
        const storedTodoList = localStorage.getItem("todoList");
        this.todoList = storedTodoList ? JSON.parse(storedTodoList) : this.todoList;
    },
    beforeUnmount() {
        // Armazena a lista no localstorage antes de fechar o componente
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
    },
    beforeUpdate(){
        console.log('beforeUpdate');
    },
    methods: {
        orderTodoList: function () {
            this.todoList.sort((todo1, todo2) => (todo1.done === todo2.done) ? 0 : todo1.done ? 1 : -1);
        },
        getOrderedTodoList: function () {
            return [...this.todoList].sort((todo1, todo2) => (todo1.done === todo2.done) ? 0 : todo1.done ? 1 : -1);
        },
        addTodoItem: function () {
            if (!this.newTodoItem.description || this.newTodoItem.description.trim() === "") {
                alert("Informe a descrição da tarefa.");
                return;
            }
            this.todoList.push(this.newTodoItem);
            this.orderTodoList();
            this.storeTodoList();
            this.newTodoItem = {};
        },
        toggleTodoItemDone: function (todoItem) {
            todoItem.done = !todoItem.done;
            this.orderTodoList();
            this.storeTodoList();
        },
        storeTodoList: function() {
            localStorage.setItem("todoList", JSON.stringify(this.todoList));
        }
    }
}

Vue.createApp(todoApp).mount('#app');