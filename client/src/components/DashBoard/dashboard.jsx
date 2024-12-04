import {useState, useCallback, useEffect} from 'react';
import {Box, CssBaseline, ThemeProvider, createTheme, Fab, Zoom} from '@mui/material';
import {FilterList as FilterListIcon} from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import {Navbar} from './nav-bar';
import {FilterSidebar} from './filter-sidebar';
import {SongDetails} from './song-details';
import {SongsTable} from './songs-table';
import {Footer} from '../Page/Footer';

// import {useAuth} from '../Logic/AuthContext';
// import { checkLoggedIn } from '../../actions/users';

import {useDispatch, useSelector} from "react-redux";

import {getSongs, deleteSong, updateSong} from "../../actions/songs";
import {useNavigate} from "react-router-dom";
import {checkLoggedIn} from "../../actions/users";

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                },
            },
        },
    },
});

export default function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const {user, loading} = useAuth();

    const [selectedSong, setSelectedSong] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [resetPageTrigger, setResetPageTrigger] = useState(false);
    const [showSongDetails, setShowSongDetails] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [filteredSongs, setFilteredSongs] = useState([]);

    const {user, loading} = useSelector((state) => state.auth);
    const {songs = []} = useSelector((state) => state.songs);

    // console.log('User:', user);

    useEffect(() => {
        console.log('Checking logged in');
        if (!loading && !user) {
            console.log('Dispatching checkLoggedIn');
            dispatch(checkLoggedIn());
        }
    }, [dispatch, user, loading]);
    //
    // useEffect(() => {
    //     // dispatch(checkLoggedIn());
    //     if (!loading && !user) {
    //         navigate('/login');
    //     }
    // }, [user, loading, navigate]);


    useEffect(() => {
        dispatch(getSongs());
    }, [dispatch]);

    useEffect(() => {
        setFilteredSongs(songs);
    }, [songs]);

    const applyFilters = useCallback((newFilterFunctions) => {
        let filteredResults = [...songs];

        Object.values(newFilterFunctions).forEach((filterFunction) => {
            if (filterFunction !== null) {
                filteredResults = filterFunction(filteredResults);
            }
        });


        setFilteredSongs(filteredResults);
    }, [songs]);

    const resetFilters = useCallback(() => {
        setFilteredSongs(songs);
    }, [songs]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // if (!user) {
    //     navigate('/login');
    // }

    const handleSongClick = (song) => {
        setSelectedSong(song);
        setShowSongDetails(true);
    };

    const handleDeleteSelected = () => {
        const ids = selectedSongs.map(songId => songId);

        // if (ids.length === 1) dispatch(deleteSong(ids[0]));
        // else if (ids.length > 1) {dispatch(deleteMultipleSongs(ids));
        for (let i = 0; i < ids.length; i++) {
            dispatch(deleteSong(ids[i]));
        }

        const updatedSongs = songs.filter(song => !selectedSongs.includes(song._id));
        setFilteredSongs(updatedSongs);
        setSelectedSongs([]);
        setIsSelecting(false);

        setResetPageTrigger(prev => !prev);
    };

    const handleEditSong = (editedSong) => {
        dispatch(updateSong(editedSong._id, editedSong));
        console.log('Edited song:', editedSong);
        const updatedSongs = songs.map(song => song._id === editedSong._id ? editedSong : song);
        setFilteredSongs(updatedSongs);
        setSelectedSong(editedSong);
    };

    const handleDeleteSong = (songToDelete) => {
        dispatch(deleteSong(songToDelete._id));
        // console.log('Deleted song:', songToDelete);
        const updatedSongs = songs.filter(song => song._id !== songToDelete._id);
        setFilteredSongs(updatedSongs);
        setShowSongDetails(false);
    };

    const setIsSelectingHandler = (value) => {
        if (value === true) {
            setIsSelecting(true);
        }
        if (value === false) {
            setIsSelecting(false);
            setSelectedSongs([]);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                <Navbar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    isSelecting={isSelecting}
                    setIsSelecting={setIsSelectingHandler}
                />

                <Box sx={{display: 'flex', flex: 1}}>
                    <FilterSidebar
                        open={showFilters}
                        onClose={() => setShowFilters(false)}
                        onApplyFilters={applyFilters}
                        onResetFilters={resetFilters}
                    />
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            p: 3,
                            mt: 8,
                            mb: 3,
                            ml: showFilters ? 0 : '-300px',
                            transition: 'margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <SongsTable
                            songs={filteredSongs}
                            onSongSelect={handleSongClick}
                            isSelecting={isSelecting}
                            setIsSelecting={setIsSelecting}
                            selectedSongs={selectedSongs}
                            setSelectedSongs={setSelectedSongs}
                            reset={resetPageTrigger}
                        />
                    </Box>
                </Box>
                <Footer/>
                <SongDetails
                    open={showSongDetails}
                    song={selectedSong}
                    onClose={() => setShowSongDetails(false)}
                    onEdit={handleEditSong}
                    onDelete={handleDeleteSong}
                />

                <Zoom in={isSelecting}>
                    <Fab
                        color="secondary"
                        aria-label="delete"
                        sx={{
                            position: 'fixed',
                            bottom: 16,
                            right: 16,
                        }}
                        onClick={handleDeleteSelected}
                    >
                        <DeleteIcon/>
                    </Fab>
                </Zoom>

                <Fab
                    color="primary"
                    aria-label="filter"
                    sx={{
                        position: 'fixed',
                        bottom: 16,
                        left: showFilters ? 316 : 16,
                        transition: 'left 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
                    }}
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <FilterListIcon/>
                </Fab>
            </Box>
        </ThemeProvider>
    );
}

