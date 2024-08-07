class Model {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
  }

  addTodo(todoText) {
    const newTodo = {
      id: this.todos.length + 1,
      text: todoText,
      complete: false,
    };
    this.todos.push(newTodo);
    this._commit();
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((item) => item.id !== +id);
    this._commit();
  }

  toggleTodo(id) {
    this.todos = this.todos.map((item) =>
      item.id === +id
        ? { id: item.id, text: item.text, complete: !item.complete }
        : item
    );
    this._commit();
  }

  editTodo(id, todoText) {
    this.todos = this.todos.map((item) =>
      item.id === +id
        ? { id: item.id, text: todoText, complete: item.complete }
        : item
    );
    this._commit();
  }

  _commit() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
}

export default Model;
