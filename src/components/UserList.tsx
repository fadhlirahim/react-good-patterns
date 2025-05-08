import React from 'react';
import { useQuery } from '@tanstack/react-query';

/**
 * Interface for a user object
 */
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

/**
 * UserList component that demonstrates using React Query for data fetching
 */
const UserList: React.FC = () => {
  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json()),
  });

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Users (React Query)</h3>
      </div>
      <hr style={{ margin: 0, borderTop: '1px solid #eee' }} />
      <div className="card-content">
        {isLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{ padding: '0.5rem', borderRadius: '0.375rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', height: '2.5rem' }}></div>
            ))}
          </div>
        ) : (
          <ul className="list">
            {users.map((user) => (
              <li
                key={user.id}
                className="list-item"
              >
                <div className="list-item-title">{user.name}</div>
                <div className="list-item-subtitle">{user.email}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserList;
