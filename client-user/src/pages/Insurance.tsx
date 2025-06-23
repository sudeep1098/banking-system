import { Card, CardContent, Button, Typography, Box, Container, Paper, Chip } from "@mui/material";
import { useAuthContext } from "@/context/auth/AuthContext";
import { ShieldCheck, Plus, FileText, Shield } from "lucide-react";
import NavigationHeader from "@/components/common/NavigationHeader";

const Insurance = () => {
    const { user } = useAuthContext();

    const policies = [
        {
            id: "1",
            type: "Life Insurance",
            coverage: 250000,
            premium: 85,
            status: "Active",
            nextDue: "2024-07-15",
            provider: "SecureBank Insurance"
        },
        {
            id: "2",
            type: "Health Insurance",
            coverage: 500000,
            premium: 220,
            status: "Active",
            nextDue: "2024-07-01",
            provider: "SecureBank Health"
        }
    ];

    const insuranceProducts = [
        {
            name: "Life Insurance",
            description: "Protect your family's financial future",
            coverage: "Up to $1,000,000",
            premium: "Starting from $25/month",
            features: ["Term & Whole Life", "No Medical Exam", "Online Application"]
        },
        {
            name: "Health Insurance",
            description: "Comprehensive health coverage",
            coverage: "Up to $2,000,000",
            premium: "Starting from $150/month",
            features: ["Hospital Coverage", "Doctor Visits", "Prescription Drugs"]
        },
        {
            name: "Auto Insurance",
            description: "Protect your vehicle and yourself",
            coverage: "Comprehensive Coverage",
            premium: "Starting from $75/month",
            features: ["Collision Coverage", "Liability Protection", "24/7 Claims"]
        },
        {
            name: "Home Insurance",
            description: "Protect your home and belongings",
            coverage: "Up to Property Value",
            premium: "Starting from $120/month",
            features: ["Property Protection", "Personal Belongings", "Liability Coverage"]
        }
    ];

    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' }}>
            <NavigationHeader currentPage="Insurance" />

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {/* Active Policies */}
                    <Card>
                        <CardContent sx={{ p: 4 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    Your Insurance Policies
                                </Typography>
                                <Button variant="contained" startIcon={<Plus />}>
                                    Get Quote
                                </Button>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                {policies.map((policy) => (
                                    <Paper key={policy.id} sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Box sx={{
                                                    width: 40,
                                                    height: 40,
                                                    backgroundColor: '#4caf50',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <ShieldCheck color="white" size={20} />
                                                </Box>
                                                <Box>
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                        {policy.type}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: '#666' }}>
                                                        {policy.provider}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Chip label={policy.status} color="success" size="small" />
                                        </Box>

                                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2, mb: 2 }}>
                                            <Box>
                                                <Typography variant="body2" sx={{ color: '#666' }}>Coverage Amount</Typography>
                                                <Typography variant="h6">${policy.coverage.toLocaleString()}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" sx={{ color: '#666' }}>Monthly Premium</Typography>
                                                <Typography variant="h6">${policy.premium}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" sx={{ color: '#666' }}>Next Payment</Typography>
                                                <Typography variant="h6">{policy.nextDue}</Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <Button size="small" variant="outlined">Make Payment</Button>
                                            <Button size="small" variant="outlined">View Policy</Button>
                                            <Button size="small" variant="outlined">File Claim</Button>
                                        </Box>
                                    </Paper>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Insurance Products */}
                    <Card>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                                Available Insurance Products
                            </Typography>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
                                {insuranceProducts.map((product, index) => (
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
                                                <Shield color="white" size={20} />
                                            </Box>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                {product.name}
                                            </Typography>
                                        </Box>

                                        <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                                            {product.description}
                                        </Typography>

                                        <Box sx={{ mb: 2 }}>
                                            <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1 }}>
                                                Coverage: {product.coverage}
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 2 }}>
                                                Premium: {product.premium}
                                            </Typography>

                                            <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1 }}>
                                                Key Features:
                                            </Typography>
                                            {product.features.map((feature, idx) => (
                                                <Typography key={idx} variant="body2" sx={{ color: '#666', ml: 1 }}>
                                                    • {feature}
                                                </Typography>
                                            ))}
                                        </Box>

                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <Button variant="contained" size="small">Get Quote</Button>
                                            <Button variant="outlined" size="small" startIcon={<FileText />}>
                                                Learn More
                                            </Button>
                                        </Box>
                                    </Paper>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Insurance Services */}
                    <Card>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                                Insurance Services
                            </Typography>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
                                <Button variant="outlined" sx={{ p: 2, flexDirection: 'column', gap: 1 }}>
                                    <FileText size={24} />
                                    <Typography variant="body2">File a Claim</Typography>
                                </Button>
                                <Button variant="outlined" sx={{ p: 2, flexDirection: 'column', gap: 1 }}>
                                    <Shield size={24} />
                                    <Typography variant="body2">Policy Documents</Typography>
                                </Button>
                                <Button variant="outlined" sx={{ p: 2, flexDirection: 'column', gap: 1 }}>
                                    <ShieldCheck size={24} />
                                    <Typography variant="body2">Coverage Calculator</Typography>
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </Box>
    );
};

export default Insurance;