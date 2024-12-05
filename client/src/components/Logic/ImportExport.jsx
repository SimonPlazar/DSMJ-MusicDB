import React, {useState} from 'react';
import {
    Container,
    Typography,
    Box,
    Tabs,
    Tab,
    Paper,
} from '@mui/material';

import {Navbar} from '../Page/Navbar';
import {Footer} from '../Page/Footer';

import {Export} from './Export/Export.jsx';
import {Import} from './Import/Import.jsx';

export default function ImportExport() {
    const [mainTabValue, setMainTabValue] = useState(0);

    const handleMainTabChange = (event, newValue) => {
        setMainTabValue(newValue);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        }}>
            <Navbar/>
            <Container maxWidth="md" sx={{my: 4}}>
                <Paper elevation={3}>
                    <Typography variant="h4" component="h1" gutterBottom sx={{px: 3, pt: 3}}>
                        Import / Export
                    </Typography>
                    <Box sx={{borderBottom: 1, borderColor: 'divider', px: 3}}>
                        <Tabs value={mainTabValue} onChange={handleMainTabChange} aria-label="import export tabs">
                            <Tab label="Import" id="main-tab-0" aria-controls="main-tabpanel-0"/>
                            <Tab label="Export" id="main-tab-1" aria-controls="main-tabpanel-1"/>
                        </Tabs>
                    </Box>
                    <Import
                        mainTabValue={mainTabValue}
                        index={0}
                    />
                    <Export
                        mainTabValue={mainTabValue}
                        index={1}
                    />
                </Paper>
            </Container>
            <Footer/>
        </Box>
    );
}

