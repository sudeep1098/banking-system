import React from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Chip,
    Grid
} from '@mui/material';
import {
    Users,
    CreditCard,
    Coins,
    TrendingUp,
    TrendingDown,
    Activity,
    AlertTriangle,
    CheckCircle,
    Clock,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

const Dashboard: React.FC = () => {
    const kpiData = [
        {
            title: "Total Users",
            value: "12,485",
            change: "+12.5%",
            trend: "up",
            icon: Users,
            color: "blue"
        },
        {
            title: "Active Accounts",
            value: "8,942",
            change: "+8.2%",
            trend: "up",
            icon: CreditCard,
            color: "green"
        },
        {
            title: "Total Transactions",
            value: "$2.4M",
            change: "-2.1%",
            trend: "down",
            icon: Coins,
            color: "purple"
        },
        {
            title: "Monthly Revenue",
            value: "$485K",
            change: "+15.3%",
            trend: "up",
            icon: DollarSign,
            color: "orange"
        }
    ];

    const recentTransactions = [
        { id: "TXN001", user: "John Doe", amount: "$2,450.00", type: "deposit", status: "completed", time: "2 min ago" },
        { id: "TXN002", user: "Jane Smith", amount: "$890.50", type: "withdrawal", status: "pending", time: "5 min ago" },
        { id: "TXN003", user: "Bob Johnson", amount: "$3,200.00", type: "transfer", status: "completed", time: "10 min ago" },
        { id: "TXN004", user: "Alice Brown", amount: "$1,150.75", type: "deposit", status: "failed", time: "15 min ago" },
        { id: "TXN005", user: "Charlie Wilson", amount: "$670.25", type: "withdrawal", status: "completed", time: "22 min ago" }
    ];

    const systemAlerts = [
        { id: 1, type: "warning", message: "High transaction volume detected", time: "5 min ago" },
        { id: 2, type: "info", message: "System maintenance scheduled for tonight", time: "1 hour ago" },
        { id: 3, type: "error", message: "Failed login attempts from IP 192.168.1.1", time: "2 hours ago" }
    ];

    const getColorClasses = (color: string) => {
        const colors = {
            blue: { background: 'linear-gradient(135deg, #2196f3, #1976d2)', color: 'white' },
            green: { background: 'linear-gradient(135deg, #4caf50, #388e3c)', color: 'white' },
            purple: { background: 'linear-gradient(135deg, #9c27b0, #7b1fa2)', color: 'white' },
            orange: { background: 'linear-gradient(135deg, #ff9800, #f57c00)', color: 'white' }
        };
        return colors[color as keyof typeof colors] || colors.blue;
    };

    const getStatusChip = (status: string) => {
        switch (status) {
            case 'completed':
                return <Chip label="✓ Completed" color="success" size="small" />;
            case 'pending':
                return <Chip label="⏳ Pending" color="warning" size="small" />;
            case 'failed':
                return <Chip label="✗ Failed" color="error" size="small" />;
            default:
                return <Chip label={status} variant="outlined" size="small" />;
        }
    };

    const getAlertIcon = (type: string) => {
        switch (type) {
            case 'warning':
                return <AlertTriangle size={16} color="#ed6c02" />;
            case 'error':
                return <AlertTriangle size={16} color="#d32f2f" />;
            case 'info':
                return <CheckCircle size={16} color="#0288d1" />;
            default:
                return <Activity size={16} color="#666" />;
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}>
                        Dashboard
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Welcome back! Here's what's happening with your bank today.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <Button variant="outlined" startIcon={<Activity size={16} />}>
                        Generate Report
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<TrendingUp size={16} />}
                        sx={{
                            background: 'linear-gradient(135deg, #1976d2, #1565c0)',
                            boxShadow: 2
                        }}
                    >
                        View Analytics
                    </Button>
                </Box>
            </Box>

            {/* KPI Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {kpiData.map((kpi, index) => {
                    const Icon = kpi.icon;
                    const colorStyle = getColorClasses(kpi.color);
                    return (
                        <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
                            <Card sx={{ height: '100%', '&:hover': { transform: 'scale(1.02)', transition: 'transform 0.2s' } }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                        <Box
                                            sx={{
                                                width: 48,
                                                height: 48,
                                                borderRadius: 1.5,
                                                background: colorStyle.background,
                                                color: colorStyle.color,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: 2
                                            }}
                                        >
                                            <Icon size={24} />
                                        </Box>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            color: kpi.trend === 'up' ? 'success.main' : 'error.main'
                                        }}>
                                            {kpi.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                {kpi.change}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                        {kpi.title}
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                                        {kpi.value}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            <Grid container spacing={3}>
                {/* Recent Transactions */}
                <Grid size={{ xs: 12, lg: 8 }}>
                    <Card>
                        <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Coins size={20} color="#1976d2" />
                                <Typography variant="h6">Recent Transactions</Typography>
                            </Box>
                            <Button variant="text" size="small" sx={{ color: '#1976d2' }}>
                                View All
                            </Button>
                        </Box>
                        <Box>
                            {recentTransactions.map((transaction, index) => (
                                <Box
                                    key={transaction.id}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: 2,
                                        borderBottom: index < recentTransactions.length - 1 ? '1px solid #f5f5f5' : 'none',
                                        '&:hover': { bgcolor: '#f9f9f9' }
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Box sx={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            bgcolor: transaction.type === 'deposit' ? '#e8f5e8' :
                                                transaction.type === 'withdrawal' ? '#ffeaea' : '#e3f2fd'
                                        }}>
                                            {transaction.type === 'deposit' ? <TrendingUp size={16} color="#4caf50" /> :
                                                transaction.type === 'withdrawal' ? <TrendingDown size={16} color="#f44336" /> :
                                                    <Coins size={16} color="#2196f3" />}
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                {transaction.user}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {transaction.id} • {transaction.time}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ textAlign: 'right' }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 600,
                                                color: transaction.type === 'deposit' ? 'success.main' : 'text.primary',
                                                mb: 0.5
                                            }}
                                        >
                                            {transaction.amount}
                                        </Typography>
                                        {getStatusChip(transaction.status)}
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Card>
                </Grid>

                {/* System Alerts */}
                <Grid size={{ xs: 12, lg: 4 }}>
                    <Card>
                        <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AlertTriangle size={20} color="#ed6c02" />
                            <Typography variant="h6">System Alerts</Typography>
                        </Box>
                        <CardContent>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {systemAlerts.map((alert) => (
                                    <Box
                                        key={alert.id}
                                        sx={{
                                            display: 'flex',
                                            gap: 1.5,
                                            p: 1.5,
                                            borderRadius: 1,
                                            bgcolor: '#f9f9f9',
                                            '&:hover': { bgcolor: '#f0f0f0' }
                                        }}
                                    >
                                        {getAlertIcon(alert.type)}
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                                                {alert.message}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <Clock size={12} color="#666" />
                                                <Typography variant="caption" color="text.secondary">
                                                    {alert.time}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                            <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                                View All Alerts
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Quick Actions */}
            <Card sx={{ mt: 3 }}>
                <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0' }}>
                    <Typography variant="h6">Quick Actions</Typography>
                </Box>
                <CardContent>
                    <Grid container spacing={2}>
                        {[
                            { icon: Users, label: 'Add User', color: '#2196f3' },
                            { icon: CreditCard, label: 'New Account', color: '#4caf50' },
                            { icon: Coins, label: 'Process Payment', color: '#9c27b0' },
                            { icon: Activity, label: 'Generate Report', color: '#ff9800' }
                        ].map((action, index) => {
                            const Icon = action.icon;
                            return (
                                <Grid size={{ xs: 6, md: 3 }} key={index}>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            height: 80,
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 1,
                                            '&:hover': {
                                                transform: 'scale(1.02)',
                                                borderColor: action.color,
                                                bgcolor: `${action.color}08`
                                            }
                                        }}
                                    >
                                        <Icon size={24} color={action.color} />
                                        <Typography variant="body2">{action.label}</Typography>
                                    </Button>
                                </Grid>
                            );
                        })}
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Dashboard;