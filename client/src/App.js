import {ThemeProvider, createTheme} from '@mui/material/styles';
import {Routes, Route} from 'react-router-dom';
import {GoogleOAuthProvider} from "@react-oauth/google";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import PrivacyPolicy from './components/Misc/Privacy';
import TermsOfService from './components/Misc/ToS';
import ContactUs from './components/Misc/Contact';

import LoginPage from './components/Account/Login';
import Settings from "./components/Account/Settings";

import Dashboard from './components/DashBoard/dashboard';

import LandingPage from './components/Page/LandingPage';
import Loading from "./components/Page/LoadingPage";
import LoadingPage from "./components/Page/LoadingPage";

import ImportExport from "./components/Logic/ImportExport";
import PrivateRoute from "./components/Logic/PrivateRouter";
import PublicRoute from "./components/Logic/PublicRouter";

import {rehydrateAuth} from "./actions/users";

import {createCustomTheme} from "./components/Page/Theme";
import {DEFAULT, MINIMAL, MODERN} from "./constants/ThemeTypes";

function App() {
    // const theme = createTheme();
    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.auth);

    useEffect(() => {
        console.log('Rehydrating auth state');
        dispatch(rehydrateAuth());
    }, [dispatch]);

    if (loading) {
        return <Loading/>;
    }

    // const themePreset = 'minimal';
    // const theme = createCustomTheme(themePreset,{
    //     palette: {
    //         primary: {
    //             main: '#1976d2',
    //         },
    //         secondary: {
    //             main: '#f50057',
    //         },
    //         background: {
    //             default: '#ffffff',
    //             paper: '#f5f5f5',
    //         },
    //         backgroundSecondary: {
    //             default: '#f0f0f0',
    //             paper: '#e0e0e0',
    //         }
    //     },
    // });

    // const theme = createTheme();
    const theme = createCustomTheme('', {
        components: {
            // Navbar: {
            //     variant: MODERN,
            // },
            // Footer: {
            //     variant: MODERN,
            // },
            // LoadingPage: {
            //     variant: MODERN,
            // },
            // ContactUs: {
            //     variant: MODERN,
            // },
            // PrivacyPolicy: {
            //     variant: MODERN,
            // },
            // TermsOfService: {
            //     variant: MODERN,
            // },
            SongTable: {
                // variant: MINIMAL,
                defaultRows: 5,
            }
        }
    });

    return (
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_API_KEY">
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route exact path="/" element={<PublicRoute><LandingPage/></PublicRoute>}/>
                    <Route exact path="/landing" element={<PublicRoute><LandingPage/></PublicRoute>}/>
                    <Route path="/login" element={<PublicRoute><LoginPage/></PublicRoute>}/>

                    <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
                    <Route path="/import-export" element={<PrivateRoute><ImportExport/></PrivateRoute>}/>
                    <Route path="/settings" element={<PrivateRoute><Settings/></PrivateRoute>}/>

                    <Route path="/privacy" element={<PrivacyPolicy/>}/>
                    <Route path="/tos" element={<TermsOfService/>}/>
                    <Route path="/contact" element={<ContactUs/>}/>
                    <Route path="/loading" element={<LoadingPage/>}/>
                </Routes>
            </ThemeProvider>
        </GoogleOAuthProvider>
    );
}

export default App;
