import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Card, CardContent, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Checkbox, InputAdornment, Container, IconButton, Menu, MenuItem } from '@mui/material';
import {
  Search,
  Add,
  MoreVert,
  Edit,
  Delete,
  Group,
} from '@mui/icons-material';
import { useToastContext } from '@/context/toast/ToastContext';

const initialRoles = [
  {
    id: 'ROLE001',
    name: 'Super Admin',
    description: 'Full system access with all permissions',
    userCount: 2,
    permissions: ['users.create', 'users.read', 'users.update', 'users.delete', 'accounts.create', 'accounts.read', 'accounts.update', 'accounts.delete', 'transactions.read', 'transactions.approve', 'roles.manage', 'audit.read', 'system.configure'],
    status: 'active',
    createdDate: '2023-01-01'
  },
  {
    id: 'ROLE002',
    name: 'Account Manager',
    description: 'Manage customer accounts and basic operations',
    userCount: 5,
    permissions: ['users.read', 'users.update', 'accounts.create', 'accounts.read', 'accounts.update', 'transactions.read'],
    status: 'active',
    createdDate: '2023-01-15'
  },
  {
    id: 'ROLE003',
    name: 'Customer Support',
    description: 'Limited access for customer service operations',
    userCount: 12,
    permissions: ['users.read', 'accounts.read', 'transactions.read'],
    status: 'active',
    createdDate: '2023-02-01'
  },
  {
    id: 'ROLE004',
    name: 'Auditor',
    description: 'Read-only access for compliance and auditing',
    userCount: 3,
    permissions: ['users.read', 'accounts.read', 'transactions.read', 'audit.read'],
    status: 'active',
    createdDate: '2023-02-15'
  },
];

const availablePermissions = [
  { id: 'users.create', name: 'Create Users', category: 'User Management' },
  { id: 'users.read', name: 'View Users', category: 'User Management' },
  { id: 'users.update', name: 'Update Users', category: 'User Management' },
  { id: 'users.delete', name: 'Delete Users', category: 'User Management' },
  { id: 'accounts.create', name: 'Create Accounts', category: 'Account Management' },
  { id: 'accounts.read', name: 'View Accounts', category: 'Account Management' },
  { id: 'accounts.update', name: 'Update Accounts', category: 'Account Management' },
  { id: 'accounts.delete', name: 'Delete Accounts', category: 'Account Management' },
  { id: 'transactions.read', name: 'View Transactions', category: 'Transaction Management' },
  { id: 'transactions.approve', name: 'Approve Transactions', category: 'Transaction Management' },
  { id: 'roles.manage', name: 'Manage Roles', category: 'System Administration' },
  { id: 'audit.read', name: 'View Audit Logs', category: 'System Administration' },
  { id: 'system.configure', name: 'System Configuration', category: 'System Administration' },
];

const Roles: React.FC = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  });

  const { toast } = useToastContext();

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRole = () => {
    if (!newRole.name || !newRole.description) {
      toast('error', 'Please fill in all fields');
      return;
    }

    const role = {
      id: `ROLE${String(roles.length + 1).padStart(3, '0')}`,
      ...newRole,
      userCount: 0,
      status: 'active' as const,
      createdDate: new Date().toISOString().split('T')[0]
    };

    setRoles([...roles, role]);
    setNewRole({ name: '', description: '', permissions: [] });
    setIsAddRoleOpen(false);

    toast('success', 'Role added successfully');
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter(role => role.id !== roleId));
    setMenuAnchor(null);
    toast('success', 'Role deleted successfully');
  };

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setNewRole({
        ...newRole,
        permissions: [...newRole.permissions, permissionId]
      });
    } else {
      setNewRole({
        ...newRole,
        permissions: newRole.permissions.filter(p => p !== permissionId)
      });
    }
  };

  const groupedPermissions = availablePermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) acc[permission.category] = [];
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, typeof availablePermissions>);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, roleId: string) => {
    setMenuAnchor(event.currentTarget);
    setSelectedRole(roleId);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedRole(null);
  };

  return (
    <Container maxWidth={false} sx={{ py: 3, pl: 0 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h3" fontWeight="bold">
              Roles & Permissions
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage user roles and system permissions
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setIsAddRoleOpen(true)}
            sx={{ boxShadow: 2 }}
          >
            Create Role
          </Button>
        </Box>

        {/* Search */}
        <Card>
          <CardContent>
            <TextField
              fullWidth
              label="Search Roles"
              placeholder="Search by role name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                )
              }}
              sx={{ maxWidth: 400 }}
            />
          </CardContent>
        </Card>

        {/* Roles Table */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">All Roles</Typography>
              <Typography variant="body2" color="text.secondary">
                {filteredRoles.length} of {roles.length} roles
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Role</TableCell>
                    <TableCell>Users</TableCell>
                    <TableCell>Permissions</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRoles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell>
                        <Typography fontWeight={500}>{role.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{role.description}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={`${role.userCount} users`} size="small" />
                      </TableCell>
                      <TableCell>
                        <Chip label={`${role.permissions.length} permissions`} color="secondary" size="small" />
                      </TableCell>
                      <TableCell>
                        <Chip label="Active" color="success" size="small" />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {role.createdDate}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={(e) => handleMenuClick(e, role.id)}>
                          <MoreVert />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Menu */}
        <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={handleMenuClose}>
          <MenuItem onClick={handleMenuClose}>
            <Edit sx={{ mr: 1 }} />
            Edit Role
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Group sx={{ mr: 1 }} />
            Manage Users
          </MenuItem>
          <MenuItem
            onClick={() => selectedRole && handleDeleteRole(selectedRole)}
            disabled={selectedRole === 'ROLE001'}
            sx={{ color: 'error.main' }}
          >
            <Delete sx={{ mr: 1 }} />
            Delete Role
          </MenuItem>
        </Menu>

        <Dialog
          open={isAddRoleOpen}
          onClose={() => setIsAddRoleOpen(false)}
          closeAfterTransition={false}
          maxWidth="md"
          fullWidth
          aria-labelledby="create-role-dialog-title"
        >
          <DialogTitle id="create-role-dialog-title">Create New Role</DialogTitle>
          <DialogContent dividers>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                autoFocus
                label="Role Name"
                value={newRole.name}
                onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                placeholder="Enter role name"
              />
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={newRole.description}
                onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                placeholder="Enter role description"
              />
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>Permissions</Typography>
                {Object.entries(groupedPermissions).map(([category, permissions]) => (
                  <Box key={category} sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">{category}</Typography>
                    {permissions.map(permission => (
                      <FormControlLabel
                        key={permission.id}
                        control={
                          <Checkbox
                            checked={newRole.permissions.includes(permission.id)}
                            onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                          />
                        }
                        label={permission.name}
                      />
                    ))}
                  </Box>
                ))}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsAddRoleOpen(false)}>Cancel</Button>
            <Button onClick={handleAddRole} variant="contained">Create Role</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Roles;
