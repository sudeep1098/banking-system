import { useState } from 'react';
import {
  Card,
  CardContent,
  Button,
  TextField,
  Switch,
  Tabs,
  Tab,
  Chip,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Container,
  FormControlLabel
} from '@mui/material';
import { useToastContext } from '@/context/toast/ToastContext';
import {
  User,
  Bell,
  Shield,
  Palette,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  Building,
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@bankpro.com',
    phone: '+1 (555) 123-4567',
    company: 'BankPro Financial',
    location: 'New York, NY',
    bio: 'System administrator with 5+ years of experience in banking systems.',
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
    securityAlerts: true,
    systemUpdates: true,
    maintenanceAlerts: false,
  });

  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
  });

  const { toast } = useToastContext();

  const handleSaveProfile = () => {
    toast('success', 'Profile updated successfully');
  };

  const handleSaveNotifications = () => {
    toast('success', 'Notifications updated successfully');
  };

  const handleSavePreferences = () => {
    toast('success', 'Preferences updated successfully');
  };

  return (
    <Container maxWidth={false} sx={{ py: 3 }}>
      <Box className="space-y-6 animate-fade-in">
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Box>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: '#1a1a1a', mb: 1 }}>
              Settings
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your account settings and preferences
            </Typography>
          </Box>
          <Chip label="System Admin" variant="outlined" sx={{ px: 2, py: 1 }} />
        </Box>

        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
              <Tab
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <User size={16} />
                    Profile
                  </Box>
                }
              />
              <Tab
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Bell size={16} />
                    Notifications
                  </Box>
                }
              />
              <Tab
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Shield size={16} />
                    Security
                  </Box>
                }
              />
              <Tab
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Palette size={16} />
                    Preferences
                  </Box>
                }
              />
            </Tabs>
          </Box>

          {/* Profile Tab */}
          {activeTab === 0 && (
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <User size={20} />
                  Profile Information
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Update your personal information and profile details
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar sx={{ width: 80, height: 80, fontSize: 24 }}>AU</Avatar>
                <Button variant="outlined" startIcon={<Camera size={16} />}>
                  Change Photo
                </Button>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 3 }}>
                <TextField
                  label="Full Name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="Email Address"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  fullWidth
                  InputProps={{
                    startAdornment: <Mail size={16} style={{ marginRight: 8, color: '#666' }} />
                  }}
                />
                <TextField
                  label="Phone Number"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  fullWidth
                  InputProps={{
                    startAdornment: <Phone size={16} style={{ marginRight: 8, color: '#666' }} />
                  }}
                />
                <TextField
                  label="Company"
                  value={profileData.company}
                  onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                  fullWidth
                  InputProps={{
                    startAdornment: <Building size={16} style={{ marginRight: 8, color: '#666' }} />
                  }}
                />
                <TextField
                  label="Location"
                  value={profileData.location}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  fullWidth
                  sx={{ gridColumn: { md: 'span 2' } }}
                  InputProps={{
                    startAdornment: <MapPin size={16} style={{ marginRight: 8, color: '#666' }} />
                  }}
                />
                <TextField
                  label="Bio"
                  multiline
                  rows={3}
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  fullWidth
                  sx={{ gridColumn: { md: 'span 2' } }}
                />
              </Box>

              <Button onClick={handleSaveProfile} variant="contained" startIcon={<Save size={16} />}>
                Save Profile
              </Button>
            </CardContent>
          )}

          {/* Notifications Tab */}
          {activeTab === 1 && (
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Bell size={20} />
                  Notification Preferences
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Choose what notifications you want to receive
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                {Object.entries(notifications).map(([key, value]) => (
                  <Card key={key} variant="outlined" sx={{ p: 2 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={value}
                          onChange={(e) =>
                            setNotifications({ ...notifications, [key]: e.target.checked })
                          }
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500, textTransform: 'capitalize' }}>
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {key === 'emailAlerts' && 'Receive notifications via email'}
                            {key === 'smsAlerts' && 'Receive notifications via SMS'}
                            {key === 'pushNotifications' && 'Browser push notifications'}
                            {key === 'securityAlerts' && 'Security-related notifications'}
                            {key === 'systemUpdates' && 'System update notifications'}
                            {key === 'maintenanceAlerts' && 'Maintenance window alerts'}
                          </Typography>
                        </Box>
                      }
                      sx={{ width: '100%', justifyContent: 'space-between', ml: 0 }}
                    />
                  </Card>
                ))}
              </Box>

              <Button onClick={handleSaveNotifications} variant="contained" startIcon={<Save size={16} />}>
                Save Notifications
              </Button>
            </CardContent>
          )}

          {/* Security Tab */}
          {activeTab === 2 && (
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Shield size={20} />
                  Security Settings
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Manage your account security and authentication
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>Change Password</Typography>
                      <Typography variant="caption" color="text.secondary">Update your account password</Typography>
                    </Box>
                    <Button variant="outlined">Change</Button>
                  </Box>
                </Card>

                <Card variant="outlined" sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>Two-Factor Authentication</Typography>
                      <Typography variant="caption" color="text.secondary">Add an extra layer of security</Typography>
                    </Box>
                    <Chip label="Enabled" color="success" variant="outlined" />
                  </Box>
                </Card>

                <Card variant="outlined" sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>Login Sessions</Typography>
                      <Typography variant="caption" color="text.secondary">Manage active login sessions</Typography>
                    </Box>
                    <Button variant="outlined">View Sessions</Button>
                  </Box>
                </Card>
              </Box>
            </CardContent>
          )}

          {/* Preferences Tab */}
          {activeTab === 3 && (
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Palette size={20} />
                  System Preferences
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Customize your system appearance and behavior
              </Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 3 }}>
                <FormControl fullWidth>
                  <InputLabel>Theme</InputLabel>
                  <Select
                    value={preferences.theme}
                    onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
                    label="Theme"
                  >
                    <MenuItem value="light">Light</MenuItem>
                    <MenuItem value="dark">Dark</MenuItem>
                    <MenuItem value="system">System</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Language</InputLabel>
                  <Select
                    value={preferences.language}
                    onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                    label="Language"
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Spanish</MenuItem>
                    <MenuItem value="fr">French</MenuItem>
                    <MenuItem value="de">German</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Timezone</InputLabel>
                  <Select
                    value={preferences.timezone}
                    onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                    label="Timezone"
                  >
                    <MenuItem value="America/New_York">Eastern Time</MenuItem>
                    <MenuItem value="America/Chicago">Central Time</MenuItem>
                    <MenuItem value="America/Denver">Mountain Time</MenuItem>
                    <MenuItem value="America/Los_Angeles">Pacific Time</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Date Format</InputLabel>
                  <Select
                    value={preferences.dateFormat}
                    onChange={(e) => setPreferences({ ...preferences, dateFormat: e.target.value })}
                    label="Date Format"
                  >
                    <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                    <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                    <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ gridColumn: { md: 'span 2' } }}>
                  <InputLabel>Default Currency</InputLabel>
                  <Select
                    value={preferences.currency}
                    onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
                    label="Default Currency"
                  >
                    <MenuItem value="USD">USD - US Dollar</MenuItem>
                    <MenuItem value="EUR">EUR - Euro</MenuItem>
                    <MenuItem value="GBP">GBP - British Pound</MenuItem>
                    <MenuItem value="JPY">JPY - Japanese Yen</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Button onClick={handleSavePreferences} variant="contained" startIcon={<Save size={16} />}>
                Save Preferences
              </Button>
            </CardContent>
          )}
        </Card>
      </Box>
    </Container>
  );
};

export default Settings;