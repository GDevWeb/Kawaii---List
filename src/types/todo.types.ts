export interface Todo {
  id: string;
  text: string;
  done: boolean;
  createdAt: string;
  updatedAt?: string;
}

export type TODOS = Todo[];
