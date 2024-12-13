import React, {useState} from 'react';
import {Container, Typography, Box, TextField, Button, Snackbar, Paper, Grid} from '@mui/material';
import {
    Send as SendIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    LocationOn as LocationIcon
} from '@mui/icons-material';
import {Navbar} from '../Page/Navbar';
import {Footer} from '../Page/Footer';
import {useTheme} from "@mui/system";
import {PageWrapper} from "../Page/PageWrapper";
import {DEFAULT, MODERN} from "../../constants/ThemeTypes";

export default function ContactUs({variant}) {
    const theme = useTheme();

    const variantProp = variant || theme.components?.ContactUs?.variant || DEFAULT;
    console.log('variantProp:', variantProp);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setOpenSnackbar(true);
        setFormData({name: '', email: '', message: ''});
    };

    const defaultContactUs = () => (
        <PageWrapper>
            <Navbar/>
            <Container maxWidth="md" sx={{my: 4}}>
                <Paper elevation={3} sx={{p: 4}}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Contact Us
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Have a question or feedback? We'd love to hear from you. Fill out the form below and we'll get
                        back to you as soon as possible.
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 4}}>
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
                            startIcon={<SendIcon/>}
                            sx={{mt: 2}}
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
            <Footer/>
        </PageWrapper>
    );

    const modernContactUs = () => (
        <PageWrapper>
            <Navbar/>
            <Container maxWidth="lg" sx={{my: 4, flexGrow: 1, mb: 12}}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{p: 4, height: '100%'}}>
                            <Typography variant="h4" component="h1" gutterBottom>
                                Get in Touch
                            </Typography>
                            <form onSubmit={handleSubmit}>
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
                                    startIcon={<SendIcon/>}
                                    sx={{mt: 2}}
                                >
                                    Send Message
                                </Button>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{p: 4, height: '100%', backgroundColor: '#f5f5f5'}}>
                            <Typography variant="h4" component="h2" gutterBottom>
                                Contact Information
                            </Typography>
                            <Box sx={{mt: 4}}>
                                <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                                    <PhoneIcon sx={{mr: 2}}/>
                                    <Typography>+1 (123) 456-7890</Typography>
                                </Box>
                                <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                                    <EmailIcon sx={{mr: 2}}/>
                                    <Typography>contact@musicdb.com</Typography>
                                </Box>
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <LocationIcon sx={{mr: 2}}/>
                                    <Typography>123 Music Street, Melody City, MC 12345</Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Footer/>
        </PageWrapper>
    );

    return (
        <>
            {variantProp === DEFAULT && defaultContactUs()}
            {variantProp === MODERN && modernContactUs()}
        </>
    );
}

