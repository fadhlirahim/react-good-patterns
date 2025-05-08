import React from 'react';
import useTodoStore from '../store/todoStore';

/**
 * TodoApp component that demonstrates using Zustand for state management
 */
const TodoApp: React.FC = () => {
  const { todos, input, setInput, addTodo } = useTodoStore();

  return (
    <div>
      <h2>Todos (Zustand)</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="New todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
