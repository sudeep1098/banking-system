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
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye, CreditCard, Lock, Unlock } from 'lucide-react';

const initialAccounts = [
    {
        id: 'ACC001',
        accountNumber: '****1234',
        customerName: 'John Doe',
        accountType: 'Checking',
        balance: 15420.50,
        status: 'active',
        openDate: '2023-01-15',
        lastTransaction: '2024-06-14'
    },
    {
        id: 'ACC002',
        accountNumber: '****5678',
        customerName: 'Jane Smith',
        accountType: 'Savings',
        balance: 45890.75,
        status: 'active',
        openDate: '2022-08-22',
        lastTransaction: '2024-06-13'
    },
    {
        id: 'ACC003',
        accountNumber: '****9012',
        customerName: 'Bob Johnson',
        accountType: 'Business',
        balance: 125000.00,
        status: 'frozen',
        openDate: '2023-03-10',
        lastTransaction: '2024-06-10'
    },
    {
        id: 'ACC004',
        accountNumber: '****3456',
        customerName: 'Alice Brown',
        accountType: 'Credit',
        balance: -2150.00,
        status: 'active',
        openDate: '2023-11-05',
        lastTransaction: '2024-06-14'
    },
];

const Accounts: React.FC = () => {
    const [accounts, setAccounts] = useState(initialAccounts);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);
    const [newAccount, setNewAccount] = useState({
        customerName: '',
        accountType: 'Checking',
        initialBalance: '',
        status: 'active'
    });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

    const filteredAccounts = accounts.filter(account => {
        const matchesSearch = account.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            account.accountNumber.includes(searchTerm) ||
            account.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || account.status === statusFilter;
        const matchesType = typeFilter === 'all' || account.accountType === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
    });

    const handleAddAccount = () => {
        if (!newAccount.customerName || !newAccount.initialBalance) {
            setSnackbar({
                open: true,
                message: "Please fill in all required fields",
                severity: "error"
            });
            return;
        }

        const account = {
            id: `ACC${String(accounts.length + 1).padStart(3, '0')}`,
            accountNumber: `****${Math.floor(1000 + Math.random() * 9000)}`,
            customerName: newAccount.customerName,
            accountType: newAccount.accountType,
            balance: parseFloat(newAccount.initialBalance),
            status: newAccount.status,
            openDate: new Date().toISOString().split('T')[0],
            lastTransaction: 'Never'
        };

        setAccounts([...accounts, account]);
        setNewAccount({ customerName: '', accountType: 'Checking', initialBalance: '', status: 'active' });
        setIsAddAccountOpen(false);

        setSnackbar({
            open: true,
            message: "Account created successfully",
            severity: "success"
        });
    };

    const handleToggleStatus = (accountId: string) => {
        setAccounts(accounts.map(account =>
            account.id === accountId
                ? { ...account, status: account.status === 'active' ? 'frozen' : 'active' }
                : account
        ));
        setSnackbar({
            open: true,
            message: "Account status updated successfully",
            severity: "success"
        });
        setAnchorEl(null);
    };

    const handleDeleteAccount = (accountId: string) => {
        setAccounts(accounts.filter(account => account.id !== accountId));
        setSnackbar({
            open: true,
            message: "Account deleted successfully",
            severity: "success"
        });
        setAnchorEl(null);
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, accountId: string) => {
        setAnchorEl(event.currentTarget);
        setSelectedAccountId(accountId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedAccountId(null);
    };

    const getStatusChip = (status: string) => {
        switch (status) {
            case 'active':
                return <Chip label="Active" color="success" size="small" />;
            case 'frozen':
                return <Chip label="Frozen" color="error" size="small" />;
            case 'closed':
                return <Chip label="Closed" color="default" size="small" />;
            default:
                return <Chip label={status} variant="outlined" size="small" />;
        }
    };

    const getTypeBadge = (type: string) => {
        const colorMap = {
            'Checking': 'primary',
            'Savings': 'success',
            'Business': 'secondary',
            'Credit': 'warning'
        } as const;

        return <Chip label={type} color={colorMap[type as keyof typeof colorMap] || 'default'} size="small" />;
    };

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}>
                        Account Management
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage customer accounts and balances
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<Plus size={16} />}
                    onClick={() => setIsAddAccountOpen(true)}
                    sx={{ boxShadow: 2 }}
                >
                    Create Account
                </Button>
            </Box>

            {/* Summary Cards */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
                <Card sx={{ '&:hover': { transform: 'scale(1.02)', transition: 'transform 0.2s' } }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                    Total Accounts
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                    {accounts.length}
                                </Typography>
                            </Box>
                            <CreditCard size={32} color="#2196f3" />
                        </Box>
                    </CardContent>
                </Card>
                <Card sx={{ '&:hover': { transform: 'scale(1.02)', transition: 'transform 0.2s' } }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                    Active Accounts
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                                    {accounts.filter(a => a.status === 'active').length}
                                </Typography>
                            </Box>
                            <Unlock size={32} color="#4caf50" />
                        </Box>
                    </CardContent>
                </Card>
                <Card sx={{ '&:hover': { transform: 'scale(1.02)', transition: 'transform 0.2s' } }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                    Frozen Accounts
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'error.main' }}>
                                    {accounts.filter(a => a.status === 'frozen').length}
                                </Typography>
                            </Box>
                            <Lock size={32} color="#f44336" />
                        </Box>
                    </CardContent>
                </Card>
                <Card sx={{ '&:hover': { transform: 'scale(1.02)', transition: 'transform 0.2s' } }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                    Total Balance
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                    ${accounts.reduce((sum, acc) => sum + acc.balance, 0).toLocaleString()}
                                </Typography>
                            </Box>
                            <CreditCard size={32} color="#9c27b0" />
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            {/* Search and Filters */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr' }, gap: 2 }}>
                        <TextField
                            placeholder="Search by customer, account number, or ID..."
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
                                <MenuItem value="frozen">Frozen</MenuItem>
                                <MenuItem value="closed">Closed</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel>Account Type</InputLabel>
                            <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} label="Account Type">
                                <MenuItem value="all">All Types</MenuItem>
                                <MenuItem value="Checking">Checking</MenuItem>
                                <MenuItem value="Savings">Savings</MenuItem>
                                <MenuItem value="Business">Business</MenuItem>
                                <MenuItem value="Credit">Credit</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </CardContent>
            </Card>

            {/* Accounts Table */}
            <Card>
                <CardHeader
                    title={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6">All Accounts</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {filteredAccounts.length} of {accounts.length} accounts
                            </Typography>
                        </Box>
                    }
                />
                <CardContent sx={{ p: 0 }}>
                    <TableContainer component={Paper} elevation={0}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Account</TableCell>
                                    <TableCell>Customer</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Balance</TableCell>
                                    <TableCell>Open Date</TableCell>
                                    <TableCell>Last Transaction</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredAccounts.map((account) => (
                                    <TableRow key={account.id} hover>
                                        <TableCell>
                                            <Box>
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                    {account.accountNumber}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {account.id}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 500 }}>{account.customerName}</TableCell>
                                        <TableCell>{getTypeBadge(account.accountType)}</TableCell>
                                        <TableCell>{getStatusChip(account.status)}</TableCell>
                                        <TableCell sx={{
                                            fontWeight: 500,
                                            color: account.balance < 0 ? 'error.main' : 'success.main'
                                        }}>
                                            ${account.balance.toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" color="text.secondary">
                                                {account.openDate}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" color="text.secondary">
                                                {account.lastTransaction}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="text"
                                                size="small"
                                                onClick={(e) => handleMenuClick(e, account.id)}
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

            {/* Add Account Dialog */}
            <Dialog open={isAddAccountOpen} onClose={() => setIsAddAccountOpen(false)} maxWidth="sm" fullWidth closeAfterTransition={false} >
                <DialogTitle>Create New Account</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                        <TextField
                            label="Customer Name"
                            value={newAccount.customerName}
                            onChange={(e) => setNewAccount({ ...newAccount, customerName: e.target.value })}
                            fullWidth
                        />
                        <FormControl fullWidth>
                            <InputLabel>Account Type</InputLabel>
                            <Select
                                value={newAccount.accountType}
                                onChange={(e) => setNewAccount({ ...newAccount, accountType: e.target.value })}
                                label="Account Type"
                            >
                                <MenuItem value="Checking">Checking</MenuItem>
                                <MenuItem value="Savings">Savings</MenuItem>
                                <MenuItem value="Business">Business</MenuItem>
                                <MenuItem value="Credit">Credit</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Initial Balance"
                            type="number"
                            value={newAccount.initialBalance}
                            onChange={(e) => setNewAccount({ ...newAccount, initialBalance: e.target.value })}
                            fullWidth
                        />
                        <Button onClick={handleAddAccount} variant="contained" fullWidth sx={{ mt: 2 }}>
                            Create Account
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
                    Edit Account
                </MenuItem>
                <MenuItem onClick={() => selectedAccountId && handleToggleStatus(selectedAccountId)}>
                    <Lock size={16} style={{ marginRight: 8 }} />
                    Toggle Status
                </MenuItem>
                <MenuItem
                    onClick={() => selectedAccountId && handleDeleteAccount(selectedAccountId)}
                    sx={{ color: 'error.main' }}
                >
                    <Trash2 size={16} style={{ marginRight: 8 }} />
                    Delete Account
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

export default Accounts;