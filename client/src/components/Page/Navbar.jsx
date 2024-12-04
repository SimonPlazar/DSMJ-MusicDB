import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Logo } from './Logo';

export function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Logo />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }} />
            </Toolbar>
        </AppBar>
    );
}

