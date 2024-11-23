"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const RoleManagement = ({ roles, setRoles }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [formData, setFormData] = useState({ name: "", permissions: [] });
  const [permissions] = useState([
    "Read",
    "Write",
    "Delete",
    "Manage users",
  ]);

  const handleOpenModal = (role = null) => {
    setEditingRole(role);
    setFormData(role ? { ...role } : { name: "", permissions: [] });
    setIsModalOpen(true);
  };

  const handleSaveRole = () => {
    if (!formData.name.trim()) {
      alert("Role name is required.");
      return;
    }
    if (formData.permissions.length === 0) {
      alert("At least one permission is required.");
      return;
    }
    if (editingRole) {
      setRoles(roles.map((role) => (role.id === editingRole.id ? formData : role)));
    } else {
      // Using Date.now() to generate a unique ID
      setRoles([...roles, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };
  
  const handleDeleteRole = (roleId) => {
    setRoles(roles.filter((role) => role.id !== roleId));
  };

  const handlePermissionChange = (permission) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((perm) => perm !== permission)
        : [...prev.permissions, permission],
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Roles</h2>
        <Button onClick={() => handleOpenModal()}>Add Role</Button>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Role Name</th>
              <th className="px-6 py-3">Permissions</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{role.name}</td>
                <td className="px-6 py-4">
                  {role.permissions.join(", ")}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleOpenModal(role)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDeleteRole(role.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingRole ? "Edit Role" : "Add New Role"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Role Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Permissions
              </label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {permissions.map((permission) => (
                  <div key={permission} className="flex items-center">
                    <Checkbox
                      checked={formData.permissions.includes(permission)}
                      onCheckedChange={() => handlePermissionChange(permission)}
                    />
                    <span className="ml-2">{permission}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveRole}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoleManagement;