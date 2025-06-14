
import React from 'react';
import UserCard from './UserCard';
import { UserProfile } from '@/contexts/AuthContext';

interface UserListProps {
  users: UserProfile[];
  emptyMessage?: string;
}

const UserList: React.FC<UserListProps> = ({ users, emptyMessage = "No users found" }) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">{emptyMessage}</h3>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {users.map(user => (
        <UserCard key={user.uid} user={user} />
      ))}
    </div>
  );
};

export default UserList;
