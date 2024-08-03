class Model {
  constructor() {
    this.todos = [
      {
        id: 1,
        text: "Learn HTML",
        complete: true,
      },
      {
        id: 2,
        text: "Learn JavaScript",
        complete: false,
      },
    ];
  }

  addTodo(todoText) {
    const newTodo = {
      id: this.todos.length + 1,
      text: todoText,
      complete: false,
    };
    this.todos.push(newTodo);
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((item) => item.id !== +id);
  }

  toggleTodo(id) {
    this.todos = this.todos.map((item) =>
      item.id === +id
        ? { id: item.id, text: item.text, complete: !item.complete }
        : item
    );
  }

  editTodo(id, todoText) {
    this.todos = this.todos.map((item) =>
      item.id === +id
        ? { id: item.id, text: todoText, complete: item.complete }
        : item
    );
  }
}

export default Model;
