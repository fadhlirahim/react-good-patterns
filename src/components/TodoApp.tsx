import React from 'react';
import useTodoStore from '../store/todoStore';

/**
 * TodoApp component that demonstrates using Zustand for state management
 */
const TodoApp: React.FC = () => {
  const { todos, input, setInput, addTodo } = useTodoStore();

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Todos (Zustand)</h3>
      </div>
      <div className="card-content">
        <form
          className="form-group"
          onSubmit={e => {
            e.preventDefault();
            addTodo();
          }}
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="New todo"
            className="input"
            autoFocus
          />
          <button type="submit" className="button">Add</button>
        </form>
        <ul className="list">
          {todos.length === 0 ? (
            <li className="text-center" style={{ color: '#666', fontStyle: 'italic', fontSize: '0.875rem' }}>No todos yet.</li>
          ) : (
            todos.map((todo, index) => (
              <li
                key={index}
                className="list-item"
              >
                {todo.text}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
