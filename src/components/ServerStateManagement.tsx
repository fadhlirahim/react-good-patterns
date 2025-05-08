import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Simulated API functions
 */
const fetchTodos = async (): Promise<Array<{ id: number; title: string; completed: boolean }>> => {
  // Simulate API call with delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, title: 'Learn React Query', completed: false },
    { id: 2, title: 'Build a demo app', completed: false },
    { id: 3, title: 'Share knowledge', completed: true },
  ];
};

const toggleTodoStatus = async (id: number): Promise<{ id: number; success: boolean }> => {
  // Simulate API call with delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return { id, success: true };
};

/**
 * ServerStateManagement component that demonstrates React Query for data fetching and mutations
 */
const ServerStateManagement: React.FC = () => {
  const queryClient = useQueryClient();

  // Query: Fetch todos
  const {
    data: todos,
    isLoading,
    isError,
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    staleTime: 30000, // 30 seconds
  });

  // Mutation: Toggle todo status
  const toggleMutation = useMutation({
    mutationFn: toggleTodoStatus,
    // When mutate is called:
    onMutate: async (todoId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(['todos']);

      // Optimistically update to the new value
      queryClient.setQueryData(['todos'], (old: any) =>
        old?.map((todo: any) =>
          todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        )
      );

      // Return a context object with the snapshot
      return { previousTodos };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, todoId, context: any) => {
      queryClient.setQueryData(['todos'], context.previousTodos);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return (
    <div className="card shadow">
      <div className="card-header">
        <h3 className="card-title">Server State Management (React Query)</h3>
      </div>
      <hr style={{ margin: 0, borderTop: '1px solid #eee' }} />
      <div className="card-content flex flex-col gap-4">
        <p className="text-sm text-gray-600">
          React Query manages server state with automatic caching, background updates, and optimistic UI.
          This example demonstrates queries, mutations, and optimistic updates.
        </p>

        <div className="flex justify-between items-center">
          <h4 className="font-semibold">Todo List (Server State)</h4>
          <button
            onClick={() => refetch()}
            className="button button-secondary"
            disabled={isFetching}
          >
            {isFetching ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>

        {isLoading ? (
          <div className="p-4 text-center">
            <div className="mb-2">Loading todos...</div>
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          </div>
        ) : isError ? (
          <div className="p-4 bg-red-50 text-red-700 rounded border border-red-200">
            Error: {(error as Error).message}
          </div>
        ) : (
          <div className="border rounded">
            <ul className="divide-y">
              {todos?.map(todo => (
                <li key={todo.id} className="p-3 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleMutation.mutate(todo.id)}
                      id={`todo-${todo.id}`}
                    />
                    <label
                      htmlFor={`todo-${todo.id}`}
                      className={todo.completed ? 'line-through text-gray-500' : ''}
                    >
                      {todo.title}
                    </label>
                  </div>
                  {toggleMutation.isPending && toggleMutation.variables === todo.id && (
                    <span className="text-xs text-blue-600">Saving...</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-sm text-gray-600 border-t pt-4">
          <p className="font-semibold mb-2">React Query Features Demonstrated:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Automatic caching and background refetching</li>
            <li>Loading and error states</li>
            <li>Optimistic updates for better UX</li>
            <li>Automatic retry on failure</li>
            <li>Mutation with rollback on error</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServerStateManagement;
