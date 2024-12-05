import {Box, Button, Typography} from "@mui/material";
import {CloudDownload} from "@mui/icons-material";
import React from "react";
import {getSongs} from "../../../actions/songs";
import {objToXML} from "./export.js";
import {useDispatch} from "react-redux";

import {TabPanel} from "../TabPanel";


export function Export ({mainTabValue, index}) {
    const dispatch = useDispatch();

    const handleExport = async () => {
        let songs = [];
        try {
            songs = await dispatch(getSongs());
        } catch (error) {
            console.error('Error fetching songs:', error);
            return;
        }

        // console.log('Fetched Songs:', songs);

        const xmlContent = objToXML(songs);

        const blob = new Blob([xmlContent], {type: 'text/xml'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'music_library.xml';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <TabPanel value={mainTabValue} index={index}>
            <Box sx={{px: 3, pb: 3}}>
                <Box sx={{mt: 2}}>
                    <Button variant="contained" onClick={handleExport} startIcon={<CloudDownload/>}>
                        Export Library
                    </Button>
                </Box>
                <Typography variant="body1" sx={{mt: 2}}>
                    Click the button above to export your entire music library as an XML file.
                </Typography>
            </Box>
        </TabPanel>
    );
}
