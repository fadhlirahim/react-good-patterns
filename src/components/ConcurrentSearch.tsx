import React, { useState, useTransition } from 'react';

/**
 * Mock data for search results
 */
const mockData = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  title: `Item ${i}`,
  description: `Description for item ${i}`
}));

/**
 * ConcurrentSearch component that demonstrates using useTransition for non-blocking UI updates
 */
const ConcurrentSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(mockData);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Use startTransition to mark the filtering as a non-blocking update
    startTransition(() => {
      if (value.trim() === '') {
        setResults(mockData);
      } else {
        const filtered = mockData.filter(item =>
          item.title.toLowerCase().includes(value.toLowerCase()) ||
          item.description.toLowerCase().includes(value.toLowerCase())
        );
        setResults(filtered);
      }
    });
  };

  return (
    <div className="card shadow">
      <div className="card-header">
        <h3 className="card-title">Concurrent Search (useTransition)</h3>
      </div>
      <hr style={{ margin: 0, borderTop: '1px solid #eee' }} />
      <div className="card-content flex flex-col gap-4">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search items..."
          className="input"
        />

        {isPending && (
          <div className="p-2 rounded bg-blue-50 border border-blue-200 text-blue-600 text-sm">
            Updating results...
          </div>
        )}

        <div className="results-container" style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {results.slice(0, 10).map(item => (
            <div
              key={item.id}
              className="p-2 border-b border-gray-100 hover:bg-gray-50"
            >
              <div className="font-medium">{item.title}</div>
              <div className="text-sm text-gray-600">{item.description}</div>
            </div>
          ))}
          {results.length > 10 && (
            <div className="p-2 text-center text-sm text-gray-500">
              ...and {results.length - 10} more results
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConcurrentSearch;
