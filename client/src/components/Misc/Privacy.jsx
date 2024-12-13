import React, {useState} from 'react';
import {Container, Typography, Paper, Tabs, Tab} from '@mui/material';
import {Navbar} from '../Page/Navbar';
import {Footer} from '../Page/Footer';
import {Box, useTheme} from "@mui/system";
import {PageWrapper} from "../Page/PageWrapper";
import {DEFAULT, MODERN} from "../../constants/ThemeTypes";

import {TabPanel} from '../Page/TabPanel';

// const TabPanel = (props) => {
//     const { children, value, index, ...other } = props;
//
//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`privacy-tabpanel-${index}`}
//             aria-labelledby={`privacy-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box sx={{ p: 3 }}>
//                     <Typography>{children}</Typography>
//                 </Box>
//             )}
//         </div>
//     );
// };

export default function PrivacyPolicy({variant}) {
    const theme = useTheme();

    const variantProp = variant || theme.components?.PrivacyPolicy?.variant || DEFAULT;

    const defaultPrivacyPolicy = () => (
        <PageWrapper>
            <Navbar/>
            <Container maxWidth="md" sx={{my: 4}}>
                <Paper elevation={3} sx={{p: 4}}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Privacy Policy
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Last updated: {new Date().toLocaleDateString()}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        At MusicDB, we take your privacy seriously. This Privacy Policy describes how we collect, use,
                        and share your personal information when you use our service.
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Information We Collect
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We collect information you provide directly to us, such as when you create an account, upload
                        music, or contact us for support. This may include your name, email address, and music listening
                        history.
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        How We Use Your Information
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We use the information we collect to provide, maintain, and improve our services, to communicate
                        with you, and to personalize your experience on MusicDB.
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Sharing Your Information
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We do not sell your personal information. We may share your information with third-party service
                        providers who help us operate our service or as required by law.
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Your Rights
                    </Typography>
                    <Typography variant="body1" paragraph>
                        You have the right to access, correct, or delete your personal information. Please contact us if
                        you wish to exercise these rights.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        For more information about our privacy practices, please contact us.
                    </Typography>
                </Paper>
            </Container>
            <Footer/>
        </PageWrapper>
    );

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const modernPrivacyPolicy = () => (
        <PageWrapper>
            <Navbar/>
            <Container maxWidth="md" sx={{my: 4, flexGrow: 1}}>
                <Paper elevation={3} sx={{p: 4}}>
                    <Typography variant="h4" component="h1" gutterBottom align="center">
                        Privacy Policy
                    </Typography>
                    <Tabs value={value} onChange={handleChange} centered>
                        <Tab label="Information Collection"/>
                        <Tab label="Use of Information"/>
                        <Tab label="Data Protection"/>
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <Typography>
                            We collect personal information that you voluntarily provide to us when you use our
                            services. This may include your name, email address, and music preferences.
                        </Typography>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Typography>
                            We use the collected information to provide and improve our services, personalize your
                            experience, and communicate with you about updates and new features.
                        </Typography>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Typography>
                            We implement a variety of security measures to maintain the safety of your personal
                            information.
                            Your data is encrypted and stored on secure servers.
                        </Typography>
                    </TabPanel>
                </Paper>
            </Container>
            <Footer/>
        </PageWrapper>
    );

    return (
        <>
            {variantProp === DEFAULT && defaultPrivacyPolicy()}
            {variantProp === MODERN && modernPrivacyPolicy()}
        </>
    );
}

