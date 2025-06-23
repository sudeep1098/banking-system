import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)'
        }}>
            <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
                <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 'bold', color: '#1976d2', mb: 2 }}>
                    404
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Page Not Found
                </Typography>
                <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>
                    The page you are looking for doesn't exist or has been moved.
                </Typography>
                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    startIcon={<Home size={20} />}
                    sx={{ background: 'linear-gradient(135deg, #1976d2, #42a5f5)' }}
                >
                    Go Back Home
                </Button>
            </Container>
        </Box>
    );
};

export default NotFound;