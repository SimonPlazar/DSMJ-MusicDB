import {ThemeProvider} from '@mui/material/styles';
import {Routes, Route} from 'react-router-dom';
import {GoogleOAuthProvider} from "@react-oauth/google";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

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
import {createTheme} from "@mui/material";
import {getConfig} from "./configStore";

const defaultRoutes = [
    {path: "/", element: <PublicRoute><LandingPage/></PublicRoute>},
    {path: "/landing", element: <PublicRoute><LandingPage/></PublicRoute>},
    {path: "/login", element: <PublicRoute><LoginPage/></PublicRoute>},
    {path: "/dashboard", element: <PrivateRoute><Dashboard/></PrivateRoute>},
    {path: "/import-export", element: <PrivateRoute><ImportExport/></PrivateRoute>},
    {path: "/settings", element: <PrivateRoute><Settings/></PrivateRoute>},
    {path: "/privacy", element: <PrivacyPolicy/>},
    {path: "/tos", element: <TermsOfService/>},
    {path: "/contact", element: <ContactUs/>},
    {path: "/loading", element: <LoadingPage/>},
];

const loadDynamicVariables = () => {
    try {
        const dynamicVars = getConfig();
        return {
            theme: dynamicVars.theme || createTheme(),
            title: dynamicVars.title || 'Music Library',
            routes: dynamicVars.routes || defaultRoutes,
        };
    } catch (error) {
        console.error('Failed to load dynamic variables, using defaults:', error);
        return {
            theme: createTheme(),
            title: 'Music Library',
            routes: defaultRoutes,
        };
    }
};

function App() {
    const GoogleApiKey = process.env.REACT_APP_CLIENT_ID;
    // console.log("Google Api Key: ", GoogleApiKey)

    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.auth);
    const [dynamicVariables, setDynamicVariables] = useState({
        theme: createTheme(),
        title: "",
        routes: defaultRoutes,
    });

    useEffect(() => {
        const initialize = async () => {
            const vars = loadDynamicVariables();
            setDynamicVariables(vars);
            document.title = vars.title;
        };
        initialize();
    }, []);

    useEffect(() => {
        console.log('Rehydrating auth state');
        dispatch(rehydrateAuth());
    }, [dispatch]);

    if (loading) {
        return <Loading/>;
    }

    if (!GoogleApiKey) {
        console.error("Google API Key is missing!");
        return <div>Error: Missing API Key</div>;
    }

    return (
        <GoogleOAuthProvider clientId={GoogleApiKey}>
            <ThemeProvider theme={dynamicVariables.theme}>
                <Routes>
                    {/*<Route exact path="/" element={<PublicRoute><LandingPage/></PublicRoute>}/>*/}
                    {/*<Route exact path="/landing" element={<PublicRoute><LandingPage/></PublicRoute>}/>*/}
                    {/*<Route path="/login" element={<PublicRoute><LoginPage/></PublicRoute>}/>*/}

                    {/*<Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>*/}
                    {/*<Route path="/import-export" element={<PrivateRoute><ImportExport/></PrivateRoute>}/>*/}
                    {/*<Route path="/settings" element={<PrivateRoute><Settings/></PrivateRoute>}/>*/}

                    {/*<Route path="/privacy" element={<PrivacyPolicy/>}/>*/}
                    {/*<Route path="/tos" element={<TermsOfService/>}/>*/}
                    {/*<Route path="/contact" element={<ContactUs/>}/>*/}
                    {/*<Route path="/loading" element={<LoadingPage/>}/>*/}

                    {dynamicVariables.routes.map((route, index) => (
                        <Route key={index} {...route} />
                    ))}
                </Routes>
            </ThemeProvider>
        </GoogleOAuthProvider>
    );
}

export default App;
