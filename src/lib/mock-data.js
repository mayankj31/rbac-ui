// src/lib/mock-data.js

export const mockUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Editor',
      status: 'active',
    },
  ];
  
  export const mockRoles = [
    {
      id: 1,
      name: 'Admin',
      permissions: ['Read', 'Write', 'Delete'],
    },
    {
      id: 2,
      name: 'Editor',
      permissions: ['Read', 'Write'],
    },
  ];
  
  export const availablePermissions = [
    { id: 'read', name: 'Read', description: 'Can read content' },
    { id: 'write', name: 'Write', description: 'Can create and edit content' },
    { id: 'delete', name: 'Delete', description: 'Can delete content' },
    { id: 'manage_users', name: 'Manage Users', description: 'Can manage user accounts' },
  ];