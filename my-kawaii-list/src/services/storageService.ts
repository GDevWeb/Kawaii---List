import type { TODOS } from "../types/todo.types";

/* ***localStorage*** */
// storageService.ts
const KEY = "kawaii.todos";
export function saveData(todos: TODOS) {
  localStorage.setItem(KEY, JSON.stringify(todos));
}
export function getData(): TODOS {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
