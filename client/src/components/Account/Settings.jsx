import React, {useState, useEffect} from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Snackbar,
    Alert
} from '@mui/material';

import {fetchSettings, updateSettings} from "../../actions/users";
import {Navbar} from "../Page/Navbar";
import {Footer} from "../Page/Footer";
import {useDispatch, useSelector} from "react-redux";
import {PageWrapper} from "../Page/PageWrapper";

export default function Settings() {
    const {user} = useSelector((state) => state.auth);
    const [settings, setSettings] = useState({
        theme: '',
        table_rows: 0,
    });
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({open: false, message: '', severity: 'success'});
    const [settingsLoaded, setSettingsLoaded] = useState(false);

    useEffect(() => {
        const fetchSettingsFunc = async () => {
            try {
                setIsLoading(true);
                if (!settingsLoaded) {
                    const userSettings = await dispatch(fetchSettings());
                    console.log('Fetched user settings:', userSettings);
                    setSettings({
                        theme: userSettings.theme,
                        table_rows: userSettings.table_rows,
                    });
                    setSettingsLoaded(true);
                }
            } catch (error) {
                console.error('Error fetching user settings:', error);
                setSnackbar({open: true, message: 'Failed to load settings', severity: 'error'});
            } finally {
                setIsLoading(false);
            }
        };

        if (user && !settingsLoaded) {
            fetchSettingsFunc();
        }
    }, [dispatch, user, settingsLoaded]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setSettings((prevSettings) => ({
            ...prevSettings,
            [name]: name === 'table_rows'
                ? value === '' || /^[0-9]+$/.test(value)
                    ? parseInt(value || '0', 10)
                    : prevSettings.table_rows
                : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Submitting settings:', settings);
        try {
            dispatch(updateSettings(settings)).then(() => {
                setSnackbar({open: true, message: 'Settings updated successfully', severity: 'success'});
            });
        } catch (error) {
            console.error('Error updating settings:', error);
            setSnackbar({open: true, message: 'Failed to update settings', severity: 'error'});
        }
    };

    if (isLoading) {
        return <Typography>Loading settings...</Typography>;
    }

    return (
        <PageWrapper>
            <Navbar/>
            <Container component="main" maxWidth="sm">
                <Paper elevation={3} sx={{mt: 8, p: 4, mb: 8}}>
                    <Typography component="h1" variant="h5" gutterBottom>
                        User Settings
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="theme"
                            label="Theme"
                            name="theme"
                            autoComplete="theme"
                            value={settings.theme}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="table_rows"
                            label="Table Rows"
                            name="table_rows"
                            autoComplete="table_rows"
                            value={settings.table_rows}
                            onChange={handleChange}
                        />
                        {/*<FormControlLabel*/}
                        {/*    control={*/}
                        {/*        <Switch*/}
                        {/*            checked={settings.darkMode}*/}
                        {/*            onChange={handleChange}*/}
                        {/*            name="darkMode"*/}
                        {/*            color="primary"*/}
                        {/*        />*/}
                        {/*    }*/}
                        {/*    label="Dark Mode"*/}
                        {/*/>*/}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Save Settings
                        </Button>
                    </Box>
                </Paper>
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={() => setSnackbar(prev => ({...prev, open: false}))}
                >
                    <Alert
                        onClose={() => setSnackbar(prev => ({...prev, open: false}))}
                        severity={snackbar.severity}
                        sx={{width: '100%'}}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Container>
            <Footer/>
        </PageWrapper>
    );
}

