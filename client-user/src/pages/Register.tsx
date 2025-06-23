import { useState } from "react";
import { Button, Card, CardContent, TextField, Typography, Box, Container, LinearProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/auth/AuthContext";
import { useToastContext } from "@/context/toast/ToastContext";
import { Banknote, UserPlus, User } from "lucide-react";

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
    });
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const { register } = useAuthContext();
    const { toast } = useToastContext();
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleStep1Submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.firstName || !formData.lastName || !formData.email) {
            toast("error", "Please fill in all required fields.");
            return;
        }
        setStep(2);
    };

    const handleFinalSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast("error", "Passwords do not match.");
            return;
        }

        if (formData.password.length < 8) {
            toast("error", "Password must be at least 8 characters long.");
            return;
        }

        setLoading(true);

        try {
            const success = await register(formData);
            if (success) {
                toast("success", "Account created! Welcome to SecureBank. Please complete your KYC verification.");
                navigate("/kyc");
            }
        } catch (error) {
            toast("error", "Registration failed. Something went wrong. Please try again.");
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
                        Create Your Account
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#666' }}>
                        Join millions of satisfied customers
                    </Typography>
                </Box>

                <Card sx={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}>
                    <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                            <UserPlus size={24} color="#1976d2" />
                            <Typography variant="h5" sx={{ ml: 1, fontWeight: 'bold' }}>
                                Sign Up - Step {step} of 2
                            </Typography>
                        </Box>

                        <LinearProgress
                            variant="determinate"
                            value={(step / 2) * 100}
                            sx={{ mb: 4, height: 4, borderRadius: 2 }}
                        />

                        {step === 1 ? (
                            <form onSubmit={handleStep1Submit}>
                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
                                    <TextField
                                        label="First Name"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <TextField
                                        label="Last Name"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Box>

                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    sx={{ mb: 3 }}
                                />

                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    sx={{ mb: 3 }}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                                        py: 1.5
                                    }}
                                >
                                    Continue to Security Setup
                                </Button>
                            </form>
                        ) : (
                            <form onSubmit={handleFinalSubmit}>
                                <TextField
                                    fullWidth
                                    label="Create Password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    helperText="Must be at least 8 characters long"
                                    sx={{ mb: 3 }}
                                />

                                <TextField
                                    fullWidth
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                    sx={{ mb: 3 }}
                                />

                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => setStep(1)}
                                        sx={{ flex: 1 }}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={loading}
                                        startIcon={loading ? null : <User size={20} />}
                                        sx={{
                                            flex: 1,
                                            background: 'linear-gradient(135deg, #1976d2, #42a5f5)'
                                        }}
                                    >
                                        {loading ? "Creating..." : "Create Account"}
                                    </Button>
                                </Box>
                            </form>
                        )}

                        <Typography variant="body2" sx={{ textAlign: 'center', color: '#666', mt: 3 }}>
                            Already have an account?{" "}
                            <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>
                                Sign in here
                            </Link>
                        </Typography>

                        <Box sx={{ mt: 3, p: 2, backgroundColor: '#e3f2fd', borderRadius: 1 }}>
                            <Typography variant="body2" sx={{ textAlign: 'center', color: '#666' }}>
                                🔒 By creating an account, you agree to our Terms of Service and Privacy Policy.
                                Your data is encrypted and secure.
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default Register;