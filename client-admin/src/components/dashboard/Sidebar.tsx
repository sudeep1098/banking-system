
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
    Users,
    CreditCard,
    Settings,
    Shield,
    FileText,
    Coins,
    BellRing,
    ChevronLeft,
    ChevronRight,
    Grid2X2,
    User,
    LogOut
} from "lucide-react";
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    Typography,
    IconButton,
    Avatar
} from "@mui/material";

const navigationItems = [
    { title: "Dashboard", url: "/", icon: Grid2X2 },
    { title: "User Management", url: "/users", icon: Users },
    { title: "Account Management", url: "/accounts", icon: CreditCard },
    { title: "Transactions", url: "/transactions", icon: Coins },
    { title: "Roles & Permissions", url: "/roles", icon: Shield },
    { title: "Audit Logs", url: "/audit", icon: FileText },
    { title: "System Alerts", url: "/alerts", icon: BellRing },
    { title: "Settings", url: "/settings", icon: Settings },
];

export const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const isActive = (path: string) => {
        if (path === "/" && location.pathname === "/") return true;
        if (path !== "/" && location.pathname.startsWith(path)) return true;
        return false;
    };

    const drawerWidth = collapsed ? 80 : 256;
    const drawerRootWidth = collapsed ? 20 : 200;

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerRootWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    bgcolor: '#1976d2',
                    color: 'white',
                    transition: 'width 0.3s ease-in-out',
                },
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Header */}
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    {!collapsed && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{
                                width: 32,
                                height: 32,
                                bgcolor: '#ff9800',
                                borderRadius: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>
                                    BP
                                </Typography>
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                BankPro
                            </Typography>
                        </Box>
                    )}
                    <IconButton
                        onClick={() => setCollapsed(!collapsed)}
                        sx={{ color: 'white' }}
                    >
                        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </IconButton>
                </Box>

                {/* Navigation */}
                <Box sx={{ flex: 1, py: 2 }}>
                    <List>
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.url);

                            return (
                                <ListItem key={item.title} disablePadding sx={{ px: 1 }}>
                                    <ListItemButton
                                        component={NavLink}
                                        to={item.url}
                                        sx={{
                                            borderRadius: 1,
                                            mx: 1,
                                            mb: 0.5,
                                            bgcolor: active ? '#ff9800' : 'transparent',
                                            '&:hover': {
                                                bgcolor: active ? '#ff9800' : 'rgba(255,255,255,0.1)',
                                            },
                                            minHeight: 48,
                                            justifyContent: collapsed ? 'center' : 'flex-start',
                                            px: collapsed ? 1 : 2,
                                        }}
                                    >
                                        <ListItemIcon sx={{
                                            color: 'white',
                                            minWidth: collapsed ? 'unset' : 40,
                                            mr: collapsed ? 0 : 1
                                        }}>
                                            <Icon size={20} />
                                        </ListItemIcon>
                                        {!collapsed && (
                                            <ListItemText
                                                primary={item.title}
                                                sx={{
                                                    '& .MuiListItemText-primary': {
                                                        fontSize: '0.9rem',
                                                        fontWeight: 500
                                                    }
                                                }}
                                            />
                                        )}
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>

                {/* User Profile */}
                <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: collapsed ? 'center' : 'space-between'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 1 }}>
                            <Avatar sx={{ width: 32, height: 32, bgcolor: '#ff9800' }}>
                                <User size={16} />
                            </Avatar>
                            {!collapsed && (
                                <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        Admin User
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                        admin@bankpro.com
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                        {!collapsed && (
                            <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                <LogOut size={16} />
                            </IconButton>
                        )}
                    </Box>
                </Box>
            </Box>
        </Drawer>
    );
};