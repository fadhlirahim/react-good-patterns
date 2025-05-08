import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import TodoApp from './components/TodoApp';
import UserList from './components/UserList';
import Counter from './components/Counter';
import SignalCounter from './components/SignalCounter';
import OrderProcess from './components/OrderProcess';
import { ListTodo, Database, GaugeCircle } from 'lucide-react';

// Create a client for React Query
const queryClient = new QueryClient();

const Section: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}> = ({ icon, title, description, children }) => (
  <div className="section">
    <div className="section-header">
      <div className="section-icon">{icon}</div>
      <div>
        <h3 className="section-title">{title}</h3>
        <p className="section-description">{description}</p>
      </div>
    </div>
    <div className="section-content">
      {children}
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        {/* Top Nav */}
        <header className="header">
          <div className="container">
            <div className="header-content">
              <h1 className="header-title">React Good Patterns</h1>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="main-content">
          <div className="container">
            <h1 className="page-title">React Best Practices Showcase</h1>
              <p className="page-description">
                Modern state management and data fetching patterns with custom styling.
            </p>
            <div className="grid">
              <Section
                icon={<ListTodo size={24} strokeWidth={2.2} />}
                title="Zustand Examples"
                description="State management using Zustand store and state machines."
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <TodoApp />
                  <OrderProcess />
                </div>
              </Section>
              <Section
                icon={<Database size={24} strokeWidth={2.2} />}
                title="Data Fetching"
                description="Server state management with React Query."
              >
                <UserList />
              </Section>
              <Section
                icon={<GaugeCircle size={24} strokeWidth={2.2} />}
                title="Counter Examples"
                description="Different approaches to state management."
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <Counter />
                  <SignalCounter />
                </div>
              </Section>
            </div>
          </div>
        </main>

        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              Built with <span className="footer-highlight">React</span>, <span className="footer-highlight">Zustand</span>, and <span className="footer-highlight">React Query</span>
            </div>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  );
};

export default App;
