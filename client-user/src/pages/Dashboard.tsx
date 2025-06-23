import { Box, Container } from "@mui/material";
import { useAuthContext } from "@/context/auth/AuthContext";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AccountBalanceCard from "@/components/dashboard/AccountBalanceCard";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import AccountStatus from "@/components/dashboard/AccountStatus";
import QuickActions from "@/components/dashboard/QuickActions";
import SecurityNotice from "@/components/dashboard/SecurityNotice";
import NavigationHeader from "@/components/common/NavigationHeader";

const Dashboard = () => {
    const { user } = useAuthContext();

    const recentTransactions = [
        { id: "1", description: "Online Purchase - Amazon", amount: -89.99, date: "2024-06-22", type: "debit" as const },
        { id: "2", description: "Salary Deposit", amount: 3500.00, date: "2024-06-21", type: "credit" as const },
        { id: "3", description: "ATM Withdrawal", amount: -200.00, date: "2024-06-20", type: "debit" as const },
        { id: "4", description: "Transfer from John", amount: 150.00, date: "2024-06-19", type: "credit" as const },
    ];

    if (!user) return null;

    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' }}>
            <NavigationHeader currentPage="Dashboard" />

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    gap: 4
                }}>
                    {/* Main Content */}
                    <Box sx={{ flex: { lg: 2 } }}>
                        <AccountBalanceCard balance={user.balance} />
                        <RecentTransactions transactions={recentTransactions} />
                    </Box>

                    {/* Sidebar */}
                    <Box sx={{ flex: { lg: 1 } }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <AccountStatus kycStatus={user.kycStatus} />
                            <QuickActions />
                            <SecurityNotice />
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Dashboard;