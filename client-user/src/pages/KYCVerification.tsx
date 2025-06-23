
import { useState } from "react";
import { Button, Card, CardContent, TextField, Typography, Box, Container, LinearProgress, MenuItem } from "@mui/material";
import { useAuthContext } from "@/context/auth/AuthContext";
import { useToastContext } from "@/context/toast/ToastContext";
import { useNavigate } from "react-router-dom";
import { IdCard, FileText, User, CreditCard } from "lucide-react";

const KYCVerification = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        documentType: "",
        documentNumber: "",
        expiryDate: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
    });
    const { updateUser, user } = useAuthContext();
    const navigate = useNavigate();
    const { toast } = useToastContext();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleStep1Submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.documentType || !formData.documentNumber) {
            toast('error', 'Please fill in all required fields.');
            return;
        }
        setStep(2);
    };

    const handleStep2Submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.address || !formData.city || !formData.state || !formData.zipCode) {
            toast('error', 'Please fill in all required fields.');
            return;
        }
        setStep(3);
    };

    const handleFinalSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate verification process
        await new Promise(resolve => setTimeout(resolve, 2000));

        updateUser({ kycStatus: 'verified' });
        toast('success', 'Your identity has been verified. Welcome to SecureBank!');
        setLoading(false);
        navigate("/dashboard");
    };

    const getStepIcon = (stepNumber: number) => {
        switch (stepNumber) {
            case 1: return <IdCard size={24} />;
            case 2: return <User size={24} />;
            case 3: return <FileText size={24} />;
            default: return <FileText size={24} />;
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
            <Container maxWidth="md">
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1a1a1a', mb: 1 }}>
                        Identity Verification
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#666' }}>
                        Complete your KYC to unlock all banking features
                    </Typography>
                </Box>

                <Card sx={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}>
                    <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                            {getStepIcon(step)}
                            <Typography variant="h5" sx={{ ml: 1, fontWeight: 'bold' }}>
                                Step {step} of 3
                            </Typography>
                        </Box>

                        <LinearProgress
                            variant="determinate"
                            value={(step / 3) * 100}
                            sx={{ mb: 4, height: 4, borderRadius: 2 }}
                        />

                        {step === 1 && (
                            <form onSubmit={handleStep1Submit}>
                                <Box sx={{ textAlign: 'center', mb: 4 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        Government ID Verification
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: '#666' }}>
                                        Please provide a valid government-issued ID
                                    </Typography>
                                </Box>

                                <TextField
                                    fullWidth
                                    select
                                    label="Document Type"
                                    name="documentType"
                                    value={formData.documentType}
                                    onChange={handleInputChange}
                                    required
                                    sx={{ mb: 3 }}
                                >
                                    <MenuItem value="">Select document type</MenuItem>
                                    <MenuItem value="passport">Passport</MenuItem>
                                    <MenuItem value="drivers-license">Driver's License</MenuItem>
                                    <MenuItem value="national-id">National ID Card</MenuItem>
                                </TextField>

                                <TextField
                                    fullWidth
                                    label="Document Number"
                                    name="documentNumber"
                                    value={formData.documentNumber}
                                    onChange={handleInputChange}
                                    required
                                    sx={{ mb: 3 }}
                                />

                                <TextField
                                    fullWidth
                                    label="Expiry Date"
                                    name="expiryDate"
                                    type="date"
                                    value={formData.expiryDate}
                                    onChange={handleInputChange}
                                    InputLabelProps={{ shrink: true }}
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
                                    Continue to Address Verification
                                </Button>
                            </form>
                        )}

                        {step === 2 && (
                            <form onSubmit={handleStep2Submit}>
                                <Box sx={{ textAlign: 'center', mb: 4 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        Address Verification
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: '#666' }}>
                                        Confirm your residential address
                                    </Typography>
                                </Box>

                                <TextField
                                    fullWidth
                                    label="Street Address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                    sx={{ mb: 3 }}
                                />

                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
                                    <TextField
                                        label="City"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <TextField
                                        label="State"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Box>

                                <TextField
                                    fullWidth
                                    label="ZIP Code"
                                    name="zipCode"
                                    value={formData.zipCode}
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
                                        sx={{
                                            flex: 1,
                                            background: 'linear-gradient(135deg, #1976d2, #42a5f5)'
                                        }}
                                    >
                                        Continue to Review
                                    </Button>
                                </Box>
                            </form>
                        )}

                        {step === 3 && (
                            <form onSubmit={handleFinalSubmit}>
                                <Box sx={{ textAlign: 'center', mb: 4 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        Review & Submit
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: '#666' }}>
                                        Please review your information before submitting
                                    </Typography>
                                </Box>

                                <Box sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: 1, mb: 3 }}>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Personal Information</Typography>
                                        <Typography variant="body2" sx={{ color: '#666' }}>{user?.name}</Typography>
                                        <Typography variant="body2" sx={{ color: '#666' }}>{user?.email}</Typography>
                                    </Box>

                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Document</Typography>
                                        <Typography variant="body2" sx={{ color: '#666' }}>
                                            {formData.documentType} - {formData.documentNumber}
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Address</Typography>
                                        <Typography variant="body2" sx={{ color: '#666' }}>
                                            {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ p: 2, backgroundColor: '#e3f2fd', borderRadius: 1, mb: 3 }}>
                                    <Typography variant="body2" sx={{ textAlign: 'center', color: '#666' }}>
                                        By submitting this form, you confirm that all information provided is accurate
                                        and agree to our verification process.
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => setStep(2)}
                                        sx={{ flex: 1 }}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={loading}
                                        startIcon={loading ? null : <CreditCard size={20} />}
                                        sx={{
                                            flex: 1,
                                            background: 'linear-gradient(135deg, #1976d2, #42a5f5)'
                                        }}
                                    >
                                        {loading ? "Verifying..." : "Complete Verification"}
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default KYCVerification;