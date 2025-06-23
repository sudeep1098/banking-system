import { Card, CardContent, Button, Typography, Box, Container, Paper, Chip } from "@mui/material";
import { useAuthContext } from "@/context/auth/AuthContext";
import { Link } from "react-router-dom";
import { CreditCard, Eye, EyeOff, Plus, Settings } from "lucide-react";
import { useState } from "react";
import NavigationHeader from "@/components/common/NavigationHeader";

const Cards = () => {
    const { user, logout } = useAuthContext();
    const [showCardNumber, setShowCardNumber] = useState(false);

    const cards = [
        {
            id: "1",
            type: "Debit Card",
            number: "4532 1234 5678 9012",
            expiry: "12/27",
            status: "Active",
            balance: user?.balance || 0,
            limit: 5000,
            used: 1250

        },
        {
            id: "2",
            type: "Credit Card",
            number: "5412 3456 7890 1234",
            expiry: "08/26",
            status: "Active",
            balance: user?.balance || 0,
            limit: 5000,
            used: 1250
        }
    ];

    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' }}>
            {/* Header */}
            <NavigationHeader currentPage="Cards" />

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {/* Add New Card Button */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Your Cards
                        </Typography>
                        <Button variant="contained" startIcon={<Plus />}>
                            Request New Card
                        </Button>
                    </Box>

                    {/* Cards Grid */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
                        {cards.map((card) => (
                            <Card key={card.id} sx={{
                                background: card.type === 'Credit Card'
                                    ? 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)'
                                    : 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                                color: 'white',
                                position: 'relative',
                                overflow: 'visible'
                            }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                            {card.type}
                                        </Typography>
                                        <Chip
                                            label={card.status}
                                            size="small"
                                            sx={{ backgroundColor: '#4caf50', color: 'white' }}
                                        />
                                    </Box>

                                    <Box sx={{ mb: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                            <Typography variant="h5" sx={{ fontFamily: 'monospace', letterSpacing: 2 }}>
                                                {showCardNumber ? card.number : '•••• •••• •••• ' + card.number.slice(-4)}
                                            </Typography>
                                            <Button
                                                size="small"
                                                onClick={() => setShowCardNumber(!showCardNumber)}
                                                sx={{ color: 'white', minWidth: 'auto', p: 0.5 }}
                                            >
                                                {showCardNumber ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </Button>
                                        </Box>
                                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                            Expires: {card.expiry}
                                        </Typography>
                                    </Box>

                                    {card.type === 'Credit Card' ? (
                                        <Box>
                                            <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                                                Available Credit
                                            </Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                ${(card.limit - card.used).toLocaleString()}
                                            </Typography>
                                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                                of ${card.limit.toLocaleString()} limit
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <Box>
                                            <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                                                Available Balance
                                            </Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                ${card.balance.toLocaleString()}
                                            </Typography>
                                        </Box>
                                    )}

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                                        <Button size="small" sx={{ color: 'white' }}>
                                            <Settings size={16} />
                                        </Button>
                                        <CreditCard size={32} />
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>

                    {/* Card Services */}
                    <Card sx={{ mt: 4 }}>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                                Card Services
                            </Typography>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
                                <Button variant="outlined" sx={{ p: 2, flexDirection: 'column', gap: 1 }}>
                                    <CreditCard size={24} />
                                    <Typography variant="body2">Block Card</Typography>
                                </Button>
                                <Button variant="outlined" sx={{ p: 2, flexDirection: 'column', gap: 1 }}>
                                    <Settings size={24} />
                                    <Typography variant="body2">Card Settings</Typography>
                                </Button>
                                <Button variant="outlined" sx={{ p: 2, flexDirection: 'column', gap: 1 }}>
                                    <Plus size={24} />
                                    <Typography variant="body2">PIN Services</Typography>
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </Box>
    );
};

export default Cards;