import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Tabs,
    Tab,
    Paper,
    Grid,
} from '@mui/material';
import { ImportExport as ImportExportIcon } from '@mui/icons-material';
import { Navbar } from '../Page/Navbar';
import { Footer } from '../Page/Footer';
import { Export } from './Export/Export.jsx';
import { Import } from './Import/Import.jsx';

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
            bgcolor: 'background.default',
        }}>
            <Navbar />
            <Container maxWidth="lg" sx={{ my: 4, flexGrow: 1, mb: 10 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <ImportExportIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
                                <Typography variant="h4" component="h1">
                                    Import / Export
                                </Typography>
                            </Box>
                            <Typography variant="body1" color="text.secondary" paragraph>
                                Manage your music library by importing new songs or exporting your collection.
                            </Typography>
                            <Tabs
                                value={mainTabValue}
                                onChange={handleMainTabChange}
                                aria-label="import export tabs"
                                orientation="vertical"
                                sx={{ borderRight: 1, borderColor: 'divider' }}
                            >
                                <Tab label="Import" id="main-tab-0" aria-controls="main-tabpanel-0" />
                                <Tab label="Export" id="main-tab-1" aria-controls="main-tabpanel-1" />
                            </Tabs>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                            <Import
                                mainTabValue={mainTabValue}
                                index={0}
                            />
                            <Export
                                mainTabValue={mainTabValue}
                                index={1}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </Box>
    );
}

