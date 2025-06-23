import { Button, Card, CardContent, Container, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { Banknote, CreditCard, Shield, LogIn, User, Wallet } from "lucide-react";

const Home = () => {
    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' }}>
            {/* Header */}
            <Container maxWidth="lg" sx={{ py: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{
                            width: 40,
                            height: 40,
                            background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Banknote color="white" size={24} />
                        </Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', background: 'linear-gradient(135deg, #1976d2, #42a5f5)', backgroundClip: 'text', color: 'transparent' }}>
                            SecureBank
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            component={Link}
                            to="/login"
                            variant="text"
                            startIcon={<LogIn size={16} />}
                            sx={{ color: '#1976d2' }}
                        >
                            Login
                        </Button>
                        <Button
                            component={Link}
                            to="/register"
                            variant="contained"
                            startIcon={<User size={16} />}
                            sx={{ background: 'linear-gradient(135deg, #1976d2, #42a5f5)' }}
                        >
                            Get Started
                        </Button>
                    </Box>
                </Box>
            </Container>

            {/* Hero Section */}
            <Container maxWidth="lg" sx={{ py: 10, textAlign: 'center' }}>
                <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#1a1a1a', mb: 3 }}>
                    Banking Made
                    <Typography component="span" variant="h2" sx={{
                        display: 'block',
                        fontWeight: 'bold',
                        background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                        backgroundClip: 'text',
                        color: 'transparent'
                    }}>
                        Simple & Secure
                    </Typography>
                </Typography>
                <Typography variant="h5" sx={{ color: '#666', mb: 4, maxWidth: '600px', mx: 'auto' }}>
                    Experience next-generation digital banking with advanced security,
                    instant transfers, and personalized financial insights.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                        component={Link}
                        to="/register"
                        variant="contained"
                        size="large"
                        sx={{
                            background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                            px: 4,
                            py: 2,
                            fontSize: '1.1rem'
                        }}
                    >
                        Open Account
                    </Button>
                    <Button
                        component={Link}
                        to="/login"
                        variant="outlined"
                        size="large"
                        sx={{
                            borderColor: '#1976d2',
                            color: '#1976d2',
                            px: 4,
                            py: 2,
                            fontSize: '1.1rem',
                            '&:hover': {
                                backgroundColor: '#1976d2',
                                color: 'white'
                            }
                        }}
                    >
                        Existing User
                    </Button>
                </Box>
            </Container>

            {/* Features */}
            <Container maxWidth="lg" sx={{ py: 10 }}>
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1a1a1a', mb: 2 }}>
                        Why Choose SecureBank?
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#666' }}>
                        Trusted by millions worldwide for secure and efficient banking
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 4
                }}>
                    <Box sx={{ flex: 1 }}>
                        <Card sx={{
                            height: '100%',
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-8px)',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                            }
                        }}>
                            <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                <Box sx={{
                                    width: 64,
                                    height: 64,
                                    background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mx: 'auto',
                                    mb: 3
                                }}>
                                    <Shield color="white" size={32} />
                                </Box>
                                <Typography variant="h5" sx={{ fontWeight: 'semibold', mb: 2 }}>
                                    Bank-Grade Security
                                </Typography>
                                <Typography sx={{ color: '#666' }}>
                                    256-bit encryption, biometric authentication, and real-time fraud detection keep your money safe.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <Card sx={{
                            height: '100%',
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-8px)',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                            }
                        }}>
                            <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                <Box sx={{
                                    width: 64,
                                    height: 64,
                                    background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mx: 'auto',
                                    mb: 3
                                }}>
                                    <CreditCard color="white" size={32} />
                                </Box>
                                <Typography variant="h5" sx={{ fontWeight: 'semibold', mb: 2 }}>
                                    Instant Transfers
                                </Typography>
                                <Typography sx={{ color: '#666' }}>
                                    Send money anywhere in the world instantly with our advanced payment network.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <Card sx={{
                            height: '100%',
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-8px)',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                            }
                        }}>
                            <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                <Box sx={{
                                    width: 64,
                                    height: 64,
                                    background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mx: 'auto',
                                    mb: 3
                                }}>
                                    <Wallet color="white" size={32} />
                                </Box>
                                <Typography variant="h5" sx={{ fontWeight: 'semibold', mb: 2 }}>
                                    Smart Insights
                                </Typography>
                                <Typography sx={{ color: '#666' }}>
                                    AI-powered spending insights and personalized recommendations to help you save more.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Container>

            {/* CTA Section */}
            <Box sx={{ background: 'linear-gradient(135deg, #1976d2, #42a5f5)', py: 10 }}>
                <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'white', mb: 3 }}>
                        Ready to Start Your Journey?
                    </Typography>
                    <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.9)', mb: 4, maxWidth: '600px', mx: 'auto' }}>
                        Join millions of satisfied customers who trust SecureBank with their financial future.
                    </Typography>
                    <Button
                        component={Link}
                        to="/register"
                        variant="contained"
                        size="large"
                        sx={{
                            backgroundColor: 'white',
                            color: '#1976d2',
                            px: 4,
                            py: 2,
                            fontSize: '1.1rem',
                            '&:hover': {
                                backgroundColor: '#f5f5f5'
                            }
                        }}
                    >
                        Create Your Account
                    </Button>
                </Container>
            </Box>

            {/* Footer */}
            <Box sx={{ backgroundColor: '#1a1a1a', color: 'white', py: 6 }}>
                <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 3 }}>
                        <Box sx={{
                            width: 32,
                            height: 32,
                            background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Banknote color="white" size={20} />
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            SecureBank
                        </Typography>
                    </Box>
                    <Typography sx={{ color: '#999', mb: 2 }}>
                        SecureBank is regulated by the Financial Conduct Authority and protected by the Financial Services Compensation Scheme.
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                        © 2024 SecureBank. All rights reserved. Your deposits are protected up to $250,000.
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default Home;