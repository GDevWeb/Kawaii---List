// selectors.ts
export const SEL = {
  form: "form",
  input: "#todo-input",
  list: "#todo-list",
} as const;

export function q<T extends Element>(sel: string): T {
  const el = document.querySelector<T>(sel);
  if (!el) throw new Error(`Missing element: ${sel}`);
  return el;
}
