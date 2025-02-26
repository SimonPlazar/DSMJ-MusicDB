import {DEFAULT, MINIMAL, MODERN} from "./constants/ThemeTypes";
import { createCustomTheme } from "./components/Page/Theme";

import LandingPage from './components/Page/LandingPage';
import LoginPage from './components/Account/Login';
import Dashboard from './components/DashBoard/dashboard';
import ImportExport from "./components/Logic/ImportExport";
import Settings from "./components/Account/Settings";
import PrivacyPolicy from './components/Misc/Privacy';
import TermsOfService from './components/Misc/ToS';
import ContactUs from './components/Misc/Contact';
import LoadingPage from "./components/Page/LoadingPage";
import PrivateRoute from "./components/Logic/PrivateRouter";
import PublicRoute from "./components/Logic/PublicRouter";

import { setConfig } from "./configStore";

const title = "Simon's Application";

const preset = 'default';

const themeData = {
    palette: {
        primary: {
            main: '#2196f3',
        },
        secondary: {
            main: '#ff0000',
        },
        background: {
            default: '#123456',
            paper: '#ffffff',
        },
        backgroundSecondary: {
            default: '#eeeeee',
            paper: '#e0e0e0',
        },
    },
    components: {
        Header: {
            variant: MINIMAL,
        },
        Footer: {
            variant: MINIMAL,
        },
        SongView: {
            variant: MODERN,
        },
        ImportExport: {
            variant: MODERN,
        },
        LoadingPage: {
            variant: MODERN,
        },
        MuiButton: {
            variants: [{props: { color: 'secondary' }, style: { backgroundColor: '#00f557',color: '#ffffff','&:hover': {backgroundColor: '#00ff00',},},},],
        }
    },
};

const filtersPath = 'client/src/components/DashBoard/Filters';
const filters = ['album', 'artist', 'genre', 'year'];
const shownGenres = ['POP', 'HIP-HOP', 'PUNK', 'ALTERNATIVE', 'SOUNDTRACK', 'OTHER', 'ROCK'];

const shownAttributes = ['artist', 'title'];
themeData.components.SongView = {
    ...themeData.components.SongView,
    defaultRows: 5,
    defaultColumns: 3,
}

const routes = [
    {path: "/", element: <PublicRoute><LandingPage/></PublicRoute>},
    {path: "/home", element: <PublicRoute><LandingPage/></PublicRoute>},
    {path: "/login", element: <PublicRoute><LoginPage/></PublicRoute>},
    {path: "/dashboard", element: <PrivateRoute><Dashboard/></PrivateRoute>},
    {path: "/import-export", element: <PrivateRoute><ImportExport/></PrivateRoute>},
    {path: "/settings", element: <PrivateRoute><Settings/></PrivateRoute>},
    {path: "/contact", element: <><ContactUs/></>},
    {path: "/privacy", element: <><PrivacyPolicy/></>},
    {path: "/tos", element: <><TermsOfService/></>},
    {path: "/settings", element: <PrivateRoute><Settings/></PrivateRoute>},
];

const theme = createCustomTheme(
    preset,
    themeData
);

const config = {
    title: title || null,
    theme: theme || null,
    filtersPath: filtersPath || null,
    filters: filters || null,
    shownGenres: shownGenres || null,
    shownAttributes: shownAttributes || null,
    routes: routes || null,
};

setConfig(config);
