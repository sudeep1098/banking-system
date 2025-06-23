import { Card, CardContent, Typography, Box } from "@mui/material";

const SecurityNotice = () => {
    return (
        <Card sx={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Box sx={{
                    width: 48,
                    height: 48,
                    backgroundColor: '#e8f5e8',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2
                }}>
                    <Typography variant="h5">🔒</Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Your Account is Secure
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                    Last login: Today at 2:30 PM from New York
                </Typography>
            </CardContent>
        </Card>
    );
};

export default SecurityNotice;