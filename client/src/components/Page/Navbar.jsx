import React from 'react';
import { AppBar, Toolbar, Typography} from '@mui/material';
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

