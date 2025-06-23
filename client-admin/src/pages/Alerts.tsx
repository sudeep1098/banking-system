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
  Container,
  IconButton,
  Menu,
  MenuItem as MenuItemComponent,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Search,
  MoreVert,
  Warning,
  Error,
  CheckCircle,
  Schedule,
  Notifications,
  NotificationsActive,
  Security
} from '@mui/icons-material';

const initialAlerts = [
  {
    id: 'ALT001',
    title: 'Suspicious Login Activity',
    description: 'Multiple failed login attempts detected from IP 203.0.113.45',
    severity: 'high',
    category: 'Security',
    status: 'active',
    timestamp: '2024-06-14 10:30:15',
    affectedResource: 'User: bob.johnson@email.com',
    source: 'Authentication System'
  },
  {
    id: 'ALT002',
    title: 'Large Transaction Alert',
    description: 'Transaction exceeding $10,000 limit requires approval',
    severity: 'medium',
    category: 'Transaction',
    status: 'pending_review',
    timestamp: '2024-06-14 09:15:42',
    affectedResource: 'Transaction: TRF-003-2024',
    source: 'Transaction Monitor'
  },
  {
    id: 'ALT003',
    title: 'Database Backup Failed',
    description: 'Automated backup process failed due to insufficient storage space',
    severity: 'high',
    category: 'System',
    status: 'active',
    timestamp: '2024-06-13 23:00:12',
    affectedResource: 'Database Server',
    source: 'Backup Service'
  },
  {
    id: 'ALT004',
    title: 'Account Frozen',
    description: 'Customer account automatically frozen due to suspicious activity pattern',
    severity: 'medium',
    category: 'Account',
    status: 'resolved',
    timestamp: '2024-06-13 16:45:33',
    affectedResource: 'Account: ****9012',
    source: 'Fraud Detection'
  },
  {
    id: 'ALT005',
    title: 'System Performance Warning',
    description: 'CPU usage exceeded 90% threshold for 15 minutes',
    severity: 'low',
    category: 'Performance',
    status: 'acknowledged',
    timestamp: '2024-06-13 14:20:18',
    affectedResource: 'Application Server',
    source: 'Monitoring System'
  },
  {
    id: 'ALT006',
    title: 'Compliance Alert',
    description: 'Regulatory reporting deadline approaching in 48 hours',
    severity: 'medium',
    category: 'Compliance',
    status: 'active',
    timestamp: '2024-06-13 08:00:00',
    affectedResource: 'Monthly Report Q2-2024',
    source: 'Compliance System'
  },
];

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.affectedResource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    const matchesCategory = categoryFilter === 'all' || alert.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;

    return matchesSearch && matchesSeverity && matchesCategory && matchesStatus;
  });

  const handleAcknowledge = (alertId: string) => {
    setAlerts(alerts.map(alert =>
      alert.id === alertId
        ? { ...alert, status: 'acknowledged' }
        : alert
    ));
    setMenuAnchor(null);
    setSnackbar({
      open: true,
      message: "Alert acknowledged successfully",
      severity: "success"
    });
  };

  const handleResolve = (alertId: string) => {
    setAlerts(alerts.map(alert =>
      alert.id === alertId
        ? { ...alert, status: 'resolved' }
        : alert
    ));
    setMenuAnchor(null);
    setSnackbar({
      open: true,
      message: "Alert resolved successfully",
      severity: "success"
    });
  };

  const getSeverityChip = (severity: string) => {
    const severityConfig = {
      high: { color: 'error' as const, label: 'High' },
      medium: { color: 'warning' as const, label: 'Medium' },
      low: { color: 'info' as const, label: 'Low' }
    };
    const config = severityConfig[severity as keyof typeof severityConfig] || { color: 'default' as const, label: severity };
    return <Chip label={config.label} color={config.color} size="small" />;
  };

  const getStatusChip = (status: string) => {
    const statusConfig = {
      active: { color: 'error' as const, label: 'Active' },
      pending_review: { color: 'warning' as const, label: 'Pending Review' },
      acknowledged: { color: 'info' as const, label: 'Acknowledged' },
      resolved: { color: 'success' as const, label: 'Resolved' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || { color: 'default' as const, label: status };
    return <Chip label={config.label} color={config.color} size="small" />;
  };

  const getSeverityIcon = (severity: string) => {
    const iconProps = { fontSize: 'small' as const };
    switch (severity) {
      case 'high':
        return <Error {...iconProps} color="error" />;
      case 'medium':
        return <Warning {...iconProps} color="warning" />;
      case 'low':
        return <CheckCircle {...iconProps} color="info" />;
      default:
        return <Schedule {...iconProps} />;
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, alertId: string) => {
    setMenuAnchor(event.currentTarget);
    setSelectedAlert(alertId);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedAlert(null);
  };

  const activeAlerts = filteredAlerts.filter(alert => alert.status === 'active');
  const pendingAlerts = filteredAlerts.filter(alert => alert.status === 'pending_review');
  const highSeverityAlerts = filteredAlerts.filter(alert => alert.severity === 'high');

  return (
    <Container maxWidth={false} sx={{ py: 3, pl: 0 }}>
      <Box className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: '#1a1a1a', mb: 1 }}>
              System Alerts
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Monitor and manage system alerts and notifications
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<NotificationsActive />}
            sx={{
              boxShadow: 2,
              '&:hover': { transform: 'scale(1.05)', transition: 'transform 0.2s' }
            }}
          >
            Alert Settings
          </Button>
        </Box>

        {/* Summary Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 3 }}>
          <Card sx={{ '&:hover': { transform: 'scale(1.05)', transition: 'transform 0.2s' } }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Total Alerts
                </Typography>
                <Typography variant="h4" component="p" sx={{ fontWeight: 'bold' }}>
                  {filteredAlerts.length}
                </Typography>
              </Box>
              <Notifications style={{ fontSize: 32, color: '#2196f3' }} />
            </CardContent>
          </Card>
          <Card sx={{ '&:hover': { transform: 'scale(1.05)', transition: 'transform 0.2s' } }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Active Alerts
                </Typography>
                <Typography variant="h4" component="p" sx={{ fontWeight: 'bold', color: '#f44336' }}>
                  {activeAlerts.length}
                </Typography>
              </Box>
              <Error style={{ fontSize: 32, color: '#f44336' }} />
            </CardContent>
          </Card>
          <Card sx={{ '&:hover': { transform: 'scale(1.05)', transition: 'transform 0.2s' } }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Pending Review
                </Typography>
                <Typography variant="h4" component="p" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
                  {pendingAlerts.length}
                </Typography>
              </Box>
              <Schedule style={{ fontSize: 32, color: '#ff9800' }} />
            </CardContent>
          </Card>
          <Card sx={{ '&:hover': { transform: 'scale(1.05)', transition: 'transform 0.2s' } }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  High Severity
                </Typography>
                <Typography variant="h4" component="p" sx={{ fontWeight: 'bold', color: '#f44336' }}>
                  {highSeverityAlerts.length}
                </Typography>
              </Box>
              <Security style={{ fontSize: 32, color: '#f44336' }} />
            </CardContent>
          </Card>
        </Box>

        {/* Search and Filters */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr 1fr' }, gap: 2, alignItems: 'end' }}>
              <TextField
                fullWidth
                label="Search Alerts"
                placeholder="Search by title, description, or resource..."
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
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} label="Category">
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="Security">Security</MenuItem>
                  <MenuItem value="Transaction">Transaction</MenuItem>
                  <MenuItem value="System">System</MenuItem>
                  <MenuItem value="Account">Account</MenuItem>
                  <MenuItem value="Performance">Performance</MenuItem>
                  <MenuItem value="Compliance">Compliance</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Status">
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="pending_review">Pending Review</MenuItem>
                  <MenuItem value="acknowledged">Acknowledged</MenuItem>
                  <MenuItem value="resolved">Resolved</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </CardContent>
        </Card>

        {/* Alerts Table */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2">System Alerts</Typography>
              <Typography variant="body2" color="text.secondary">
                {filteredAlerts.length} of {alerts.length} alerts
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Alert</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Severity</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Affected Resource</TableCell>
                    <TableCell>Timestamp</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAlerts.map((alert) => (
                    <TableRow
                      key={alert.id}
                      sx={{ '&:hover': { backgroundColor: '#f5f5f5' }, transition: 'background-color 0.2s' }}
                    >
                      <TableCell>
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            {getSeverityIcon(alert.severity)}
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {alert.title}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {alert.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Source: {alert.source}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={alert.category} variant="outlined" size="small" />
                      </TableCell>
                      <TableCell>{getSeverityChip(alert.severity)}</TableCell>
                      <TableCell>{getStatusChip(alert.status)}</TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {alert.affectedResource}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                          {alert.timestamp}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={(e) => handleMenuClick(e, alert.id)}>
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
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          {selectedAlert && alerts.find(a => a.id === selectedAlert)?.status === 'active' && (
            <MenuItemComponent onClick={() => selectedAlert && handleAcknowledge(selectedAlert)}>
              <CheckCircle sx={{ mr: 1 }} />
              Acknowledge
            </MenuItemComponent>
          )}
          {selectedAlert && ['active', 'acknowledged'].includes(alerts.find(a => a.id === selectedAlert)?.status || '') && (
            <MenuItemComponent onClick={() => selectedAlert && handleResolve(selectedAlert)}>
              <Error sx={{ mr: 1 }} />
              Resolve
            </MenuItemComponent>
          )}
          <MenuItemComponent onClick={handleMenuClose}>
            <Warning sx={{ mr: 1 }} />
            View Details
          </MenuItemComponent>
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
    </Container>
  );
};

export default Alerts;