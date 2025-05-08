import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import './custom-styles.css';
import TodoApp from './components/TodoApp';
import UserList from './components/UserList';
import Counter from './components/Counter';
import SignalCounter from './components/SignalCounter';
import OrderProcess from './components/OrderProcess';
import ConcurrentSearch from './components/ConcurrentSearch';
import ErrorBoundaryExample from './components/ErrorBoundaryExample';
import AccessibleTheming from './components/AccessibleTheming';
import CodeSplitting from './components/CodeSplitting';
import MemoizationExample from './components/MemoizationExample';
import ServerStateManagement from './components/ServerStateManagement';
import FormWithValidation from './components/FormWithValidation';
import { ListTodo, Database, GaugeCircle, Zap, Shield, Palette, Code, Cpu, Server, ClipboardCheck } from 'lucide-react';

// Create a client for React Query
const queryClient = new QueryClient();

const Section: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ icon, title, description, children, style }) => (
  <div className="section" style={style}>
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
              <Section
                icon={<Zap size={24} strokeWidth={2.2} />}
                title="Concurrent UI"
                description="Non-blocking UI updates with useTransition."
              >
                <ConcurrentSearch />
              </Section>
              <Section
                icon={<Shield size={24} strokeWidth={2.2} />}
                title="Error Handling"
                description="Graceful error handling with Error Boundaries."
              >
                <ErrorBoundaryExample />
              </Section>
              <Section
                icon={<Palette size={24} strokeWidth={2.2} />}
                title="Accessibility & Theming"
                description="Best practices for accessible and themeable components."
              >
                <AccessibleTheming />
              </Section>
              <Section
                icon={<Code size={24} strokeWidth={2.2} />}
                title="Code Splitting"
                description="Optimizing bundle size with lazy loading."
              >
                <CodeSplitting />
              </Section>
              <Section
                icon={<Cpu size={24} strokeWidth={2.2} />}
                title="Performance Optimization"
                description="Memoization techniques to prevent unnecessary renders."
              >
                <MemoizationExample />
              </Section>
              <Section
                icon={<Server size={24} strokeWidth={2.2} />}
                title="Advanced Server State"
                description="React Query with optimistic updates and cache management."
              >
                <ServerStateManagement />
              </Section>
              <Section
                icon={<ClipboardCheck size={24} strokeWidth={2.2} />}
                title="Form Management"
                description="Form handling with React Hook Form and Zod validation."
                style={{ gridColumn: 'span 2' }}
              >
                <FormWithValidation />
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
