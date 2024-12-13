import React from 'react';
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { CloudDownload } from "@mui/icons-material";
import { getSongs } from "../../../actions/songs";
import { objToXML } from "./export.js";
import { useDispatch } from "react-redux";
import { TabPanel } from "../../Page/TabPanel";

export function Export({ mainTabValue, index }) {
    const dispatch = useDispatch();
    const [isExporting, setIsExporting] = React.useState(false);

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

    return (
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
}

