import React, {useEffect} from 'react';
import {Box, Button, Container, Typography, Grid, Card, CardContent, AppBar, Toolbar} from '@mui/material';
import {styled} from '@mui/material/styles';
import {Link, useNavigate} from 'react-router-dom';
import {LibraryMusic, PlaylistAdd, BarChart, CloudUpload, Search, Headphones} from '@mui/icons-material';
import {Logo} from './Logo';
import {Footer} from './Footer';
import {useSelector} from "react-redux";
import Loading from './LoadingPage';


const HeroSection = styled(Box)(({theme}) => ({
    backgroundImage: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
    color: theme.palette.common.white,
    padding: theme.spacing(15, 0),
    position: 'relative',
    overflow: 'hidden',
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url(/music-notes-pattern.png) repeat',
        opacity: 0.1,
        zIndex: 1,
    },
}));

const FeatureCard = styled(Card)(({theme}) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[4],
    },
}));

const FeatureIcon = styled(Box)(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
}));

const StyledAppBar = styled(AppBar)(({theme}) => ({
    background: 'transparent',
    boxShadow: 'none',
}));

export default function LandingPage() {
    const {user, loading} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && user) {
            navigate('/dashboard');
        }
    }, [user, loading, navigate]);

    if (loading) {
        return <Loading/>;
    }

    return (
        <Box>
            <StyledAppBar position="absolute">
                <Toolbar>
                    <Logo/>
                    <Box sx={{flexGrow: 1}}/>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                </Toolbar>
            </StyledAppBar>

            <HeroSection>
                <Container maxWidth="md" sx={{position: 'relative', zIndex: 2}}>
                    <Typography component="h1" variant="h2" align="center" gutterBottom fontWeight="bold">
                        Welcome to MusicDB
                    </Typography>
                    <Typography variant="h5" align="center" paragraph>
                        Your personal music library manager and analytics platform
                    </Typography>
                    <Box sx={{mt: 4, display: 'flex', justifyContent: 'center'}}>
                        <Button variant="contained" color="secondary" component={Link} to="/login" size="large"
                                sx={{mr: 2}}>
                            Get Started
                        </Button>
                    </Box>
                </Container>
            </HeroSection>

            <Container sx={{py: 8}} maxWidth="lg">
                <Typography variant="h4" align="center" gutterBottom>
                    Features
                </Typography>
                <Grid container spacing={4}>
                    {[
                        {
                            icon: <LibraryMusic fontSize="large"/>,
                            title: "Organize Your Music",
                            description: "Easily manage your entire music collection in one place. Sort, filter, and categorize your songs effortlessly."
                        },
                        {
                            icon: <PlaylistAdd fontSize="large"/>,
                            title: "Create Playlists",
                            description: "Build and manage playlists with ease. Discover new ways to enjoy your music collection."
                        },
                        {
                            icon: <BarChart fontSize="large"/>,
                            title: "Analyze Your Listening",
                            description: "Get insights into your music preferences with detailed statistics and visualizations."
                        },
                        {
                            icon: <CloudUpload fontSize="large"/>,
                            title: "Cloud Sync",
                            description: "Access your music library from anywhere. Your data is securely stored and synced across all your devices."
                        },
                        {
                            icon: <Search fontSize="large"/>,
                            title: "Advanced Search",
                            description: "Find any song in your collection instantly with our powerful search and filter capabilities."
                        },
                        {
                            icon: <Headphones fontSize="large"/>,
                            title: "Personalized Recommendations",
                            description: "Discover new music based on your listening habits and preferences."
                        },
                    ].map((feature, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <FeatureCard>
                                <CardContent>
                                    <FeatureIcon>
                                        {feature.icon}
                                    </FeatureIcon>
                                    <Typography gutterBottom variant="h5" component="h2" align="center">
                                        {feature.title}
                                    </Typography>
                                    <Typography align="center" color="text.secondary">
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                            </FeatureCard>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Box sx={{bgcolor: 'background.paper', py: 8}}>
                <Container maxWidth="sm">
                    <Typography variant="h4" align="center" gutterBottom>
                        Ready to get started?
                    </Typography>
                    <Typography variant="body1" align="center" paragraph>
                        Join thousands of music enthusiasts who are already using MusicDB to manage their music
                        collections and discover new favorites.
                    </Typography>
                    <Box sx={{mt: 4, display: 'flex', justifyContent: 'center'}}>
                        <Button variant="contained" color="primary" component={Link} to="/login" size="large">
                            Sign In Now
                        </Button>
                    </Box>
                </Container>
            </Box>

            <Footer/>
        </Box>
    );
}

