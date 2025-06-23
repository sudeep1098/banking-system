import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Container
} from '@mui/material';
import {
  Search,
  Download,
  TrendingUp,
  TrendingDown,
  CreditCard,
  DollarSign
} from 'lucide-react';

const initialTransactions = [
  {
    id: 'TXN001',
    accountNumber: '****1234',
    customerName: 'John Doe',
    type: 'deposit',
    amount: 1500.00,
    description: 'Salary deposit',
    date: '2024-06-14 10:30 AM',
    status: 'completed',
    reference: 'DEP-001-2024'
  },
  {
    id: 'TXN002',
    accountNumber: '****5678',
    customerName: 'Jane Smith',
    type: 'withdrawal',
    amount: 250.00,
    description: 'ATM Withdrawal',
    date: '2024-06-14 09:15 AM',
    status: 'completed',
    reference: 'WTH-002-2024'
  },
  {
    id: 'TXN003',
    accountNumber: '****9012',
    customerName: 'Bob Johnson',
    type: 'transfer',
    amount: 5000.00,
    description: 'Business transfer to vendor',
    date: '2024-06-13 14:20 PM',
    status: 'pending',
    reference: 'TRF-003-2024'
  },
  {
    id: 'TXN004',
    accountNumber: '****3456',
    customerName: 'Alice Brown',
    type: 'payment',
    amount: 89.99,
    description: 'Online purchase - Amazon',
    date: '2024-06-13 11:45 AM',
    status: 'completed',
    reference: 'PAY-004-2024'
  },
  {
    id: 'TXN005',
    accountNumber: '****1234',
    customerName: 'John Doe',
    type: 'withdrawal',
    amount: 100.00,
    description: 'ATM Withdrawal',
    date: '2024-06-12 16:30 PM',
    status: 'failed',
    reference: 'WTH-005-2024'
  },
];

const Transactions: React.FC = () => {
  const [transactions] = useState(initialTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.accountNumber.includes(searchTerm) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;

    let matchesDate = true;
    if (dateFilter !== 'all') {
      const transactionDate = new Date(transaction.date);
      const today = new Date();
      const daysDiff = Math.floor((today.getTime() - transactionDate.getTime()) / (1000 * 3600 * 24));

      switch (dateFilter) {
        case 'today':
          matchesDate = daysDiff === 0;
          break;
        case 'week':
          matchesDate = daysDiff <= 7;
          break;
        case 'month':
          matchesDate = daysDiff <= 30;
          break;
      }
    }

    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  const getStatusChip = (status: string) => {
    const statusConfig = {
      completed: { color: 'success' as const, label: 'Completed' },
      pending: { color: 'warning' as const, label: 'Pending' },
      failed: { color: 'error' as const, label: 'Failed' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || { color: 'default' as const, label: status };
    return <Chip label={config.label} color={config.color} size="small" />;
  };

  const getTypeIcon = (type: string) => {
    const iconProps = { fontSize: 'small' as const };
    switch (type) {
      case 'deposit':
        return <TrendingUp {...iconProps} style={{ color: '#4caf50' }} />;
      case 'withdrawal':
        return <TrendingDown {...iconProps} style={{ color: '#f44336' }} />;
      case 'transfer':
        return <CreditCard {...iconProps} style={{ color: '#2196f3' }} />;
      case 'payment':
        return <DollarSign {...iconProps} style={{ color: '#9c27b0' }} />;
      default:
        return <DollarSign {...iconProps} style={{ color: '#666' }} />;
    }
  };

  const totalAmount = filteredTransactions.reduce((sum, txn) => sum + txn.amount, 0);
  const completedTransactions = filteredTransactions.filter(txn => txn.status === 'completed');
  const pendingTransactions = filteredTransactions.filter(txn => txn.status === 'pending');

  return (
    <Container maxWidth={false} sx={{ py: 3, pl: 0 }}>
      <Box className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: '#1a1a1a', mb: 1 }}>
              Transaction Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Monitor and manage all financial transactions
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<Download />}
            sx={{
              boxShadow: 2,
              '&:hover': { transform: 'scale(1.05)', transition: 'transform 0.2s' }
            }}
          >
            Export Transactions
          </Button>
        </Box>

        {/* Summary Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 3 }}>
          <Card sx={{ '&:hover': { transform: 'scale(1.05)', transition: 'transform 0.2s' } }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Total Transactions
                </Typography>
                <Typography variant="h4" component="p" sx={{ fontWeight: 'bold' }}>
                  {filteredTransactions.length}
                </Typography>
              </Box>
              <CreditCard style={{ fontSize: 32, color: '#2196f3' }} />
            </CardContent>
          </Card>
          <Card sx={{ '&:hover': { transform: 'scale(1.05)', transition: 'transform 0.2s' } }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Total Volume
                </Typography>
                <Typography variant="h4" component="p" sx={{ fontWeight: 'bold' }}>
                  ${totalAmount.toLocaleString()}
                </Typography>
              </Box>
              <DollarSign style={{ fontSize: 32, color: '#4caf50' }} />
            </CardContent>
          </Card>
          <Card sx={{ '&:hover': { transform: 'scale(1.05)', transition: 'transform 0.2s' } }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Completed
                </Typography>
                <Typography variant="h4" component="p" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                  {completedTransactions.length}
                </Typography>
              </Box>
              <TrendingUp style={{ fontSize: 32, color: '#4caf50' }} />
            </CardContent>
          </Card>
          <Card sx={{ '&:hover': { transform: 'scale(1.05)', transition: 'transform 0.2s' } }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Pending
                </Typography>
                <Typography variant="h4" component="p" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
                  {pendingTransactions.length}
                </Typography>
              </Box>
              <TrendingUp style={{ fontSize: 32, color: '#ff9800' }} />
            </CardContent>
          </Card>
        </Box>

        {/* Search and Filters */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr 1fr' }, gap: 2, alignItems: 'end' }}>
              <TextField
                fullWidth
                label="Search Transactions"
                placeholder="Search by customer, account, reference, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search style={{ color: '#666', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Status">
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="failed">Failed</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} label="Type">
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="deposit">Deposit</MenuItem>
                  <MenuItem value="withdrawal">Withdrawal</MenuItem>
                  <MenuItem value="transfer">Transfer</MenuItem>
                  <MenuItem value="payment">Payment</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Date Range</InputLabel>
                <Select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} label="Date Range">
                  <MenuItem value="all">All Time</MenuItem>
                  <MenuItem value="today">Today</MenuItem>
                  <MenuItem value="week">This Week</MenuItem>
                  <MenuItem value="month">This Month</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2">All Transactions</Typography>
              <Typography variant="body2" color="text.secondary">
                {filteredTransactions.length} of {transactions.length} transactions
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Transaction</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow
                      key={transaction.id}
                      sx={{ '&:hover': { backgroundColor: '#f5f5f5' }, transition: 'background-color 0.2s' }}
                    >
                      <TableCell>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {transaction.reference}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {transaction.id}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {transaction.customerName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {transaction.accountNumber}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getTypeIcon(transaction.type)}
                          <Chip
                            label={transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            color: transaction.type === 'deposit' ? '#4caf50' : '#f44336'
                          }}
                        >
                          {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>{getStatusChip(transaction.status)}</TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                          {transaction.date}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            maxWidth: 200,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {transaction.description}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Transactions;