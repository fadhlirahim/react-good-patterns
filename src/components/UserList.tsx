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
    <div>
      <h2>Users (React Query)</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
