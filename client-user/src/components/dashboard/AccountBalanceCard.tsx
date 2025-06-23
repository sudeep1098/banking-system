import { Card, CardContent, Box, Typography } from "@mui/material";
import { Wallet } from "lucide-react";

interface AccountBalanceCardProps {
    balance: number;
}

const AccountBalanceCard = ({ balance }: AccountBalanceCardProps) => {
    return (
        <Card sx={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            mb: 4
        }}>
            <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                            Available Balance
                        </Typography>
                        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1a1a1a' }}>
                            ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#4caf50', mt: 1 }}>
                            +2.5% from last month
                        </Typography>
                    </Box>
                    <Box sx={{
                        width: 64,
                        height: 64,
                        background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Wallet color="white" size={32} />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AccountBalanceCard;