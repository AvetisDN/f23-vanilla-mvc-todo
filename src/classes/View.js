class View {
  constructor() {
    this.app = this.getElement("#app");
    this.appContainer = this.createElement("div", "todos");

    this.formContainer = this.createElement("form", "todos-form");
    this.formInput = this.createElement("input");
    this.formInput.placeholder = "Add todo...";
    this.formInput.type = "text";
    this.formButton = this.createElement("button");
    this.formButton.textContent = "+";
    this.formButton.type = "submit";

    this.listContainer = this.createElement("ul", "todos-list");

    this.formContainer.append(this.formInput);
    this.formContainer.append(this.formButton);
    this.appContainer.append(this.formContainer);
    this.appContainer.append(this.listContainer);
    this.app.append(this.appContainer);

    this._tempText = "";
    this._bindInput();
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) {
      element.classList.add(className);
    }
    return element;
  }

  getElement(selector) {
    return document.querySelector(selector);
  }

  get _todoText() {
    return this.formInput.value;
  }

  _resetInput() {
    this.formInput.value = "";
  }

  renderTodos(todos) {
    while (this.listContainer.firstChild) {
      this.listContainer.removeChild(this.listContainer.firstChild);
    }

    if (todos.length === 0) {
      const p = this.createElement("p", "list-empty");
      p.textContent = "No todos at the moment. Add a new one maybe...";
      this.listContainer.append(p);
    } else {
      todos.forEach((item) => {
        const li = this.createElement("li");
        li.id = item.id;
        const checkbox = this.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.complete;
        const span = this.createElement("span");
        span.contentEditable = true;
        span.classList.add("editable");
        span.textContent = item.text;
        if (item.complete) {
          li.classList.add("is-completed");
        }
        const button = this.createElement("button");
        button.classList.add("delete-btn");
        button.innerHTML = "&times;";

        li.append(checkbox);
        li.append(span);
        li.append(button);

        this.listContainer.append(li);
      });
    }
  }

  bindAddTodo(handler) {
    this.formContainer.addEventListener("submit", (event) => {
      event.preventDefault();

      if (this._todoText) {
        handler(this._todoText);
        this._resetInput();
      }
    });
  }

  bindDeleteTodo(handler) {
    this.listContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("delete-btn")) {
        handler(event.target.parentElement.id);
      }
    });
  }

  bindToggleTodo(handler) {
    this.listContainer.addEventListener("change", (event) => {
      if ((event.target.type = "checkbox")) {
        handler(event.target.parentElement.id);
      }
    });
  }

  _bindInput() {
    this.listContainer.addEventListener("input", (event) => {
      if (event.target.classList.contains("editable")) {
        this._tempText = event.target.textContent;
      }
    });
  }

  bindEditTodo(handler) {
    this.listContainer.addEventListener("focusout", (event) => {
      if (this._tempText) {
        handler(+event.target.parentElement.id, this._tempText);

        this._tempText = "";
      }
    });
  }
}

export default View;
