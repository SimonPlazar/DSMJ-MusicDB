import React from 'react';
import { Box, Button, Container, Typography, AppBar, Toolbar, Link } from '@mui/material';

const LandingPage = () => {
    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', textAlign: 'center' }}>
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Music Database
                    </Typography>
                    <Button color="inherit" href="/dashboard">Dashboard</Button>
                    <Button color="inherit" href="/login">Login</Button>
                    <Button color="inherit" href="/register">Register</Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="md" sx={{ mt: 8 }}>
                <Typography variant="h2" gutterBottom>
                    Welcome to Music Database
                </Typography>
                <Typography variant="h5" color="textSecondary" paragraph>
                    Discover and manage your music collection effortlessly.
                </Typography>
                <Box sx={{ mt: 4 }}>
                    <Button variant="contained" color="primary" size="large" href="/dashboard" sx={{ mx: 1 }}>
                        Go to Dashboard
                    </Button>
                    <Button variant="outlined" color="primary" size="large" href="/register" sx={{ mx: 1 }}>
                        Sign Up
                    </Button>
                    <Button variant="outlined" color="secondary" size="large" href="/login" sx={{ mx: 1 }}>
                        Log In
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default LandingPage;
