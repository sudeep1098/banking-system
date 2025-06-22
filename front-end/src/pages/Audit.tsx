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
  Security,
  Person,
  AccountBalance,
  TrendingUp
} from '@mui/icons-material';

const initialAuditLogs = [
  {
    id: 'AUD001',
    timestamp: '2024-06-14 10:30:15',
    userId: 'admin@bankpro.com',
    action: 'User Login',
    resource: 'Authentication System',
    details: 'Successful admin login from IP 192.168.1.100',
    severity: 'info',
    category: 'Authentication'
  },
  {
    id: 'AUD002',
    timestamp: '2024-06-14 10:25:42',
    userId: 'manager@bankpro.com',
    action: 'Account Created',
    resource: 'Account ACC005',
    details: 'New checking account created for customer John Smith',
    severity: 'info',
    category: 'Account Management'
  },
  {
    id: 'AUD003',
    timestamp: '2024-06-14 09:15:33',
    userId: 'system',
    action: 'Transaction Approved',
    resource: 'Transaction TXN006',
    details: 'Large transaction of $15,000 auto-approved by system',
    severity: 'warning',
    category: 'Transaction'
  },
  {
    id: 'AUD004',
    timestamp: '2024-06-13 16:45:18',
    userId: 'auditor@bankpro.com',
    action: 'Report Generated',
    resource: 'Compliance Report',
    details: 'Monthly compliance report generated and submitted',
    severity: 'info',
    category: 'Compliance'
  },
  {
    id: 'AUD005',
    timestamp: '2024-06-13 14:20:55',
    userId: 'unknown',
    action: 'Failed Login Attempt',
    resource: 'Authentication System',
    details: 'Multiple failed login attempts from IP 203.0.113.45',
    severity: 'error',
    category: 'Security'
  },
  {
    id: 'AUD006',
    timestamp: '2024-06-13 11:30:22',
    userId: 'admin@bankpro.com',
    action: 'Role Modified',
    resource: 'Role ROLE002',
    details: 'Account Manager role permissions updated',
    severity: 'warning',
    category: 'Role Management'
  },
];

const Audit: React.FC = () => {
  const [auditLogs] = useState(initialAuditLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
    const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;

    let matchesDate = true;
    if (dateFilter !== 'all') {
      const logDate = new Date(log.timestamp);
      const today = new Date();
      const daysDiff = Math.floor((today.getTime() - logDate.getTime()) / (1000 * 3600 * 24));

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

    return matchesSearch && matchesSeverity && matchesCategory && matchesDate;
  });

  const getSeverityChip = (severity: string) => {
    const severityConfig = {
      info: { color: 'info' as const, label: 'Info' },
      warning: { color: 'warning' as const, label: 'Warning' },
      error: { color: 'error' as const, label: 'Error' },
      success: { color: 'success' as const, label: 'Success' }
    };
    const config = severityConfig[severity as keyof typeof severityConfig] || { color: 'default' as const, label: severity };
    return <Chip label={config.label} color={config.color} size="small" />;
  };

  const infoLogs = filteredLogs.filter(log => log.severity === 'info');
  const warningLogs = filteredLogs.filter(log => log.severity === 'warning');
  const errorLogs = filteredLogs.filter(log => log.severity === 'error');

  return (
    <Container maxWidth={false} sx={{ py: 3, pl: 0 }}>
      <Box className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: '#1a1a1a', mb: 1 }}>
              Audit Logs
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Track and monitor all system activities and user actions
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
            Export Logs
          </Button>
        </Box>

        {/* Summary Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '4fr' }, gap: 3 }}>
          <Card sx={{ '&:hover': { transform: 'scale(1.05)', transition: 'transform 0.2s' } }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Total Logs
                </Typography>
                <Typography variant="h4" component="p" sx={{ fontWeight: 'bold' }}>
                  {filteredLogs.length}
                </Typography>
              </Box>
              <Security style={{ fontSize: 32, color: '#2196f3' }} />
            </CardContent>
          </Card>
          <Card sx={{ '&:hover': { transform: 'scale(1.05)', transition: 'transform 0.2s' } }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Info Events
                </Typography>
                <Typography variant="h4" component="p" sx={{ fontWeight: 'bold', color: '#2196f3' }}>
                  {infoLogs.length}
                </Typography>
              </Box>
              <Person style={{ fontSize: 32, color: '#2196f3' }} />
            </CardContent>
          </Card>
          <Card sx={{ '&:hover': { transform: 'scale(1.05)', transition: 'transform 0.2s' } }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Warnings
                </Typography>
                <Typography variant="h4" component="p" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
                  {warningLogs.length}
                </Typography>
              </Box>
              <AccountBalance style={{ fontSize: 32, color: '#ff9800' }} />
            </CardContent>
          </Card>
          <Card sx={{ '&:hover': { transform: 'scale(1.05)', transition: 'transform 0.2s' } }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Errors
                </Typography>
                <Typography variant="h4" component="p" sx={{ fontWeight: 'bold', color: '#f44336' }}>
                  {errorLogs.length}
                </Typography>
              </Box>
              <TrendingUp style={{ fontSize: 32, color: '#f44336' }} />
            </CardContent>
          </Card>
        </Box>

        {/* Search and Filters */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr 1fr' }, gap: 2, alignItems: 'end' }}>
              <TextField
                fullWidth
                label="Search Audit Logs"
                placeholder="Search by action, user, resource, or details..."
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
                <InputLabel>Severity</InputLabel>
                <Select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)} label="Severity">
                  <MenuItem value="all">All Severity</MenuItem>
                  <MenuItem value="info">Info</MenuItem>
                  <MenuItem value="warning">Warning</MenuItem>
                  <MenuItem value="error">Error</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} label="Category">
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="Authentication">Authentication</MenuItem>
                  <MenuItem value="Account Management">Account Management</MenuItem>
                  <MenuItem value="Transaction">Transaction</MenuItem>
                  <MenuItem value="Security">Security</MenuItem>
                  <MenuItem value="Compliance">Compliance</MenuItem>
                  <MenuItem value="Role Management">Role Management</MenuItem>
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

        {/* Audit Logs Table */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2">System Audit Logs</Typography>
              <Typography variant="body2" color="text.secondary">
                {filteredLogs.length} of {auditLogs.length} logs
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Resource</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Severity</TableCell>
                    <TableCell>Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow
                      key={log.id}
                      sx={{ '&:hover': { backgroundColor: '#f5f5f5' }, transition: 'background-color 0.2s' }}
                    >
                      <TableCell>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {log.timestamp}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {log.userId}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {log.action}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {log.resource}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={log.category} variant="outlined" size="small" />
                      </TableCell>
                      <TableCell>{getSeverityChip(log.severity)}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            maxWidth: 300,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {log.details}
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

export default Audit;