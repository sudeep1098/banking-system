import { Card, CardContent, Button, Typography, Box, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { CreditCard } from "lucide-react";

interface Transaction {
    id: string;
    description: string;
    amount: number;
    date: string;
    type: 'credit' | 'debit';
}

interface RecentTransactionsProps {
    transactions: Transaction[];
}

const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
    return (
        <Card sx={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
            <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        Recent Transactions
                    </Typography>
                    <Button component={Link} to="/transactions" variant="outlined" size="small">
                        View All
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {transactions.map((transaction) => (
                        <Paper
                            key={transaction.id}
                            sx={{
                                p: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: '#f5f5f5'
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
                                    backgroundColor: transaction.type === 'credit' ? '#e8f5e8' : '#ffeaea'
                                }}>
                                    <CreditCard
                                        size={20}
                                        color={transaction.type === 'credit' ? '#4caf50' : '#f44336'}
                                    />
                                </Box>
                                <Box>
                                    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                        {transaction.description}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#666' }}>
                                        {transaction.date}
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 'bold',
                                    color: transaction.type === 'credit' ? '#4caf50' : '#f44336'
                                }}
                            >
                                {transaction.type === 'credit' ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                            </Typography>
                        </Paper>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default RecentTransactions;