import { Card, CardContent, Button, Typography, Box, Container, Paper, TextField, Switch, FormControlLabel } from "@mui/material";
import { useAuthContext } from "@/context/auth/AuthContext";
import { Link } from "react-router-dom";
import { User, Shield, Bell, CreditCard, Eye, Lock } from "lucide-react";
import { useState } from "react";
import NavigationHeader from "@/components/common/NavigationHeader";

const AccountSettings = () => {
    const { user, logout, updateUser } = useAuthContext();
    const [notifications, setNotifications] = useState({
        email: true,
        sms: false,
        push: true
    });

    const handleNotificationChange = (type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setNotifications(prev => ({
            ...prev,
            [type]: event.target.checked
        }));
    };

    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' }}>
            {/* Header */}
            <NavigationHeader currentPage="Settings" />

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {/* Profile Information */}
                    <Card>
                        <CardContent sx={{ p: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                <User size={24} />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    Profile Information
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
                                <TextField
                                    label="Full Name"
                                    defaultValue={user?.name}
                                    variant="outlined"
                                    fullWidth
                                />
                                <TextField
                                    label="Email Address"
                                    defaultValue={user?.email}
                                    variant="outlined"
                                    fullWidth
                                    disabled
                                />
                                <TextField
                                    label="Phone Number"
                                    defaultValue="+1 (555) 123-4567"
                                    variant="outlined"
                                    fullWidth
                                />
                                <TextField
                                    label="Date of Birth"
                                    type="date"
                                    defaultValue="1990-01-01"
                                    variant="outlined"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    label="Address"
                                    defaultValue="123 Main St, City, State"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={2}
                                />
                                <TextField
                                    label="Occupation"
                                    defaultValue="Software Engineer"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Box>

                            <Box sx={{ mt: 3 }}>
                                <Button variant="contained">Save Changes</Button>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Security Settings */}
                    <Card>
                        <CardContent sx={{ p: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                <Shield size={24} />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    Security Settings
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <Paper sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                                                Password
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#666' }}>
                                                Last changed 3 months ago
                                            </Typography>
                                        </Box>
                                        <Button variant="outlined" startIcon={<Lock />}>
                                            Change Password
                                        </Button>
                                    </Box>
                                </Paper>

                                <Paper sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                                                Two-Factor Authentication
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#666' }}>
                                                Add an extra layer of security to your account
                                            </Typography>
                                        </Box>
                                        <Button variant="contained" startIcon={<Shield />}>
                                            Enable 2FA
                                        </Button>
                                    </Box>
                                </Paper>

                                <Paper sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                                                Login Activity
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#666' }}>
                                                View recent login sessions and devices
                                            </Typography>
                                        </Box>
                                        <Button variant="outlined" startIcon={<Eye />}>
                                            View Activity
                                        </Button>
                                    </Box>
                                </Paper>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Notification Preferences */}
                    <Card>
                        <CardContent sx={{ p: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                <Bell size={24} />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    Notification Preferences
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={notifications.email}
                                            onChange={handleNotificationChange('email')}
                                        />
                                    }
                                    label="Email Notifications"
                                />
                                <Typography variant="body2" sx={{ color: '#666', ml: 4, mt: -1 }}>
                                    Receive transaction alerts and account updates via email
                                </Typography>

                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={notifications.sms}
                                            onChange={handleNotificationChange('sms')}
                                        />
                                    }
                                    label="SMS Notifications"
                                />
                                <Typography variant="body2" sx={{ color: '#666', ml: 4, mt: -1 }}>
                                    Receive important alerts via text message
                                </Typography>

                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={notifications.push}
                                            onChange={handleNotificationChange('push')}
                                        />
                                    }
                                    label="Push Notifications"
                                />
                                <Typography variant="body2" sx={{ color: '#666', ml: 4, mt: -1 }}>
                                    Receive notifications in your browser or mobile app
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Account Actions */}
                    <Card>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                                Account Actions
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Button variant="outlined" color="warning" sx={{ justifyContent: 'flex-start' }}>
                                    Download Account Statement
                                </Button>
                                <Button variant="outlined" color="warning" sx={{ justifyContent: 'flex-start' }}>
                                    Close Account
                                </Button>
                                <Button variant="outlined" color="error" sx={{ justifyContent: 'flex-start' }}>
                                    Delete Account
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </Box>
    );
};

export default AccountSettings;