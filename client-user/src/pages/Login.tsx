import { useState } from "react";
import { Button, Card, CardContent, TextField, Typography, Box, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/auth/AuthContext";
import { useToastContext } from "@/context/toast/ToastContext";
import { Banknote, LogIn, User } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuthContext();
    const { toast } = useToastContext();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const success = await login(email, password);
            if (success) {
                toast("success", "You have successfully logged in.");
                navigate("/dashboard");
            } else {
                toast("error", "Invalid email or password.");
            }
        } catch (error) {
            toast("error", "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2
        }}>
            <Container maxWidth="sm">
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 3 }}>
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
                    </Link>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1a1a1a', mb: 1 }}>
                        Welcome Back
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#666' }}>
                        Sign in to your secure banking account
                    </Typography>
                </Box>

                <Card sx={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}>
                    <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                            <LogIn size={24} color="#1976d2" />
                            <Typography variant="h5" sx={{ ml: 1, fontWeight: 'bold' }}>
                                Sign In
                            </Typography>
                        </Box>

                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                sx={{ mb: 3 }}
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                sx={{ mb: 3 }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={loading}
                                startIcon={loading ? null : <User size={20} />}
                                sx={{
                                    background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                                    py: 1.5,
                                    mb: 3
                                }}
                            >
                                {loading ? "Signing in..." : "Sign In Securely"}
                            </Button>
                        </form>

                        <Typography variant="body2" sx={{ textAlign: 'center', color: '#666' }}>
                            Don't have an account?{" "}
                            <Link to="/register" style={{ color: '#1976d2', textDecoration: 'none' }}>
                                Create one now
                            </Link>
                        </Typography>

                        <Box sx={{ mt: 3, p: 2, backgroundColor: '#e3f2fd', borderRadius: 1 }}>
                            <Typography variant="body2" sx={{ textAlign: 'center', color: '#666' }}>
                                🔒 Your connection is secured with 256-bit SSL encryption
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default Login;