import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { Navbar } from '../Page/Navbar';
import { Footer } from '../Page/Footer';

export default function PrivacyPolicy() {
    return (
        <>
            <Navbar />
            <Container maxWidth="md" sx={{ my: 4 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Privacy Policy
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Last updated: {new Date().toLocaleDateString()}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        At MusicDB, we take your privacy seriously. This Privacy Policy describes how we collect, use, and share your personal information when you use our service.
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Information We Collect
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We collect information you provide directly to us, such as when you create an account, upload music, or contact us for support. This may include your name, email address, and music listening history.
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        How We Use Your Information
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to personalize your experience on MusicDB.
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Sharing Your Information
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We do not sell your personal information. We may share your information with third-party service providers who help us operate our service or as required by law.
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Your Rights
                    </Typography>
                    <Typography variant="body1" paragraph>
                        You have the right to access, correct, or delete your personal information. Please contact us if you wish to exercise these rights.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        For more information about our privacy practices, please contact us.
                    </Typography>
                </Paper>
            </Container>
            <Footer />
        </>
    );
}

