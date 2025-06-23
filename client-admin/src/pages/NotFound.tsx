import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <Card className="max-w-md w-full">
                <CardContent className="text-center p-8">
                    <Typography variant="h1" className="text-6xl font-bold text-gray-400 mb-4">
                        404
                    </Typography>
                    <Typography variant="h5" className="font-bold mb-2">
                        Oops! Page not found
                    </Typography>
                    <Typography variant="body1" className="text-gray-600 mb-6">
                        The page you're looking for doesn't exist or has been moved.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<HomeIcon />}
                        onClick={() => navigate('/')}
                        className="shadow-md"
                    >
                        Return to Dashboard
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default NotFound;