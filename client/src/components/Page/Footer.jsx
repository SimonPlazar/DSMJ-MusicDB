import {Box, Container, Typography, Link, IconButton, Grid} from '@mui/material';
import { GitHub, Instagram, LinkedIn } from '@mui/icons-material';
import { useTheme } from '@mui/system';

import {DEFAULT, MINIMAL, MODERN} from "../../constants/ThemeTypes";

export function Footer({variant}) {
    const theme = useTheme();

    const variantProp = variant || theme.components?.Footer?.variant || DEFAULT;

    const defaultFooter = () => (
        <Box
            component="footer"
            sx={{
                py: 3,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
                width: '100%',
                bottom: 0,
            }}
        >
            <Container maxWidth={false}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        © {new Date().getFullYear()} MusicDB. All rights reserved.
                    </Typography>
                    <Box>
                        <Link href="privacy" color="inherit" sx={{ mx: 1 }}>
                            Privacy Policy
                        </Link>
                        <Link href="tos" color="inherit" sx={{ mx: 1 }}>
                            Terms of Service
                        </Link>
                        <Link href="contact" color="inherit" sx={{ mx: 1 }}>
                            Contact Us
                        </Link>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mt: 2,
                    }}
                >
                    <IconButton color="inherit" aria-label="GitHub" component="a" href="https://github.com/SimonPlazar/music-db" target="_blank">
                        <GitHub />
                    </IconButton>
                    <IconButton color="inherit" aria-label="Instagram" component="a" href="https://www.instagram.com/simon_plazar/" target="_blank">
                        <Instagram />
                    </IconButton>
                    <IconButton color="inherit" aria-label="LinkedIn" component="a" href="https://www.linkedin.com/in/simon-plazar-56bb62285/" target="_blank">
                        <LinkedIn />
                    </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                    Made with ❤️ by the MusicDB Team
                </Typography>
            </Container>
        </Box>
    );

    const minimalFooter = () => (
        <Box
            component="footer"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
                py: 3,
                borderTop: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="body2" color="text.secondary" align="center">
                    © {new Date().getFullYear()} MusicDB
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                    <Link href="/privacy" color="inherit" sx={{ mx: 1 }}>
                        Privacy
                    </Link>
                    <Link href="/tos" color="inherit" sx={{ mx: 1 }}>
                        Terms
                    </Link>
                    <Link href="/contact" color="inherit" sx={{ mx: 1 }}>
                        Contact
                    </Link>
                </Typography>
            </Container>
        </Box>
    );

    const modernFooter = () => (
        <Box
            component="footer"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
                // color: theme.palette.primary.contrastText,
                py: 6,
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            MusicDB
                        </Typography>
                        <Typography variant="body2">
                            Discover, organize, and enjoy your music like never before.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Quick Links
                        </Typography>
                        <Link href="/" color="inherit" display="block">Home</Link>
                        <Link href="/tos" color="inherit" display="block">Terms of Service</Link>
                        <Link href="/privacy" color="inherit" display="block">Privacy</Link>
                        <Link href="/contact" color="inherit" display="block">Contact</Link>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Connect With Us
                        </Typography>
                        <IconButton color="inherit" aria-label="GitHub" component="a" href="https://github.com/SimonPlazar/music-db" target="_blank">
                            <GitHub />
                        </IconButton>
                        <IconButton color="inherit" aria-label="Instagram" component="a" href="https://www.instagram.com/simon_plazar/" target="_blank">
                            <Instagram />
                        </IconButton>
                        <IconButton color="inherit" aria-label="LinkedIn" component="a" href="https://www.linkedin.com/in/simon-plazar-56bb62285/" target="_blank">
                            <LinkedIn />
                        </IconButton>
                    </Grid>
                </Grid>
                <Box mt={4} borderTop={1} pt={2} textAlign="center">
                    <Typography variant="body2">
                        © {new Date().getFullYear()} MusicDB. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );

    return (
        <>
            {variantProp === DEFAULT && defaultFooter()}
            {variantProp === MINIMAL && minimalFooter()}
            {variantProp === MODERN && modernFooter()}
        </>
    );


}