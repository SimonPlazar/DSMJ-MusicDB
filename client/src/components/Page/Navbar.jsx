import {AppBar, Button, Toolbar, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {Box, useTheme} from "@mui/system";
import {Link} from 'react-router-dom';
import {Logo} from './Logo';
import {useSelector} from "react-redux";
import {DEFAULT, MINIMAL, MODERN} from "../../constants/ThemeTypes";

export function Navbar({variant, showlogin = true}) {
    const {user, loading} = useSelector((state) => state.auth);

    const theme = useTheme();

    const variantProp = variant || theme.components?.Navbar?.variant || DEFAULT;

    const [blurValue, setBlurValue] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const maxBlur = 10;
            const startScroll = 50;
            const endScroll = 300;

            const calculatedBlur = Math.min(
                maxBlur,
                ((scrollTop - startScroll) / (endScroll - startScroll)) * maxBlur
            );

            setBlurValue(scrollTop > startScroll ? Math.max(0, calculatedBlur) : 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const defaultNav = () => (
        <AppBar position="static">
            <Toolbar>
                <Logo/>
                <Typography variant="h6" component="div" sx={{flexGrow: 1, ml: 2}}/>
                {showlogin && !user && !loading && (
                    <Button variant="outlined" color="primary" component={Link} to="/login" sx={{ml: 2}}>
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );

    const transparentNav = () => (
        <Box sx={{
            mb: 5,
        }}>
            <AppBar
                position="fixed"
                color="transparent"
                elevation={0}
                sx={{
                    // backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
                    transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease',
                    backdropFilter: `blur(${blurValue}px)`,
                }}
            >
                <Toolbar>
                    <Logo/>
                    <Box sx={{flexGrow: 1}}/>
                    {showlogin && !user && !loading && (
                        <Button variant="outlined" color="primary" component={Link} to="/login" sx={{ml: 2}}>
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );

    const centeredNav = () => (
        <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar sx={{justifyContent: 'space-between', flexWrap: 'wrap'}}>
                <Logo/>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1}}>
                </Box>
                {showlogin && !user && !loading && (
                    <Button variant="outlined" color="primary" component={Link} to="/login" sx={{ml: 2}}>
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );

    return (
        <>
            {variantProp === DEFAULT && defaultNav()}
            {variantProp === MINIMAL && centeredNav()}
            {variantProp === MODERN && transparentNav()}
        </>
    );
}

