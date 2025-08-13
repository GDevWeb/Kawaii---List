import { getData, saveData } from "./services/storageService";
import type { Todo, TODOS } from "./types/todo.types";

type FilterMode = "all" | "active" | "done";
let filterMode: FilterMode = "all";

// form
const form: HTMLFormElement | null = document.querySelector("form");
const todoInput: HTMLInputElement | null =
  document.querySelector("#todo-input");

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  handleAdd(e);
});

/* ***Event handlers*** */
function handleAdd(_e: Event) {
  const value = todoInput?.value?.trim();
  if (!value) return;
  add(value);
  if (todoInput) {
    todoInput.value = "";
    todoInput.focus();
  }
}

// todo-list
const todoList: HTMLUListElement | null =
  document.querySelector("ul#todo-list");

const countTotal = document.querySelector<HTMLSpanElement>("#count-total");
const countDone = document.querySelector<HTMLSpanElement>("#count-done");

const btnClear: HTMLButtonElement | null =
  document.querySelector("button#btn-clear");

btnClear?.addEventListener("click", clearCompleted);

/* ***Logic*** */
// variables;
let todos: TODOS = getData();

function setTodos(next: TODOS) {
  todos = next;
  saveData(todos);
  refresh();
}

/* Add */
function add(text: string) {
  const value = text.trim();
  if (value.length < 3) return;

  const newTodo: Todo = {
    id: Math.floor(Math.random() * 1e9).toString(),
    text: value,
    done: false,
    createdAt: new Date().toISOString(),
  };

  setTodos([newTodo, ...todos]);
}

function remove(id: string) {
  if (confirm("Voulez vous réellement supprimer cette tâche?")) {
    setTodos(todos.filter((t) => t.id !== id));
    return;
  }
}

function updatedTodos(todo: Todo) {
  setTodos(
    todos.map((t) => (t.id === todo.id ? { ...t, done: todo.done } : t))
  );
}

function clearCompleted() {
  if (
    confirm(
      "Voulez vous réellement nettoyer la liste de toutes les tâches terminées?"
    )
  ) {
    setTodos(todos.filter((t) => !t.done));
  }
  return;
}

function refresh() {
  const visible = filterTodos(todos, filterMode);
  renderTodos(visible);
  counts(todos);
  toggleEmptyState(visible.length === 0);
}

function renderTodos(todos: TODOS): void {
  if (!todoList) return;

  // Clear list
  todoList.innerHTML = "";

  const frag = document.createDocumentFragment();

  todos.forEach((todo: Todo) => {
    const li = document.createElement("li");
    li.dataset.id = todo.id;
    li.className = todo.done ? "todo-item done" : "todo-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-check"; // matches CSS
    checkbox.checked = todo.done;
    checkbox.setAttribute(
      "aria-label",
      `${todo.done ? "Unmark" : "Mark"} "${todo.text}" as done`
    );
    checkbox.addEventListener("change", () => {
      updatedTodos({ ...todo, done: checkbox.checked });
    });

    const text = document.createElement("p");
    text.className = "todo-text";
    text.textContent = todo.text;

    const space = document.createTextNode(" ");
    const badge = document.createElement("span");
    badge.className = "todo-badge";
    badge.textContent = todo.done ? "Terminé" : "En cours";

    text.appendChild(space);
    text.appendChild(badge);

    const btnDelete = document.createElement("button");
    btnDelete.type = "button";
    btnDelete.className = "btn-delete";
    btnDelete.textContent = "Supprimer";
    btnDelete.setAttribute("aria-label", `Supprimer "${todo.text}"`);
    btnDelete.addEventListener("click", () => remove(todo.id));

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(btnDelete);
    li.classList.add("anim-in");

    frag.appendChild(li);
  });

  todoList.appendChild(frag);
}

/* ***Filter*** */
function setFilter(mode: FilterMode, clickedBtn: HTMLButtonElement) {
  filterMode = mode;
  document
    .querySelectorAll<HTMLButtonElement>("#filters button")
    .forEach((b) => b.classList.remove("is-active"));
  clickedBtn.classList.add("is-active");
  refresh();
}

const filterEl = document.querySelector<HTMLDivElement>("#filters");

filterEl?.addEventListener("click", (e: MouseEvent) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>("button");
  if (!btn) return;

  const mode = btn.dataset.filter as FilterMode | undefined;
  if (!mode) return;

  setFilter(mode, btn);
});

function filterTodos(list: TODOS, mode: FilterMode): TODOS {
  if (mode === "active") return list.filter((t) => !t.done);
  if (mode === "done") return list.filter((t) => t.done);
  return list;
}

const setOutput = (el: HTMLElement | null, n: number) => {
  if (!el) return;
  el.textContent = String(n);
};

function counts(todos: TODOS) {
  const total = todos.length;
  const done = todos.filter((t) => t.done).length;
  setOutput(countTotal, total);
  setOutput(countDone, done);
  return { total, done };
}

const emptyState = document.querySelector<HTMLParagraphElement>("#empty-state");

function toggleEmptyState(show: boolean) {
  if (!emptyState) return;
  emptyState.hidden = !show;
}

// Initial render
renderTodos(filterTodos(todos, filterMode));
counts(todos);
toggleEmptyState(todos.length === 0);
