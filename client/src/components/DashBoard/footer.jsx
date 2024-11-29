import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import { GitHub, Twitter, LinkedIn } from '@mui/icons-material';

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
                        <Link href="#" color="inherit" sx={{ mx: 1 }}>
                            Privacy Policy
                        </Link>
                        <Link href="#" color="inherit" sx={{ mx: 1 }}>
                            Terms of Service
                        </Link>
                        <Link href="#" color="inherit" sx={{ mx: 1 }}>
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
                    <IconButton color="inherit" aria-label="GitHub" component="a" href="#">
                        <GitHub />
                    </IconButton>
                    <IconButton color="inherit" aria-label="Twitter" component="a" href="#">
                        <Twitter />
                    </IconButton>
                    <IconButton color="inherit" aria-label="LinkedIn" component="a" href="#">
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