import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Snackbar, Paper } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { Navbar } from '../Page/Navbar';
import { Footer } from '../Page/Footer';

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement form submission logic here
        console.log('Form submitted:', formData);
        setOpenSnackbar(true);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <>
            <Navbar />
            <Container maxWidth="md" sx={{ my: 4 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Contact Us
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Have a question or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Message"
                            name="message"
                            multiline
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<SendIcon />}
                            sx={{ mt: 2 }}
                        >
                            Send Message
                        </Button>
                    </Box>
                </Paper>
            </Container>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                message="Message sent successfully!"
            />
            <Footer />
        </>
    );
}

