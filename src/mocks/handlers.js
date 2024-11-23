import { rest } from 'msw';

let mockRoles = [
  { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
  { id: 2, name: 'Editor', permissions: ['Read', 'Write'] },
];

export const handlers = [
  // Fetch roles
  rest.get('/api/roles', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockRoles));
  }),

  // Add new role
  rest.post('/api/roles', (req, res, ctx) => {
    const newRole = req.body;
    mockRoles.push({ ...newRole, id: Date.now() });
    return res(ctx.status(201), ctx.json({ success: true }));
  }),

  // Update a role
  rest.put('/api/roles/:id', (req, res, ctx) => {
    const { id } = req.params;
    const updatedRole = req.body;
    mockRoles = mockRoles.map((role) =>
      role.id === parseInt(id) ? { ...role, ...updatedRole } : role
    );
    return res(ctx.status(200), ctx.json({ success: true }));
  }),

  // Delete a role
  rest.delete('/api/roles/:id', (req, res, ctx) => {
    const { id } = req.params;
    mockRoles = mockRoles.filter((role) => role.id !== parseInt(id));
    return res(ctx.status(200), ctx.json({ success: true }));
  }),
];