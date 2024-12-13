import React, {useCallback, useState} from 'react';
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
    Paper, Stepper, Step, StepLabel,
} from "@mui/material";
import {Album, Check, CloudUpload, Description, MusicNote} from "@mui/icons-material";
import { TabPanel } from "../../Page/TabPanel";
import { extractMetadata, XMLToObj } from './import.js';
import { createMultipleSongs, createSong } from "../../../actions/songs";
import { useDispatch } from "react-redux";
import {DEFAULT, MINIMAL, MODERN} from "../../../constants/ThemeTypes";
import { useDropzone } from 'react-dropzone';

export function Import({ mainTabValue, index, variant }) {
    const [importTabValue, setImportTabValue] = useState(0);
    const [importedFiles, setImportedFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const variantProp = variant || DEFAULT;

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

    const defaultImport = () => (
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


    const [activeStep, setActiveStep] = useState(0);
    const [importType, setImportType] = useState(null);
    const steps = ['Choose Import Type', 'Select Files', 'Import'];

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleImportTypeSelect = (type) => {
        setImportType(type);
        handleNext();
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                        <Button variant="outlined" onClick={() => handleImportTypeSelect('songs')}>Songs</Button>
                        <Button variant="outlined" onClick={() => handleImportTypeSelect('albums')}>Albums</Button>
                        <Button variant="outlined" onClick={() => handleImportTypeSelect('xml')}>XML</Button>
                    </Box>
                );
            case 1:
                return (
                    <Box sx={{ mt: 2 }}>
                        <input
                            accept={importType === 'xml' ? '.xml' : '.flac'}
                            style={{ display: 'none' }}
                            id="file-input"
                            multiple={importType !== 'xml'}
                            type="file"
                            onChange={handleImport}
                        />
                        <label htmlFor="file-input">
                            <Button variant="contained" component="span" startIcon={<CloudUpload />} fullWidth>
                                {`Upload ${importType === 'albums' ? 'Album Folder' : importType === 'xml' ? 'XML File' : 'Songs'}`}
                            </Button>
                        </label>
                    </Box>
                );
            case 2:
                return (
                    <Box sx={{ mt: 2 }}>
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            <>
                                <Typography variant="h6" gutterBottom>
                                    Import Complete
                                </Typography>
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
                            </>
                        )}
                    </Box>
                );
            default:
                return 'Unknown step';
        }
    };

    const stepImport = () => (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box sx={{ mt: 2 }}>
                {getStepContent(activeStep)}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
                {activeStep === steps.length - 1 ? (
                    <Button variant="contained" startIcon={<Check />}>
                        Finish
                    </Button>
                ) : null}
            </Box>
        </Paper>
    );

    const onDrop = useCallback(async (acceptedFiles) => {
        setIsLoading(true);
        const importedData = [];

        for (let file of acceptedFiles) {
            if (file.name.endsWith('.flac') || file.name.endsWith('.xml')) {
                try {
                    const metadata = file.name.endsWith('.xml')
                        ? XMLToObj(await file.text())
                        : await extractMetadata(file);
                    importedData.push(...(Array.isArray(metadata) ? metadata : [metadata]));
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
    }, [dispatch]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const dragAndDropImport = () => (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Box {...getRootProps()} sx={{
                border: '2px dashed #ccc',
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': {
                    borderColor: 'primary.main',
                },
            }}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <Typography>Drop the files here ...</Typography>
                ) : (
                    <Box>
                        <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                        <Typography>Drag 'n' drop some files here, or click to select files</Typography>
                        <Typography variant="body2" color="text.secondary">
                            (Only *.flac and *.xml files will be accepted)
                        </Typography>
                    </Box>
                )}
            </Box>
            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <CircularProgress />
                </Box>
            ) : importedFiles.length > 0 ? (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Imported Files
                    </Typography>
                    <List>
                        {importedFiles.map((file, index) => (
                            <ListItem key={index}>
                                <MusicNote sx={{ mr: 1, color: 'primary.main' }} />
                                <ListItemText
                                    primary={file.tags.title}
                                    secondary={`${file.tags.artist} - ${file.tags.album}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            ) : null}
        </Paper>
    );

    return (
        <>
            {variantProp === DEFAULT && defaultImport()}
            {variantProp === MINIMAL && dragAndDropImport()}
            {variantProp === MODERN && stepImport()}
        </>
    );
}

