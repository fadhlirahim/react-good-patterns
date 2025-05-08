# React guide

A lot of AI-generated React code is heavily biased toward using useState and useEffect, often in verbose or naive ways. That’s because these hooks are:

1. Explicit, making them easy for LLMs to pattern-match.
2. Safe defaults, requiring less architectural decision-making.
3. Well-documented, so the model’s training data is oversaturated with examples.

But modern, well-architected React apps rarely rely on raw useState/useEffect beyond simple UI state or lifecycle quirks. Here’s a breakdown of what serious devs use instead—and why this is the real moat for human engineers.

Alternatives to useState and useEffect

1. State Machines / Statecharts (e.g. Zustand)
- Why: Replaces ad-hoc local state management with deterministic, declarative logic.
- Advantage: Less bugs, easier to test, clearer state transitions.
- AI gap: LLMs struggle to model state transitions declaratively. LLM Agent must overcome this.

2. React Query / SWR for Data Fetching
- Why: Avoids useEffect-based data fetching and loading/error state juggling.
- Advantage: Caching, stale-while-revalidate, retries, pagination—all handled out of the box.
- AI gap: AI often uses useEffect + fetch and forgets cleanup, race conditions, or caching.

3. Global State with Zustand, Jotai, Recoil, or Redux Toolkit
- Why: Local useState doesn’t scale for shared or persistent state.
- Advantage: Better performance, devtools support, persistence.
- AI gap: Defaults to prop-drilling or bloated context APIs.

4. Custom Hooks and Composition
- Why: Reuse logic cleanly without bloating components or copy-pasting useEffect.
- Advantage: Separation of concerns, encapsulation.
- AI gap: Often fails to factor logic out, keeping everything in one component.

## Why This Matters

AI can mimic patterns, but it can’t:
- Architect a system for long-term maintainability.
- Predict runtime performance tradeoffs.
- Refactor spaghetti effects into custom hooks or state machines.
- Decide when state should be colocated vs globalized.
- Avoid footguns like stale closures, unnecessary re-renders, or race conditions.

In short: AI is great at writing code, but bad at engineering software.

Takeaway
- Use fewer useEffect and useState hooks.
- Learn to design systems, not just code components.
- Reach for declarative, composable patterns.
- Understand caching, reactivity, and scalability beyond local state.

Here’s a side-by-side breakdown of common AI-generated React patterns (bad) vs what experienced engineers write (good) across 4 key areas: state management, data fetching, side effects, and logic reuse.

## 1. State Management

❌ Bad (AI-style useState)

```typescript
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    setTodos([...todos, { text: input }]);
    setInput('');
  };

  return (
    <>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, i) => <li key={i}>{todo.text}</li>)}
      </ul>
    </>
  );
}
```

✅ Good (Zustand store, state extracted)

```typescript
import { create } from 'zustand';

const useTodoStore = create((set) => ({
  todos: [],
  input: '',
  addTodo: () => set((state) => ({
    todos: [...state.todos, { text: state.input }],
    input: '',
  })),
  setInput: (val) => set({ input: val }),
}));

function TodoApp() {
  const { todos, input, setInput, addTodo } = useTodoStore();

  return (
    <>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, i) => <li key={i}>{todo.text}</li>)}
      </ul>
    </>
  );
}

```

## 2. Data Fetching

❌ Bad (AI-style useEffect)

```typescript
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers);
  }, []);

  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}
```

✅ Good (React Query)

