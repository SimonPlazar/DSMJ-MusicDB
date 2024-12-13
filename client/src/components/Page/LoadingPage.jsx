import React from 'react';
import {Box, CircularProgress, keyframes, Typography} from '@mui/material';
import {Navbar} from "./Navbar";
import {Footer} from "./Footer";
import {useTheme} from "@mui/system";
import {PageWrapper} from "./PageWrapper";

import {DEFAULT, MINIMAL, MODERN} from "../../constants/ThemeTypes";

const pulse = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
`;

const LoadingPage = ({variant, message = 'Loading...'}) => {
    const theme = useTheme();

    const variantProp = variant || theme.components?.LoadingPage?.variant || DEFAULT;

    const defaultLoading = () => (
        <PageWrapper>
            <Navbar/>
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
                <CircularProgress size={60} thickness={4} sx={{mb: 4}}/>
                <Typography variant="h5" component="h1" gutterBottom>
                    {message}
                </Typography>
            </Box>
            <Footer/>
        </PageWrapper>
    );

    const minimalLoading = () => (
        <PageWrapper
            sx={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
            }}
        >
            <CircularProgress size={40} thickness={4} />
            <Typography variant="body1" sx={{ mt: 2 }}>
                {message}
            </Typography>
        </PageWrapper>
    );

    const modernLoading = () => (
        <PageWrapper
            sx={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'background.default',
                color: 'text.primary',
            }}
        >
            <Box
                sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: 'primary.main',
                    animation: `${pulse} 1.5s ease-in-out infinite`,
                    mb: 3,
                }}
            />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {message}
            </Typography>
        </PageWrapper>
    );

    return (
        <>
            {variantProp === DEFAULT && defaultLoading()}
            {variantProp === MINIMAL && minimalLoading()}
            {variantProp === MODERN && modernLoading()}
        </>
    );
};

export default LoadingPage;

