import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Button,
    Box,
} from '@mui/material';

const transactions = [
    {
        id: 'TXN001',
        from: 'John Doe',
        to: 'Jane Smith',
        amount: 1250.00,
        status: 'completed',
        date: '2024-06-14 10:30 AM',
        type: 'Transfer'
    },
    {
        id: 'TXN002',
        from: 'Business Account',
        to: 'Payroll',
        amount: 15000.00,
        status: 'pending',
        date: '2024-06-14 09:15 AM',
        type: 'Payroll'
    },
    {
        id: 'TXN003',
        from: 'Savings Account',
        to: 'Checking Account',
        amount: 500.00,
        status: 'completed',
        date: '2024-06-14 08:45 AM',
        type: 'Internal'
    },
    {
        id: 'TXN004',
        from: 'External Bank',
        to: 'Customer Account',
        amount: 2750.00,
        status: 'failed',
        date: '2024-06-14 08:20 AM',
        type: 'Deposit'
    },
];

export const RecentTransactions: React.FC = () => {
    const getStatusChip = (status: string) => {
        switch (status) {
            case 'completed':
                return <Chip label="Completed" color="success" size="small" />;
            case 'pending':
                return <Chip label="Pending" color="warning" size="small" />;
            case 'failed':
                return <Chip label="Failed" color="error" size="small" />;
            default:
                return <Chip label={status} color="default" size="small" />;
        }
    };

    return (
        <Card>
            <CardContent>
                <Box className="flex items-center justify-between mb-4">
                    <Typography variant="h6" className="font-semibold">
                        Recent Transactions
                    </Typography>
                    <Button variant="outlined" size="small">
                        View All
                    </Button>
                </Box>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>From</TableCell>
                                <TableCell>To</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Type</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((transaction) => (
                                <TableRow key={transaction.id} hover>
                                    <TableCell className="font-medium">{transaction.id}</TableCell>
                                    <TableCell>{transaction.from}</TableCell>
                                    <TableCell>{transaction.to}</TableCell>
                                    <TableCell className="font-medium">
                                        ${transaction.amount.toLocaleString()}
                                    </TableCell>
                                    <TableCell>{getStatusChip(transaction.status)}</TableCell>
                                    <TableCell className="text-gray-600">{transaction.date}</TableCell>
                                    <TableCell>
                                        <Chip label={transaction.type} variant="outlined" size="small" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
};