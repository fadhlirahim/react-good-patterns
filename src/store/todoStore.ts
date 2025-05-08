import { create } from 'zustand';

/**
 * Interface for a todo item
 */
interface Todo {
  text: string;
}

/**
 * Interface for the todo store state
 */
interface TodoStore {
  todos: Todo[];
  input: string;
  setInput: (val: string) => void;
  addTodo: () => void;
}

/**
 * Zustand store for managing todos
 */
const useTodoStore = create<TodoStore>((set: any) => ({
  todos: [],
  input: '',
  setInput: (val: string) => set({ input: val }),
  addTodo: () =>
    set((state: TodoStore) => ({
      todos: [...state.todos, { text: state.input }],
      input: '',
    })),
}));

export default useTodoStore;
