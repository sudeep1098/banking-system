import { Card, CardContent, Typography, Box } from "@mui/material";

interface AccountStatusProps {
    kycStatus: 'pending' | 'verified' | 'rejected';
}

const AccountStatus = ({ kycStatus }: AccountStatusProps) => {
    return (
        <Card sx={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
            <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Account Status
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: '#666' }}>Verification</Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                backgroundColor: kycStatus === 'verified' ? '#e8f5e8' : '#fff3cd',
                                color: kycStatus === 'verified' ? '#4caf50' : '#ff9800'
                            }}
                        >
                            {kycStatus === 'verified' ? 'Verified' : 'Pending'}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: '#666' }}>Account Type</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>Premium</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: '#666' }}>Member Since</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>June 2024</Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AccountStatus;