No worries at all — we’ll stick to English from here. 👍

Here’s the **concise checklist** for your Kawaii List using the **mix approach** (functional core + tiny UI class). No code, just tasks.

# Functional core (pure functions) — `src/core/todos.ts`

- **Data model**: `Todo = { id, text, done, createdAt }`.
- **add(todos, text) → newTodos** (trim, reject empty; optional de-dupe).
- **toggle(todos, id) → newTodos**.
- **remove(todos, id) → newTodos**.
- **filter(todos, mode) → visibleTodos** where `mode ∈ {all, active, done}`.
- **counts(todos) → { total, done }**.
- _(Optional)_ `editText(todos, id, newText) → newTodos`.
- _(Optional)_ `clearCompleted(todos) → newTodos`.
- Keep functions **pure** (no DOM, no localStorage inside).

# Persistence — `src/core/storage.ts`

- **load(key = "kawaii.todos") → Todo\[]** (safe JSON parse, fallback `[]`).
- **save(key, todos)** (overwrite fully).
- _(Optional)_ **clear(key)**.

# UI controller (small class) — `src/ui/App.ts`

- **State**: `todos: Todo[]`, `filter: "all" | "active" | "done"`.
- **mount()**: get DOM refs, bind events, `this.todos = load()`, `render()`.
- **Event handlers**:

  - `handleAdd(e)` → read input → `add()` → `setState()`.
  - `handleToggle(id)` (event delegation on list) → `toggle()` → `setState()`.
  - `handleDelete(id)` → `remove()` → `setState()`.
  - `handleFilterChange(mode)` → update `filter` → `render()`.

- **setState(nextTodos)**: update memory → `save()` → `render()`.
- **render()**:

  - `renderList(visibleTodos)` (apply `.done`, use `.anim-in` on new).
  - `renderCounts({ total, done })`.
  - `renderFilterUI(activeMode)` (toggle `.is-active`).
  - `toggleEmptyState(show)`.

- **Utilities**: small `qs/qsa` helpers, event delegation helper.

# Flow (happy path)

1. **Init**: `todos = load()`; `filter = "all"`; `render()`.
2. **Any mutation** (add/toggle/delete): compute `newTodos` via core → `save()` → `render()`.

# Accessibility & UX checks

- Input has `<label>` and `required`; submit on **Enter**.
- Buttons have clear text; list has `role="list"`.
- Counter uses `aria-live="polite"`.
- Visible focus outlines; keyboard-only flow works.
- Empty state toggles correctly; micro-animations are subtle.

# Nice-to-haves (after MVP)

- Inline edit, clear completed, undo last action.
- Drag & drop reorder.
- Export/Import JSON.
- Theme toggle (Pastel Day / Night Sakura).

If you want, I can turn this into a **tiny task board** (10–12 bite-size tasks) you can tick off in 60–90 minutes.
