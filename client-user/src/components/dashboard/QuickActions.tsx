import { Card, CardContent, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { Banknote, CreditCard, FileText, User, Shield } from "lucide-react";

const QuickActions = () => {
    const quickActions = [
        { title: "Send Money", icon: <CreditCard size={20} />, href: "/transactions" },
        { title: "View Transactions", icon: <FileText size={20} />, href: "/transactions" },
        { title: "Insurance", icon: <Shield size={20} />, href: "/insurance" },
        { title: "Account Settings", icon: <User size={20} />, href: "/settings" },
        { title: "Support", icon: <Banknote size={20} />, href: "#" },
    ];

    return (
        <Card sx={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
            <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Quick Actions
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {quickActions.map((action, index) => (
                        <Button
                            key={index}
                            component={Link}
                            to={action.href}
                            variant="outlined"
                            startIcon={action.icon}
                            sx={{
                                justifyContent: 'flex-start',
                                '&:hover': {
                                    backgroundColor: '#1976d2',
                                    color: 'white'
                                }
                            }}
                        >
                            {action.title}
                        </Button>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default QuickActions;