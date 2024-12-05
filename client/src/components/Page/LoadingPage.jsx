import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const LoadingPage = ({ message = 'Loading...' }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <Navbar />
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 2,
                }}
            >
                <CircularProgress size={60} thickness={4} sx={{ mb: 4 }} />
                <Typography variant="h5" component="h1" gutterBottom>
                    {message}
                </Typography>
            </Box>
            <Footer />
        </Box>
    );
};

export default LoadingPage;

