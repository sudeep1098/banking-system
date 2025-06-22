import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    TextField,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Menu,
    MenuItem,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    Select,
    InputAdornment,
    Alert,
    Snackbar
} from '@mui/material';
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye, UserCheck } from 'lucide-react';

const initialUsers = [
    {
        id: 'USR001',
        name: 'John Doe',
        email: 'john.doe@email.com',
        role: 'Customer',
        status: 'active',
        accounts: 2,
        balance: 15420.50,
        lastLogin: '2024-06-14 10:30 AM'
    },
    {
        id: 'USR002',
        name: 'Jane Smith',
        email: 'jane.smith@email.com',
        role: 'Premium Customer',
        status: 'active',
        accounts: 3,
        balance: 45890.75,
        lastLogin: '2024-06-14 09:15 AM'
    },
    {
        id: 'USR003',
        name: 'Bob Johnson',
        email: 'bob.johnson@email.com',
        role: 'Customer',
        status: 'inactive',
        accounts: 1,
        balance: 2150.00,
        lastLogin: '2024-06-10 02:45 PM'
    },
    {
        id: 'USR004',
        name: 'Alice Brown',
        email: 'alice.brown@email.com',
        role: 'Business',
        status: 'active',
        accounts: 5,
        balance: 125000.00,
        lastLogin: '2024-06-14 11:20 AM'
    },
];

const Users: React.FC = () => {
    const [users, setUsers] = useState(initialUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [roleFilter, setRoleFilter] = useState('all');
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        role: 'Customer',
        status: 'active'
    });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;

        return matchesSearch && matchesStatus && matchesRole;
    });

    const handleAddUser = () => {
        if (!newUser.name || !newUser.email) {
            setSnackbar({
                open: true,
                message: "Please fill in all required fields",
                severity: "error"
            });
            return;
        }

        const user = {
            id: `USR${String(users.length + 1).padStart(3, '0')}`,
            ...newUser,
            accounts: 0,
            balance: 0,
            lastLogin: 'Never'
        };

        setUsers([...users, user]);
        setNewUser({ name: '', email: '', role: 'Customer', status: 'active' });
        setIsAddUserOpen(false);

        setSnackbar({
            open: true,
            message: "User created successfully",
            severity: "success"
        });
    };

    const handleDeleteUser = (userId: string) => {
        setUsers(users.filter(user => user.id !== userId));
        setSnackbar({
            open: true,
            message: "User deleted successfully",
            severity: "success"
        });
        setAnchorEl(null);
    };

    const handleToggleStatus = (userId: string) => {
        setUsers(users.map(user =>
            user.id === userId
                ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
                : user
        ));
        setSnackbar({
            open: true,
            message: "User status updated successfully",
            severity: "success"
        });
        setAnchorEl(null);
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, userId: string) => {
        setAnchorEl(event.currentTarget);
        setSelectedUserId(userId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedUserId(null);
    };

    const getStatusChip = (status: string) => {
        switch (status) {
            case 'active':
                return <Chip label="Active" color="success" size="small" />;
            case 'inactive':
                return <Chip label="Inactive" color="default" size="small" />;
            case 'suspended':
                return <Chip label="Suspended" color="error" size="small" />;
            default:
                return <Chip label={status} variant="outlined" size="small" />;
        }
    };

    const getRoleChip = (role: string) => {
        switch (role) {
            case 'Premium Customer':
                return <Chip label="Premium" color="warning" size="small" />;
            case 'Business':
                return <Chip label="Business" color="info" size="small" />;
            default:
                return <Chip label={role} variant="outlined" size="small" />;
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}>
                        User Management
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage system users and their permissions
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<Plus size={16} />}
                    onClick={() => setIsAddUserOpen(true)}
                    sx={{ boxShadow: 2 }}
                >
                    Add New User
                </Button>
            </Box>

            {/* Search and Filters */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr' }, gap: 2 }}>
                        <TextField
                            placeholder="Search by name, email, or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search size={20} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <FormControl>
                            <InputLabel>Status</InputLabel>
                            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Status">
                                <MenuItem value="all">All Status</MenuItem>
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="inactive">Inactive</MenuItem>
                                <MenuItem value="suspended">Suspended</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel>Role</InputLabel>
                            <Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} label="Role">
                                <MenuItem value="all">All Roles</MenuItem>
                                <MenuItem value="Customer">Customer</MenuItem>
                                <MenuItem value="Premium Customer">Premium Customer</MenuItem>
                                <MenuItem value="Business">Business</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </CardContent>
            </Card>

            {/* Users Table */}
            <Card>
                <CardHeader
                    title={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6">All Users</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {filteredUsers.length} of {users.length} users
                            </Typography>
                        </Box>
                    }
                />
                <CardContent sx={{ p: 0 }}>
                    <TableContainer component={Paper} elevation={0}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>User</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Accounts</TableCell>
                                    <TableCell>Total Balance</TableCell>
                                    <TableCell>Last Login</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow key={user.id} hover>
                                        <TableCell>
                                            <Box>
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                    {user.name}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {user.email}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                                    {user.id}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{getRoleChip(user.role)}</TableCell>
                                        <TableCell>{getStatusChip(user.status)}</TableCell>
                                        <TableCell sx={{ fontWeight: 500 }}>{user.accounts}</TableCell>
                                        <TableCell sx={{ fontWeight: 500 }}>${user.balance.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Typography variant="body2" color="text.secondary">
                                                {user.lastLogin}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="text"
                                                size="small"
                                                onClick={(e) => handleMenuClick(e, user.id)}
                                            >
                                                <MoreHorizontal size={16} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {/* Add User Dialog */}
            <Dialog open={isAddUserOpen} onClose={() => setIsAddUserOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Add New User</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                        <TextField
                            label="Full Name"
                            value={newUser.name}
                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            type="email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            fullWidth
                        />
                        <FormControl fullWidth>
                            <InputLabel>Role</InputLabel>
                            <Select
                                value={newUser.role}
                                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                label="Role"
                            >
                                <MenuItem value="Customer">Customer</MenuItem>
                                <MenuItem value="Premium Customer">Premium Customer</MenuItem>
                                <MenuItem value="Business">Business</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={newUser.status}
                                onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                                label="Status"
                            >
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="inactive">Inactive</MenuItem>
                            </Select>
                        </FormControl>
                        <Button onClick={handleAddUser} variant="contained" fullWidth sx={{ mt: 2 }}>
                            Create User
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>

            {/* Actions Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleMenuClose}>
                    <Eye size={16} style={{ marginRight: 8 }} />
                    View Details
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <Edit size={16} style={{ marginRight: 8 }} />
                    Edit User
                </MenuItem>
                <MenuItem onClick={() => selectedUserId && handleToggleStatus(selectedUserId)}>
                    <UserCheck size={16} style={{ marginRight: 8 }} />
                    Toggle Status
                </MenuItem>
                <MenuItem
                    onClick={() => selectedUserId && handleDeleteUser(selectedUserId)}
                    sx={{ color: 'error.main' }}
                >
                    <Trash2 size={16} style={{ marginRight: 8 }} />
                    Delete User
                </MenuItem>
            </Menu>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Users;