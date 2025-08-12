/* ***DOM*** */

import type { Todo, TODOS } from "./types/todo.types";

// form
const form: HTMLFormElement | null = document.querySelector("form");
const todoInput: HTMLInputElement | null =
  document.querySelector("#todo-input");

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (todoInput?.value) {
    add(todoInput.value);
    todoInput.value = "";
    todoInput.focus();
  }
});

// todo-list
const todoList: HTMLUListElement | null =
  document.querySelector("ul#todo-list");

const countTotal: HTMLOutputElement | null =
  document.querySelector("#count-total");
const countDone: HTMLOutputElement | null =
  document.querySelector("#count-done");

/* ***Logic*** */
// variables;
let todos: TODOS = getData();

/* Add */
function add(text: string) {
  if (text.trim() === "" || text.length <= 3) {
    throw new Error("La tâche doit faire au moins 3 caractères");
  }
  const newTodo: Todo = {
    id: Math.floor(Math.random() * 1e9).toString(),
    text: text,
    done: false,
    createdAt: new Date().toISOString(),
  };
  console.log(newTodo);

  todos.push(newTodo);
  console.table(todos);

  saveData();
  counts(todos);
  renderTodos(todos);
}

function renderTodos(todos: TODOS): void {
  if (!todoList) return;

  todoList.innerHTML = "";

  todos.forEach((todo: Todo) => {
    const todoItem = document.createElement("li");
    todoItem.classList = "todo-item";
    const todoItemContent = `<p>${todo.text} <span>(Status: ${todo.done})</span></p>`;
    todoItem.innerHTML = todoItemContent;
    todoList.appendChild(todoItem);
  });
}

function remove(id: string) {}

function filter() {}

function counts(todos: TODOS): number {
  const totalTodos = todos.length;
  if (countTotal) {
    countTotal.value = totalTodos.toString();
  }

  const totalDone = todos.filter((t) => t.done === true).length;
  console.log("filteredTotalDone", totalDone);
  if (countDone) {
    countDone.value = totalDone.toString();
  }

  return totalTodos;
}
/* Init */
document.addEventListener("DOMContentLoaded", () => {
  renderTodos(todos);
  counts(todos);
});
/* localStorage */
function saveData() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getData(): TODOS {
  const raw = localStorage.getItem("todos");
  return raw ? JSON.parse(raw) : [];
}

function removeData() {}

function clearData() {}
