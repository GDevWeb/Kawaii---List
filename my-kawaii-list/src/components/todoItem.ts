import type { Todo } from "../types/todo.types";

export const todoItem = (
  todo: Todo,
  handleUpdate: Function,
  handleRemove: Function,
  list: HTMLDListElement
) => {
  const todoItem = document.createElement("li");
  todoItem.dataset.id = todo.id;
  todoItem.className = todo.done ? "todo-item done" : "todo-item";

  const todoCheckbox = document.createElement("input");
  todoCheckbox.type = "checkbox";
  todoCheckbox.checked = todo.done;
  todoCheckbox.addEventListener("change", () => {
    handleUpdate({
      ...todo,
      done: todoCheckbox.checked,
    });
  });

  const btnDelete = document.createElement("button");
  btnDelete.addEventListener("click", () => handleRemove(todo.id));
  btnDelete.classList.add("btn-delete");
  btnDelete.textContent = "Supprimer";
  const todoText = document.createElement("p");
  todoText.innerHTML = `${todo.text} <span>(Status: ${
    todo.done ? "Terminé" : "En cours"
  })</span>`;
  todoItem.appendChild(todoCheckbox);
  todoItem.appendChild(todoText);
  todoItem.appendChild(btnDelete);
  todoItem.classList.add("anim-in");
  list.appendChild(todoItem);
};
