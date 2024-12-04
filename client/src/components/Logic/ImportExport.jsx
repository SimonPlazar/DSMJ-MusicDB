import React, {useState} from 'react';
import {
    Container,
    Typography,
    Box,
    Tabs,
    Tab,
    Button,
    List,
    ListItem,
    ListItemText,
    Paper,
    CircularProgress
} from '@mui/material';
import {CloudUpload, CloudDownload, MusicNote, Album, Description} from '@mui/icons-material';
import {useDispatch, useSelector} from "react-redux";

import {Navbar} from '../Page/Navbar';
import {Footer} from '../Page/Footer';

import {extractMetadata, objToXML, XMLToObj} from './Import';
import {getSongs, createSong, createMultipleSongs} from "../../actions/songs";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default function ImportExport() {
    const [mainTabValue, setMainTabValue] = useState(0);
    const [importTabValue, setImportTabValue] = useState(0);
    const [importedFiles, setImportedFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    // console.log('Redux Songs State:', songs);

    const handleMainTabChange = (event, newValue) => {
        setMainTabValue(newValue);
    };

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

    const handleExport = async () => {
        setIsLoading(true);

        // const songs = [
        //     { title: "Song 1", artist: "Artist 1", album: "Album 1" },
        //     { title: "Song 2", artist: "Artist 2", album: "Album 2" },
        //     { title: "Song 3", artist: "Artist 3", album: "Album 3" },
        // ];
        let songs = [];
        try {
            songs = await dispatch(getSongs()); // Wait for songs to be fetched
        } catch (error) {
            console.error('Error fetching songs:', error);
            setIsLoading(false);
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
        setIsLoading(false);
    };

    return (
        <Box sx={{minHeight: '100vh'}}>
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
                    <TabPanel value={mainTabValue} index={0}>
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
                    <TabPanel value={mainTabValue} index={1}>
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
                </Paper>
            </Container>
            <Footer/>
        </Box>
    );
}

