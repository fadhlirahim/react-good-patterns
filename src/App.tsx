import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';

// Import components
import TodoApp from './components/TodoApp';
import UserList from './components/UserList';
import Counter from './components/Counter';
import SignalCounter from './components/SignalCounter';
import OrderProcess from './components/OrderProcess';

// Create a client for React Query
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: '20px' }}>
        <h1>React Best Practices Full Example (Zustand State Machines)</h1>
        <TodoApp />
        <UserList />
        <Counter />
        <SignalCounter />
        <OrderProcess />
      </div>
    </QueryClientProvider>
  )
}

export default App
