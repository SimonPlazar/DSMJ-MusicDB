import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { Navbar } from '../Page/Navbar';
import { Footer } from '../Page/Footer';

export default function TermsOfService() {
    return (
        <>
            <Navbar />
            <Container maxWidth="md" sx={{ my: 4 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Terms of Service
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Last updated: {new Date().toLocaleDateString()}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Welcome to MusicDB. By using our service, you agree to these Terms of Service. Please read them carefully.
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        1. Use of Service
                    </Typography>
                    <Typography variant="body1" paragraph>
                        You must be at least 13 years old to use MusicDB. You are responsible for maintaining the confidentiality of your account and password.
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        2. User Content
                    </Typography>
                    <Typography variant="body1" paragraph>
                        You retain ownership of any content you upload to MusicDB. By uploading content, you grant us a license to use, store, and share that content in connection with providing our service.
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        3. Prohibited Activities
                    </Typography>
                    <Typography variant="body1" paragraph>
                        You agree not to misuse our services or help anyone else do so. For example, you must not attempt to access our services using a method other than the interface and instructions we provide.
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        4. Termination
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We may suspend or terminate your access to MusicDB if you violate these Terms of Service or for any other reason at our discretion.
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        5. Changes to Terms
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We may modify these Terms of Service at any time. We'll post notice of modifications on this page. Your continued use of MusicDB after any changes constitutes acceptance of those changes.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        If you have any questions about these Terms, please contact us.
                    </Typography>
                </Paper>
            </Container>
            <Footer />
        </>
    );
}

