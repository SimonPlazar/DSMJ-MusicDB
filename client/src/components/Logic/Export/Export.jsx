import React from 'react';
import {Box, Button, Typography, CircularProgress, Card, CardContent, CardActions, Paper} from "@mui/material";
import {CloudDownload, MusicNote} from "@mui/icons-material";
import { getSongs } from "../../../actions/songs";
import { objToXML } from "./export.js";
import { useDispatch } from "react-redux";
import { TabPanel } from "../../Page/TabPanel";
import {DEFAULT, MINIMAL, MODERN} from "../../../constants/ThemeTypes";

export function Export({ mainTabValue, index, variant }) {
    const dispatch = useDispatch();
    const [isExporting, setIsExporting] = React.useState(false);

    const variantProp = variant || DEFAULT;

    const handleExport = async () => {
        setIsExporting(true);
        let songs = [];
        try {
            songs = await dispatch(getSongs());
            const xmlContent = objToXML(songs);
            const blob = new Blob([xmlContent], { type: 'text/xml' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'music_library.xml';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error exporting songs:', error);
        } finally {
            setIsExporting(false);
        }
    };

    const defaultExport = () => (
        <TabPanel value={mainTabValue} index={index}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Export Your Music Library
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleExport}
                    startIcon={isExporting ? <CircularProgress size={24} color="inherit" /> : <CloudDownload />}
                    disabled={isExporting}
                >
                    {isExporting ? 'Exporting...' : 'Export Library'}
                </Button>
                <Typography variant="body2" color="text.secondary" align="center">
                    Click the button above to export your entire music library as an XML file.
                    This process may take a few moments depending on the size of your library.
                </Typography>
            </Box>
        </TabPanel>
    );

    const modernExport = () => (
        <Paper elevation={0} sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                    Export Library
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleExport}
                    startIcon={isExporting ? <CircularProgress size={20} color="inherit" /> : <CloudDownload />}
                    disabled={isExporting}
                    sx={{
                        backgroundColor: '#4caf50',
                        '&:hover': {
                            backgroundColor: '#45a049',
                        },
                    }}
                >
                    {isExporting ? 'Exporting...' : 'Export as XML'}
                </Button>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ maxWidth: 300 }}>
                    Download your entire music collection as an XML file with a single click.
                </Typography>
            </Box>
        </Paper>
    );

    const minimalExport = () => (
        <Card sx={{ maxWidth: 345, m: 'auto', boxShadow: 3 }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <MusicNote sx={{ fontSize: 40, color: 'primary.main', mr: 1 }} />
                    <Typography variant="h5" component="div">
                        Export Your Tunes
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    Create a backup of your entire music library in XML format. Perfect for safekeeping or transferring to another system.
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleExport}
                    startIcon={isExporting ? <CircularProgress size={24} color="inherit" /> : <CloudDownload />}
                    disabled={isExporting}
                    sx={{
                        backgroundColor: '#3f51b5',
                        '&:hover': {
                            backgroundColor: '#303f9f',
                        },
                    }}
                >
                    {isExporting ? 'Exporting...' : 'Export Library'}
                </Button>
            </CardActions>
        </Card>
    );

    return (
        <>
            {variantProp === DEFAULT && defaultExport()}
            {variantProp === MINIMAL && minimalExport()}
            {variantProp === MODERN && modernExport()}
        </>
    );
}

