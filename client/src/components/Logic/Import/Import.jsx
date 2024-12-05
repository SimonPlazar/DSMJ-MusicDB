import {Box, Button, CircularProgress, List, ListItem, ListItemText, Tab, Tabs} from "@mui/material";
import {Album, CloudUpload, Description, MusicNote} from "@mui/icons-material";
import {TabPanel} from "../TabPanel";
import React, {useState} from "react";

import {extractMetadata, XMLToObj} from './import.js';
import {createMultipleSongs, createSong} from "../../../actions/songs";
import {useDispatch} from "react-redux";


export function Import ({mainTabValue, index}) {
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

        console.log(importedData);

        if (importedData.length === 1) {
            console.log("Creating single song");
            await dispatch(createSong(importedData[0]));
        } else if (importedData.length > 1) {
            console.log("Creating multiple songs");
            await dispatch(createMultipleSongs(importedData));
        }
        setImportedFiles(prevFiles => [...prevFiles, ...importedData]);
        setIsLoading(false);
    }

    const handleXmlImport = async (event) => {
        const file = event.target.files[0];
        setIsLoading(true);

        const reader = new FileReader(); // Create a new FileReader instance

        reader.onload = async function (e) {
            const xmlContent = e.target.result;

            const importedData = XMLToObj(xmlContent);

            console.log('Imported Data inside:', importedData);

            if (importedData.length === 1) {
                console.log("Creating single song");
                await dispatch(createSong(importedData[0]));
            } else if (importedData.length > 1) {
                console.log("Creating multiple songs");
                await dispatch(createMultipleSongs(importedData));
            }

            setImportedFiles(prevFiles => [...prevFiles, ...importedData]);
            setIsLoading(false);

            return importedData;
        }

        await reader.readAsText(file);
    };

    return (
        <TabPanel value={mainTabValue} index={index}>
            <Box sx={{borderBottom: 1, borderColor: 'divider', px: 3}}>
                <Tabs value={importTabValue} onChange={handleImportTabChange} aria-label="import tabs">
                    <Tab label="Songs" id="import-tab-0" aria-controls="import-tabpanel-0"
                         icon={<MusicNote/>} iconPosition="start"/>
                    <Tab label="Albums" id="import-tab-1" aria-controls="import-tabpanel-1" icon={<Album/>}
                         iconPosition="start"/>
                    <Tab label="XML" id="import-tab-2" aria-controls="import-tabpanel-2"
                         icon={<Description/>} iconPosition="start"/>
                </Tabs>
            </Box>
            <TabPanel value={importTabValue} index={0}>
                <Box sx={{px: 3, pb: 3}}>
                    <Box sx={{mt: 2}}>
                        <input
                            accept=".flac"
                            style={{display: 'none'}}
                            id="song-file-input"
                            multiple
                            type="file"
                            onChange={handleImport}
                        />
                        <label htmlFor="song-file-input">
                            <Button variant="contained" component="span" startIcon={<CloudUpload/>}>
                                Upload Songs
                            </Button>
                        </label>
                    </Box>
                </Box>
            </TabPanel>
            <TabPanel value={importTabValue} index={1}>
                <Box sx={{px: 3, pb: 3}}>
                    <Box sx={{mt: 2}}>
                        <input
                            accept="."
                            style={{display: 'none'}}
                            id="album-folder-input"
                            type="file"
                            webkitdirectory="true"
                            onChange={handleImport}
                        />
                        <label htmlFor="album-folder-input">
                            <Button variant="contained" component="span" startIcon={<CloudUpload/>}>
                                Upload Album Folder
                            </Button>
                        </label>
                    </Box>
                </Box>
            </TabPanel>
            <TabPanel value={importTabValue} index={2}>
                <Box sx={{px: 3, pb: 3}}>
                    <Box sx={{mt: 2}}>
                        <input
                            accept=".xml"
                            style={{display: 'none'}}
                            id="xml-file-input"
                            type="file"
                            onChange={handleXmlImport}
                        />
                        <label htmlFor="xml-file-input">
                            <Button variant="contained" component="span" startIcon={<CloudUpload/>}>
                                Upload XML
                            </Button>
                        </label>
                    </Box>
                </Box>
            </TabPanel>
            {isLoading ? (
                <CircularProgress/>
            ) : (
                <List sx={{px: 3, pb: 3}}>
                    {importedFiles.map((file, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={file.tags.title}
                                          secondary={`${file.tags.artist} - ${file.tags.album}`}/>
                        </ListItem>
                    ))}
                </List>
            )}
        </TabPanel>
    )
}