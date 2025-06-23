import { Box, Container, Paper, Typography } from "@mui/material";
import { Banknote } from "lucide-react";

interface DashboardHeaderProps {
    userName: string;
}

const DashboardHeader = ({ userName }: DashboardHeaderProps) => {
    return (
        <Paper elevation={1} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Container maxWidth="lg" sx={{ py: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
                        <Typography variant="h5" sx={{ fontWeight: 'bold', background: 'linear-gradient(135deg, #1976d2, #42a5f5)', backgroundClip: 'text', color: 'transparent' }}>
                            SecureBank
                        </Typography>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a1a1a', display: { xs: 'none', md: 'block' } }}>
                        Welcome back, {userName}
                    </Typography>
                </Box>
            </Container>
        </Paper>
    );
};

export default DashboardHeader;