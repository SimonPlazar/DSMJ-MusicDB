import React, {useEffect} from 'react';
import {Box, Button, Container, Typography, Paper} from '@mui/material';
import {styled} from '@mui/material/styles';
import {Google as GoogleIcon} from '@mui/icons-material';

import {GoogleLogin} from '@react-oauth/google';
import {useNavigate} from "react-router-dom";

import { loginWithGoogle } from '../../actions/users';
import {useDispatch, useSelector} from 'react-redux';

import {PageWrapper} from "../Page/PageWrapper";
import Loading from "../Page/LoadingPage";
import {Navbar} from '../Page/Navbar';
import {Footer} from "../Page/Footer";


const FormContainer = styled(Paper)(({theme}) => ({
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
}));

const SocialButton = styled(Button)(({theme}) => ({
    marginBottom: theme.spacing(2),
}));

export default function LoginPage() {
    const GoogleApiKey = process.env.REACT_APP_CLIENT_ID

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, loading} = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    if (loading) {
        return <Loading/>;
    }

    if (user) {
        return null;
    }

    if (!GoogleApiKey){
        console.error("Google API Key is missing!");
        return <div>Error: Missing API Key</div>;
    }

    // const responseGoogleSuccess = async (credentialResponse) => {
    //     try {
    //         const response = await fetch('/users/google', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({credential: credentialResponse.credential}),
    //         });
    //         const data = await response.json();
    //         if (data.success && data.token) {
    //             localStorage.setItem('token', data.token);
    //             login(data);
    //             console.log('Google login successful:', data);
    //             navigate('/dashboard');
    //         } else {
    //             console.error('Google login failed:', data.message);
    //         }
    //     } catch (error) {
    //         console.error('Error during Google login:', error);
    //     }
    // };

    const responseGoogleSuccess = (credentialResponse) => {
        console.log("Google Sign-In successful:", credentialResponse);
        dispatch(loginWithGoogle({credential: credentialResponse.credential})).then(() => {
            navigate('/dashboard');
        });
    };

    const responseGoogleFail = (response) => {
        console.log("Google Sign-In failed:", response);
    };

    return (
        <PageWrapper sx={{bgcolor: 'background.default'}}>
            <Navbar showlogin={false}/>
            <Container component="main" maxWidth="xs" sx={{mt: 9, mb: 15}}>
                <FormContainer elevation={3}>
                    <Typography component="h1" variant="h5">
                        Log in to MusicDB
                    </Typography>
                    <Box sx={{mt: 3, width: '100%'}}>
                        <GoogleLogin
                            clientId={GoogleApiKey}
                            render={renderProps => (
                                <SocialButton
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<GoogleIcon/>}
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                >
                                    Sign in with Google
                                </SocialButton>
                            )}
                            onSuccess={responseGoogleSuccess}
                            onFailure={responseGoogleFail}
                            // cookiePolicy={'single_host_origin'}
                        />
                        {/*<SocialButton*/}
                        {/*    fullWidth*/}
                        {/*    variant="outlined"*/}
                        {/*    startIcon={<FacebookIcon/>}*/}
                        {/*    onClick={responseFacebook}*/}
                        {/*>*/}
                        {/*    Sign in with Facebook*/}
                        {/*</SocialButton>*/}
                        {/*<SocialButton*/}
                        {/*    fullWidth*/}
                        {/*    variant="outlined"*/}
                        {/*    startIcon={<GitHubIcon/>}*/}
                        {/*    onClick={responseGitHub}*/}
                        {/*>*/}
                        {/*    Sign in with GitHub*/}
                        {/*</SocialButton>*/}
                    </Box>
                </FormContainer>
            </Container>
            <Footer/>
        </PageWrapper>
    );
}

