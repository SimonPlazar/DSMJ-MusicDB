import React, { useState } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Tab,
    Tabs,
    Typography,
    Paper,
} from "@mui/material";
import { Album, CloudUpload, Description, MusicNote } from "@mui/icons-material";
import { TabPanel } from "../TabPanel";
import { extractMetadata, XMLToObj } from './import.js';
import { createMultipleSongs, createSong } from "../../../actions/songs";
import { useDispatch } from "react-redux";

export function Import({ mainTabValue, index }) {
    const [importTabValue, setImportTabValue] = useState(0);
    const [importedFiles, setImportedFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handleImportTabChange = (event, newValue) => {
        setImportTabValue(newValue);
    };

    const handleImport = async (event) => {
        const files = event.target.files;
        setIsLoading(true);
        const importedData = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.name.endsWith('.flac')) {
                try {
                    const metadata = await extractMetadata(file);
                    importedData.push(metadata);
                } catch (err) {
                    console.error(`Error reading metadata for ${file.name}:`, err);
                }
            }
        }

        if (importedData.length === 1) {
            await dispatch(createSong(importedData[0]));
        } else if (importedData.length > 1) {
            await dispatch(createMultipleSongs(importedData));
        }
        setImportedFiles(prevFiles => [...prevFiles, ...importedData]);
        setIsLoading(false);
    }

    const handleXmlImport = async (event) => {
        const file = event.target.files[0];
        setIsLoading(true);

        const reader = new FileReader();

        reader.onload = async function (e) {
            const xmlContent = e.target.result;
            const importedData = XMLToObj(xmlContent);

            if (importedData.length === 1) {
                await dispatch(createSong(importedData[0]));
            } else if (importedData.length > 1) {
                await dispatch(createMultipleSongs(importedData));
            }

            setImportedFiles(prevFiles => [...prevFiles, ...importedData]);
            setIsLoading(false);
        }

        await reader.readAsText(file);
    };

    return (
        <TabPanel value={mainTabValue} index={index}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Import Music
                </Typography>
                <Tabs
                    value={importTabValue}
                    onChange={handleImportTabChange}
                    aria-label="import tabs"
                    variant="fullWidth"
                >
                    <Tab label="Songs" id="import-tab-0" aria-controls="import-tabpanel-0" icon={<MusicNote />} />
                    <Tab label="Albums" id="import-tab-1" aria-controls="import-tabpanel-1" icon={<Album />} />
                    <Tab label="XML" id="import-tab-2" aria-controls="import-tabpanel-2" icon={<Description />} />
                </Tabs>
                <TabPanel value={importTabValue} index={0}>
                    <input
                        accept=".flac"
                        style={{ display: 'none' }}
                        id="song-file-input"
                        multiple
                        type="file"
                        onChange={handleImport}
                    />
                    <label htmlFor="song-file-input">
                        <Button variant="contained" component="span" startIcon={<CloudUpload />} fullWidth>
                            Upload Songs
                        </Button>
                    </label>
                </TabPanel>
                <TabPanel value={importTabValue} index={1}>
                    <input
                        accept="."
                        style={{ display: 'none' }}
                        id="album-folder-input"
                        type="file"
                        webkitdirectory="true"
                        onChange={handleImport}
                    />
                    <label htmlFor="album-folder-input">
                        <Button variant="contained" component="span" startIcon={<CloudUpload />} fullWidth>
                            Upload Album Folder
                        </Button>
                    </label>
                </TabPanel>
                <TabPanel value={importTabValue} index={2}>
                    <input
                        accept=".xml"
                        style={{ display: 'none' }}
                        id="xml-file-input"
                        type="file"
                        onChange={handleXmlImport}
                    />
                    <label htmlFor="xml-file-input">
                        <Button variant="contained" component="span" startIcon={<CloudUpload />} fullWidth>
                            Upload XML
                        </Button>
                    </label>
                </TabPanel>
                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                ) : importedFiles.length > 0 ? (
                    <Paper variant="outlined" sx={{ mt: 2, maxHeight: 200, overflow: 'auto' }}>
                        <List>
                            {importedFiles.map((file, index) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={file.tags.title}
                                        secondary={`${file.tags.artist} - ${file.tags.album}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                ) : (
                    <Typography variant="body2" color="text.secondary" align="center">
                        No files imported yet. Use the buttons above to import your music.
                    </Typography>
                )}
            </Box>
        </TabPanel>
    );
}

