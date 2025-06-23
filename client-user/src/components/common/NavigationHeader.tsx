import { Button, Container, Box, Typography, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuthContext } from "@/context/auth/AuthContext";
import { Home, CreditCard, FileText, Shield, Banknote, Settings } from "lucide-react";

const NavigationHeader = ({ currentPage }: { currentPage: string }) => {
    const { logout } = useAuthContext();

    const navItems = [
        { title: "Dashboard", href: "/dashboard", icon: <Home size={20} /> },
        { title: "Transactions", href: "/transactions", icon: <FileText size={20} /> },
        { title: "Cards", href: "/cards", icon: <CreditCard size={20} /> },
        { title: "Loans", href: "/loans", icon: <Banknote size={20} /> },
        { title: "Insurance", href: "/insurance", icon: <Shield size={20} /> },
        { title: "Settings", href: "/settings", icon: <Settings size={20} /> },
    ];

    return (
        <Paper elevation={1} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Container maxWidth="lg" sx={{ py: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a1a1a' }}>
                            {currentPage}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                            {navItems.map((item) => (
                                <Button
                                    key={item.title}
                                    component={Link}
                                    to={item.href}
                                    variant="text"
                                    startIcon={item.icon}
                                    sx={{
                                        color: currentPage === item.title ? '#1976d2' : '#666',
                                        fontWeight: currentPage === item.title ? 'bold' : 'normal'
                                    }}
                                >
                                    {item.title}
                                </Button>
                            ))}
                        </Box>
                        <Button variant="outlined" onClick={logout}>
                            Sign Out
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Paper>
    );
};

export default NavigationHeader