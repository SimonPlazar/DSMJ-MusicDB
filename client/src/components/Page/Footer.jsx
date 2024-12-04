import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import { GitHub, Instagram, LinkedIn } from '@mui/icons-material';

export function Footer() {
    return (
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
}