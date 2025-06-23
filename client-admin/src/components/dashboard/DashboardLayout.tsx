
import React from 'react';
import { Sidebar } from './Sidebar';
import { Box } from '@mui/material';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />

            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        overflow: 'auto',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
};