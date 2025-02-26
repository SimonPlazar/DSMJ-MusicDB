import React, {useState} from 'react';
import {
    Container,
    Typography,
    Box,
    Tabs,
    Tab,
    Paper,
    Grid,
} from '@mui/material';
import {CloudDownload, CloudUpload, ImportExport as ImportExportIcon} from '@mui/icons-material';
import {Navbar} from '../Page/Navbar';
import {Footer} from '../Page/Footer';
import {Export} from './Export/Export.jsx';
import {Import} from './Import/Import.jsx';
import {useTheme} from "@mui/system";
import {PageWrapper} from "../Page/PageWrapper";
import {DEFAULT, MINIMAL, MODERN} from "../../constants/ThemeTypes";

export default function ImportExport({variant}) {
    const [mainTabValue, setMainTabValue] = useState(0);
    const theme = useTheme();

    const handleMainTabChange = (event, newValue) => {
        setMainTabValue(newValue);
    };

    const variantProp = variant || theme.components?.ImportExport?.variant || DEFAULT;
    // console.log('ImportExport variant:', variantProp);

    const defaultIO = () => (
        <PageWrapper sx={{bgcolor: 'background.default'}}>
            <Navbar/>
            <Container maxWidth="lg" sx={{my: 4, flexGrow: 1, mb: 10}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{p: 3, height: '100%'}}>
                            <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                                <ImportExportIcon sx={{fontSize: 40, mr: 2, color: 'primary.main'}}/>
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
                                sx={{borderRight: 1, borderColor: 'divider'}}
                            >
                                <Tab label="Import" id="main-tab-0" aria-controls="main-tabpanel-0"/>
                                <Tab label="Export" id="main-tab-1" aria-controls="main-tabpanel-1"/>
                            </Tabs>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Paper elevation={3} sx={{p: 3, height: '100%'}}>
                            <Import
                                mainTabValue={mainTabValue}
                                index={0}
                                variant={DEFAULT}
                            />
                            <Export
                                mainTabValue={mainTabValue}
                                index={1}
                                variant={DEFAULT}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Footer/>
        </PageWrapper>
    );

    const ImportExportCards = () => (
        <PageWrapper sx={{bgcolor: 'background.default'}}>
            <Navbar/>
            <Container maxWidth="lg" sx={{my: 4, flexGrow: 1}}>
                <Paper elevation={3} sx={{p: 3, mb: 3}}>
                    <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                        <ImportExportIcon sx={{fontSize: 40, mr: 2, color: 'primary.main'}}/>
                        <Typography variant="h4" component="h1">
                            Manage Your Music Library
                        </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                        Import new songs or export your collection with ease.
                    </Typography>
                </Paper>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Import variant={MODERN}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Export variant={MODERN}/>
                    </Grid>
                </Grid>
            </Container>
            <Footer/>
        </PageWrapper>
    );

    const ImportExportTabs = () => (
        <PageWrapper sx={{bgcolor: 'background.default'}}>
            <Navbar/>
            <Container maxWidth="md" sx={{my: 4, flexGrow: 1}}>
                <Paper elevation={3} sx={{p: 3}}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider', mb: 3}}>
                        <Tabs value={mainTabValue} onChange={handleMainTabChange} aria-label="import export tabs">
                            <Tab icon={<CloudUpload/>} label="Import"/>
                            <Tab icon={<CloudDownload/>} label="Export"/>
                        </Tabs>
                    </Box>
                    {mainTabValue === 0 && <Import variant={MINIMAL}/>}
                    {mainTabValue === 1 && <Export variant={MINIMAL}/>}
                </Paper>
            </Container>
            <Footer/>
        </PageWrapper>
    );


    return (
        <>
            {variantProp === DEFAULT && defaultIO()}
            {variantProp === MINIMAL && ImportExportTabs()}
            {variantProp === MODERN && ImportExportCards()}
        </>
    );
}

