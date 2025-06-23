import { useState } from "react";
import { Card, CardContent, Button, TextField, Typography, Box, Container, Paper, Tab, Tabs } from "@mui/material";
import { useAuthContext } from "@/context/auth/AuthContext";
import { Link } from "react-router-dom";
import { useToastContext } from "@/context/toast/ToastContext";
import { Banknote, CreditCard, FileText, User } from "lucide-react";
import NavigationHeader from "@/components/common/NavigationHeader";

const Transactions = () => {
    const { user, logout } = useAuthContext();
    const [activeTab, setActiveTab] = useState(0);
    const [sendForm, setSendForm] = useState({
        recipient: "",
        amount: "",
        description: "",
    });
    const [loading, setLoading] = useState(false);
    const { toast } = useToastContext();

    const handleSendMoney = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate transaction
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast('success', `$${sendForm.amount} sent to ${sendForm.recipient}`);
        setSendForm({ recipient: "", amount: "", description: "" });
        setLoading(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSendForm({
            ...sendForm,
            [e.target.name]: e.target.value,
        });
    };

    const transactionHistory = [
        { id: "1", description: "Online Purchase - Amazon", amount: -89.99, date: "2024-06-22", status: "completed", type: "debit" },
        { id: "2", description: "Salary Deposit", amount: 3500.00, date: "2024-06-21", status: "completed", type: "credit" },
        { id: "3", description: "ATM Withdrawal", amount: -200.00, date: "2024-06-20", status: "completed", type: "debit" },
        { id: "4", description: "Transfer from John", amount: 150.00, date: "2024-06-19", status: "completed", type: "credit" },
        { id: "5", description: "Subscription - Netflix", amount: -15.99, date: "2024-06-18", status: "completed", type: "debit" },
        { id: "6", description: "Freelance Payment", amount: 750.00, date: "2024-06-17", status: "completed", type: "credit" },
        { id: "7", description: "Grocery Shopping", amount: -125.67, date: "2024-06-16", status: "completed", type: "debit" },
        { id: "8", description: "Transfer to Sarah", amount: -300.00, date: "2024-06-15", status: "completed", type: "debit" },
    ];

    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' }}>
            {/* Header */}
            <NavigationHeader currentPage="Transactions" />

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    gap: 4
                }}>
                    {/* Transaction Actions */}
                    <Box sx={{ flex: { lg: 1 } }}>
                        <Card sx={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                            mb: 3
                        }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                                    Send Money
                                </Typography>

                                <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
                                    <Tab label="Send" />
                                    <Tab label="Request" />
                                </Tabs>

                                {activeTab === 0 ? (
                                    <form onSubmit={handleSendMoney}>
                                        <TextField
                                            fullWidth
                                            label="Recipient Email or Phone"
                                            name="recipient"
                                            value={sendForm.recipient}
                                            onChange={handleInputChange}
                                            required
                                            sx={{ mb: 2 }}
                                        />

                                        <TextField
                                            fullWidth
                                            label="Amount ($)"
                                            name="amount"
                                            type="number"
                                            inputProps={{ step: "0.01" }}
                                            value={sendForm.amount}
                                            onChange={handleInputChange}
                                            required
                                            sx={{ mb: 2 }}
                                        />

                                        <TextField
                                            fullWidth
                                            label="Description (Optional)"
                                            name="description"
                                            value={sendForm.description}
                                            onChange={handleInputChange}
                                            sx={{ mb: 3 }}
                                        />

                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            disabled={loading}
                                            startIcon={<CreditCard size={20} />}
                                            sx={{
                                                background: 'linear-gradient(135deg, #1976d2, #42a5f5)'
                                            }}
                                        >
                                            {loading ? "Sending..." : "Send Money"}
                                        </Button>
                                    </form>
                                ) : (
                                    <Box sx={{ textAlign: 'center', py: 4 }}>
                                        <User size={48} color="#ccc" style={{ marginBottom: 16 }} />
                                        <Typography variant="h6" sx={{ mb: 1 }}>Request Money</Typography>
                                        <Typography variant="body2" sx={{ color: '#666' }}>
                                            Send a request to someone to pay you. Coming soon!
                                        </Typography>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>

                        {/* Account Summary */}
                        <Card sx={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                        }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                                    Account Summary
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2" sx={{ color: '#666' }}>Available Balance</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                            ${user?.balance?.toLocaleString()}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2" sx={{ color: '#666' }}>Pending</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>$0.00</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2" sx={{ color: '#666' }}>This Month</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 'medium', color: '#4caf50' }}>
                                            +$3,125.34
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>

                    {/* Transaction History */}
                    <Box sx={{ flex: { lg: 2 } }}>
                        <Card sx={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                        }}>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <FileText size={24} color="#1976d2" />
                                    <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
                                        Transaction History
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {transactionHistory.map((transaction) => (
                                        <Paper
                                            key={transaction.id}
                                            sx={{
                                                p: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                backgroundColor: '#f5f5f5',
                                                '&:hover': {
                                                    backgroundColor: '#eeeeee'
                                                }
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Box sx={{
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: transaction.type === 'credit' ? '#e8f5e8' : '#ffeaea'
                                                }}>
                                                    <CreditCard
                                                        size={24}
                                                        color={transaction.type === 'credit' ? '#4caf50' : '#f44336'}
                                                    />
                                                </Box>
                                                <Box>
                                                    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                                        {transaction.description}
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Typography variant="body2" sx={{ color: '#666' }}>
                                                            {transaction.date}
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ color: '#666' }}>•</Typography>
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                px: 1,
                                                                py: 0.5,
                                                                borderRadius: 1,
                                                                backgroundColor: transaction.status === 'completed' ? '#e8f5e8' : '#fff3cd',
                                                                color: transaction.status === 'completed' ? '#4caf50' : '#ff9800',
                                                                textTransform: 'capitalize'
                                                            }}
                                                        >
                                                            {transaction.status}
                                                        </Typography>
                                                    </Box>
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
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Transactions;