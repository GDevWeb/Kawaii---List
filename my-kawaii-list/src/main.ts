/* ***DOM*** */

import type { Todo, TODOS } from "./types/todo.types";

/* Init */
document.addEventListener("DOMContentLoaded", () => {
  renderTodos(todos);
  counts(todos);
});

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
    todoItem.dataset.id = todo.id;
    todoItem.className = todo.done ? "todo-item done" : "todo-item";

    const todoCheck = document.createElement("input");
    todoCheck.type = "checkbox";
    todoCheck.checked = todo.done;

    const btnDelete = document.createElement("button");
    btnDelete.addEventListener("click", () => remove(todo.id));
    btnDelete.classList.add("btn-delete");
    btnDelete.textContent = "Supprimer";
    const todoText = document.createElement("p");
    todoText.innerHTML = `${todo.text} <span>(Status: ${
      todo.done ? "Terminé" : "En cours"
    })</span>`;
    todoItem.appendChild(todoCheck);
    todoItem.appendChild(todoText);
    todoItem.appendChild(btnDelete);
    todoList.appendChild(todoItem);
  });
}

function remove(id: string): void {
  todos = todos.filter((todo) => todo.id !== id);
  saveData();
  counts(todos);
  renderTodos(todos);
}

function filter() {}

const setOutput = (el: HTMLOutputElement | null, n: number) => {
  if (!el) return;
  const s = String(n);
  el.value = s;
  el.textContent = s;
};

function counts(todos: TODOS) {
  const total = todos.length;
  const done = todos.filter((t) => t.done).length;
  setOutput(countTotal, total);
  setOutput(countDone, done);
  return { total, done };
}

/* ***localStorage*** */
function saveData() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getData(): TODOS {
  const raw = localStorage.getItem("todos");
  return raw ? JSON.parse(raw) : [];
}

function removeData() {}

function clearData() {}
