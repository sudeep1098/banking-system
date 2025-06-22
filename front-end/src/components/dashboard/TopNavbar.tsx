import { useState } from "react";
import {
    AppBar,
    Toolbar,
    TextField,
    IconButton,
    Badge,
    Menu,
    MenuItem,
    Avatar,
    Typography,
    Box,
    InputAdornment,
    Divider
} from "@mui/material";
import {
    Bell,
    Search,
    Settings,
    User,
    ChevronDown
} from "lucide-react";

export const TopNavbar = () => {
    const [notifications] = useState(3);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" sx={{ bgcolor: 'white', boxShadow: 1 }}>
            <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
                {/* Search */}
                <Box sx={{ flex: 1, maxWidth: 400 }}>
                    <TextField
                        placeholder="Search users, accounts, transactions..."
                        size="small"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search size={20} color="#666" />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: '#4caf50',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#4caf50',
                                },
                            },
                        }}
                    />
                </Box>

                {/* Right side actions */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* Notifications */}
                    <IconButton>
                        <Badge badgeContent={notifications} color="error">
                            <Bell size={20} color="#666" />
                        </Badge>
                    </IconButton>

                    {/* Settings */}
                    <IconButton>
                        <Settings size={20} color="#666" />
                    </IconButton>

                    {/* User Menu */}
                    <IconButton onClick={handleUserMenuClick} sx={{ p: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ width: 32, height: 32, bgcolor: '#4caf50' }}>
                                <User size={16} />
                            </Avatar>
                            <Box sx={{ display: { xs: 'none', md: 'block' }, textAlign: 'left' }}>
                                <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
                                    John Admin
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Super Admin
                                </Typography>
                            </Box>
                            <ChevronDown size={16} color="#666" />
                        </Box>
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleUserMenuClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        <Typography variant="subtitle2" sx={{ px: 2, py: 1, fontWeight: 600 }}>
                            My Account
                        </Typography>
                        <Divider />
                        <MenuItem onClick={handleUserMenuClose}>
                            <User size={16} style={{ marginRight: 8 }} />
                            Profile
                        </MenuItem>
                        <MenuItem onClick={handleUserMenuClose}>
                            <Settings size={16} style={{ marginRight: 8 }} />
                            Settings
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleUserMenuClose} sx={{ color: 'error.main' }}>
                            Sign out
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};