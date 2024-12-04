import {ThemeProvider, createTheme} from '@mui/material/styles';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {GoogleOAuthProvider} from "@react-oauth/google";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/Account/Login';
import PrivacyPolicy from './components/Misc/Privacy';
import TermsOfService from './components/Misc/ToS';
import ContactUs from './components/Misc/Contact';
import Dashboard from './components/DashBoard/dashboard';
import ImportExport from "./components/Logic/ImportExport";
import Settings from "./components/Account/Settings";

// import { AuthProvider } from './components/Logic/AuthContext';
import {rehydrateAuth} from "./actions/users";


function App() {
    const theme = createTheme();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    useEffect(() => {
        console.log('Rehydrating auth state');
        dispatch(rehydrateAuth());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>; // Show a loader while rehydrating auth state
    }

    return (
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_API_KEY">
            {/*<AuthProvider>*/}
            <ThemeProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<LandingPage/>}/>
                        <Route exact path="/landing" element={<LandingPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/privacy" element={<PrivacyPolicy/>}/>
                        <Route path="/tos" element={<TermsOfService/>}/>
                        <Route path="/contact" element={<ContactUs/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/import-export" element={<ImportExport/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                    </Routes>
                </Router>
            </ThemeProvider>
            {/*</AuthProvider>*/}
        </GoogleOAuthProvider>
    );
}

export default App;