```typescript
import { useQuery } from '@tanstack/react-query';

function UserList() {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(res => res.json()),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}

## 3. Side Effects

❌ Bad (naive effect with race condition)

```typescript
function Search({ term }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(`/api/search?q=${term}`)
      .then(res => res.json())
      .then(setResults);
  }, [term]);

  return <div>{results.length} results</div>;
}
```

✅ Good (abort previous fetch with AbortController)

```typescript
function Search({ term }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/search?q=${term}`, { signal: controller.signal })
      .then(res => res.json())
      .then(setResults)
      .catch((e) => {
        if (e.name !== 'AbortError') console.error(e);
      });

    return () => controller.abort();
  }, [term]);

  return <div>{results.length} results</div>;
}
```

Better yet? Don’t use useEffect at all. Use React Query with term as a key.

## 4. Logic Reuse

❌ Bad (repeated logic inline)

```typescript
function ComponentA() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCount(c => c + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return <div>{count}</div>;
}

function ComponentB() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCount(c => c + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return <div>{count}</div>;
}
```

✅ Good (custom hook)

```typescript
function useCounter(intervalMs = 1000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCount(c => c + 1), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return count;
}

function ComponentA() {
  const count = useCounter();
  return <div>{count}</div>;
}

function ComponentB() {
  const count = useCounter();
  return <div>{count}</div>;
}

```

## 5. State Machines with Zustand

❌ Bad (AI-style complex useState with boolean flags)

```typescript
function OrderProcess() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cart, setCart] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const submitPayment = async (details) => {
    setIsLoading(true);
    setIsError(false);

    try {
      await processPayment(details);
      setPaymentDetails(details);
      setIsSuccess(true);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const placeOrder = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      await submitOrder(cart, paymentDetails);
      setOrderPlaced(true);
      setIsSuccess(true);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Complex conditional rendering based on multiple state variables */}
      {isLoading && <LoadingSpinner />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && !orderPlaced && (
        <>
          <CartItems items={cart} onAddItem={addToCart} />
          <PaymentForm onSubmit={submitPayment} />
          {paymentDetails && <OrderButton onClick={placeOrder} />}
        </>
      )}
      {orderPlaced && <OrderConfirmation />}
    </div>
  );
}
```

✅ Good (Zustand state machine)

```typescript
import { create } from 'zustand';

// Create a Zustand store with state machine pattern
const useOrderStore = create((set, get) => ({
  // State machine's current state
  state: 'browsing',

  // Context/data
  cart: [],
  paymentDetails: null,
  error: null,

  // Actions that transition between states
  addToCart: (item) => set((state) => ({
    cart: [...state.cart, item]
  })),

  goToCheckout: () => set({ state: 'paymentEntry' }),

  goBack: () => {
    const { state: currentState } = get();
    if (currentState === 'paymentEntry') {
      set({ state: 'browsing' });
    } else if (currentState === 'confirmOrder') {
      set({ state: 'paymentEntry' });
    }
  },

  submitPayment: async (details) => {
    set({ state: 'processingPayment', error: null });

    try {
      const result = await processPayment(details);
      set({
        state: 'confirmOrder',
        paymentDetails: result
      });
    } catch (error) {
      set({
        state: 'paymentEntry',
        error: error.message
      });
    }
  },

  placeOrder: async () => {
    const { cart, paymentDetails } = get();
    set({ state: 'processingOrder', error: null });

    try {
      await submitOrder(cart, paymentDetails);
      set({ state: 'orderComplete' });
    } catch (error) {
      set({
        state: 'confirmOrder',
        error: error.message
      });
    }
  }
}));

function OrderProcess() {
  const {
    state,
    cart,
    paymentDetails,
    error,
    addToCart,
    goToCheckout,
    goBack,
    submitPayment,
    placeOrder
  } = useOrderStore();

  // Render UI based on current state
  return (
    <div>
      {error && <ErrorMessage message={error} />}

      {state === 'browsing' && (
        <CartItems
          items={cart}
          onAddItem={addToCart}
          onCheckout={goToCheckout}
        />
      )}

      {state === 'paymentEntry' && (
        <PaymentForm
          onSubmit={submitPayment}
          onBack={goBack}
        />
      )}

      {state === 'processingPayment' && (
        <LoadingSpinner message="Processing payment..." />
      )}

      {state === 'confirmOrder' && (
        <OrderSummary
          cart={cart}
          paymentDetails={paymentDetails}
          onConfirm={placeOrder}
          onBack={goBack}
        />
      )}

      {state === 'processingOrder' && (
        <LoadingSpinner message="Placing your order..." />
      )}

      {state === 'orderComplete' && (
        <OrderConfirmation orderDetails={{ cart, paymentDetails }} />
      )}
    </div>
  );
}
```

### Key Benefits of the Zustand State Machine Approach:

1. **Explicit states**: The system can only be in one well-defined state at a time
2. **Centralized logic**: All state transitions are defined in one place
3. **Predictable transitions**: State changes follow clear patterns
4. **Simplified UI logic**: Components just render based on the current state
5. **Async handling**: Asynchronous operations are contained within the state transitions
6. **Shared state**: Any component can access the store without prop drilling
7. **Improved debugging**: The current state is always clear and predictable
8. **No impossible states**: Unlike boolean flags that could create invalid combinations
9. **Simpler API**: Compared to XState, Zustand offers a more approachable API for many developers
10. **Smaller bundle size**: Zustand is significantly smaller than XState

This approach gives most of the benefits of formal state machines while maintaining the simplicity and familiarity of React state management. It's a pragmatic middle ground that's often easier to adopt in existing projects.


# Summary Table

| Concern | Bad AI Pattern | Good Practice |
|---------|---------------|--------------|
| State | useState for everything | Zustand, Redux, custom hooks |
| Data Fetching | useEffect + fetch | React Query, SWR |
| Side Effects | No cleanup, no abort | AbortController, or query libs |
| Logic Reuse | Duplicated logic in components | Custom hooks |


Additional Guide:

1. Embrace Type Safety (TypeScript)
	•	Why: Catches bugs at compile time, self-documenting APIs, safer refactors.
	•	Example: Show how your Zustand store and React Query hooks get typed return values and action payloads.


2. Performance Best Practices
	•	Memoization
	•	When to use useMemo/useCallback—and when not to.
	•	Pitfalls: over-memoizing, stale closures.
	•	Profiling
	•	Introduce the React Profiler API or DevTools Profiler to find unnecessary re-renders.
	•	Chunking & Lazy Loading
	•	Use React.lazy + Suspense for code-split routes or heavy components.

3. Error Handling & Resilience
	•	Error Boundaries
	•	Explain how to wrap subtrees in a boundary and fallback UIs.
	•	Retry Logic
	•	Beyond React Query’s defaults—custom backoff strategies, circuit breakers.

4. Testing Strategy
	•	Unit Tests for custom hooks and state machines (e.g. @testing-library/react-hooks, Jest).
	•	Component Tests with React Testing Library—focus on behavior, not implementation.
	•	End-to-End with Cypress or Playwright—exercise your “happy path” and error flows.

5. Accessibility (a11y)
	•	Semantic HTML: buttons, landmarks, form labels.
	•	ARIA only when necessary.
	•	Automated checks: axe, eslint-plugin-jsx-a11y.

6. Folder & Architectural Conventions
	•	Feature-based layout (colocate component + styles + tests).
	•	“Barrel” exports to reduce import noise.
	•	API abstraction layer—a thin wrapper over fetch or GraphQL client.

7. Advanced React 18+ Features
	•	Concurrent UI: useTransition, startTransition for non-blocking updates.
	•	Suspense for Data Fetching: (with React Query or Relay) to simplify loading states.
	•	Server-Side Rendering (SSR) / Static Generation: Next.js patterns.

8. Styling & Theming
	•	Utility-first (Tailwind) vs CSS-in-JS (Stitches/emotion) vs CSS Modules—pros/cons.
	•	Theming: design tokens, dark mode toggles.

9. Developer Experience
	•	Storybook for isolated component dev + docs.
	•	Linting/Formatting: ESLint + Prettier + husky pre-commit hooks.
	•	Documentation: autogenerated prop tables, JSDoc/TypeDoc.
