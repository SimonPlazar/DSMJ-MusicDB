import {
    AppBar,
    Toolbar,
    Box,
} from '@mui/material';

import {
    ImportExport as ImportExportIcon,
    // PlaylistPlay as PlaylistPlayIcon,
    // BarChart as BarChartIcon,
    // Settings as SettingsIcon,
} from '@mui/icons-material';

import {Logo} from '../Page/Logo';
import {NavbarMenu} from './Navbar/NavbarMenu';
import {Profile} from "./Navbar/Profile";
import {SelectButton} from "./Navbar/SelectButton";
import {SearchBox} from "./Navbar/SearchBox";
import React from "react";

export function Navbar({searchQuery, setSearchQuery, isSelecting, setIsSelecting}) {
    const menuItems = [
        {text: 'Import/Export', icon: <ImportExportIcon/>, path: '/import-export'},
        // {text: 'Playlists', icon: <PlaylistPlayIcon/>, path: '/playlists'},
        // {text: 'Analytics', icon: <BarChartIcon/>, path: '/analytics'},
    ];

    return (
        <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <NavbarMenu
                        menuItems={menuItems}
                    />
                    {/*<Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>*/}
                    <Logo />
                    {/*<Logo/>*/}
                </Box>

                <SearchBox
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                    <SelectButton
                        isSelecting={isSelecting}
                        setIsSelecting={setIsSelecting}
                    />
                    <Profile/>
                </Box>

            </Toolbar>
        </AppBar>
    );
}