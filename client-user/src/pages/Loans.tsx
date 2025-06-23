import { Card, CardContent, Button, Typography, Box, Container, Paper, Chip, LinearProgress } from "@mui/material";
import { useAuthContext } from "@/context/auth/AuthContext";
import { Link } from "react-router-dom";
import { Banknote, Calculator, FileText, Plus } from "lucide-react";
import NavigationHeader from "@/components/common/NavigationHeader";

const Loans = () => {
    const { user, logout } = useAuthContext();

    const loans = [
        {
            id: "1",
            type: "Personal Loan",
            amount: 25000,
            remaining: 18500,
            rate: 8.5,
            term: "36 months",
            monthlyPayment: 785,
            nextDue: "2024-07-01"
        },
        {
            id: "2",
            type: "Auto Loan",
            amount: 45000,
            remaining: 42100,
            rate: 4.2,
            term: "60 months",
            monthlyPayment: 840,
            nextDue: "2024-07-15"
        }
    ];

    const loanProducts = [
        { name: "Personal Loan", rate: "7.99%", amount: "Up to $50,000", term: "12-84 months" },
        { name: "Home Loan", rate: "6.25%", amount: "Up to $1,000,000", term: "15-30 years" },
        { name: "Auto Loan", rate: "4.99%", amount: "Up to $100,000", term: "12-72 months" },
        { name: "Business Loan", rate: "8.75%", amount: "Up to $500,000", term: "12-120 months" }
    ];

    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' }}>
            <NavigationHeader currentPage="Loans" />

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {/* Active Loans */}
                    <Card>
                        <CardContent sx={{ p: 4 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    Your Active Loans
                                </Typography>
                                <Button variant="contained" startIcon={<Plus />}>
                                    Apply for Loan
                                </Button>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                {loans.map((loan) => (
                                    <Paper key={loan.id} sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                            <Box>
                                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                    {loan.type}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#666' }}>
                                                    {loan.rate}% APR • {loan.term}
                                                </Typography>
                                            </Box>
                                            <Chip label="Active" color="success" size="small" />
                                        </Box>

                                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 2, mb: 2 }}>
                                            <Box>
                                                <Typography variant="body2" sx={{ color: '#666' }}>Original Amount</Typography>
                                                <Typography variant="h6">${loan.amount.toLocaleString()}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" sx={{ color: '#666' }}>Remaining</Typography>
                                                <Typography variant="h6">${loan.remaining.toLocaleString()}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" sx={{ color: '#666' }}>Monthly Payment</Typography>
                                                <Typography variant="h6">${loan.monthlyPayment}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" sx={{ color: '#666' }}>Next Due</Typography>
                                                <Typography variant="h6">{loan.nextDue}</Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ mb: 2 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                <Typography variant="body2">Loan Progress</Typography>
                                                <Typography variant="body2">
                                                    {Math.round(((loan.amount - loan.remaining) / loan.amount) * 100)}% paid
                                                </Typography>
                                            </Box>
                                            <LinearProgress
                                                variant="determinate"
                                                value={((loan.amount - loan.remaining) / loan.amount) * 100}
                                                sx={{ height: 8, borderRadius: 4 }}
                                            />
                                        </Box>

                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <Button size="small" variant="outlined">Make Payment</Button>
                                            <Button size="small" variant="outlined">View Details</Button>
                                        </Box>
                                    </Paper>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Loan Products */}
                    <Card>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                                Available Loan Products
                            </Typography>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
                                {loanProducts.map((product, index) => (
                                    <Paper key={index} sx={{ p: 3, border: '1px solid #e0e0e0' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                            <Box sx={{
                                                width: 40,
                                                height: 40,
                                                backgroundColor: '#1976d2',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <Banknote color="white" size={20} />
                                            </Box>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                {product.name}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ mb: 2 }}>
                                            <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                                                Starting from {product.rate} APR
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                                                Amount: {product.amount}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#666' }}>
                                                Term: {product.term}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <Button variant="contained" size="small">Apply Now</Button>
                                            <Button variant="outlined" size="small" startIcon={<Calculator />}>
                                                Calculate
                                            </Button>
                                        </Box>
                                    </Paper>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Loan Calculator */}
                    <Card>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                                Loan Calculator
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                <Calculator size={48} color="#1976d2" />
                                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                                    Calculate Your Loan
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
                                    Use our loan calculator to estimate monthly payments and total costs
                                </Typography>
                                <Button variant="contained" startIcon={<Calculator />}>
                                    Open Calculator
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </Box>
    );
};

export default Loans;