import React, {useState, useCallback, useEffect, useMemo} from 'react';
import {Box, createTheme, Fab, Typography, Zoom} from '@mui/material';
import {FilterList as FilterListIcon} from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import {Navbar} from './nav-bar';
import {FilterSidebar} from './filter-sidebar';
import {SongDetails} from './song-details';
import {SongsTable} from './SongView/songs-table';
import {SongsCards} from "./SongView/SongCards";
import {Footer} from '../Page/Footer';
import Loading from '../Page/LoadingPage';
import {SET_SONGS} from "../../constants/actionTypes";

import {useDispatch, useSelector} from "react-redux";

import {getSongs, deleteSong, updateSong} from "../../actions/songs";
import {checkLoggedIn} from "../../actions/users";
import {useTheme} from "@mui/system";
import {PageWrapper} from "../Page/PageWrapper";
import {DEFAULT, MODERN} from "../../constants/ThemeTypes";

import { getConfig } from "../../configStore";

const themeee = createTheme({
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

const loadDynamicVariables = () => {
    try {
        // const dynamicVars = await import('../../AppStyle');
        const dynamicVars = getConfig();

        const filters_str = dynamicVars.filters.map((filter) => {
            return filter.charAt(0).toUpperCase() + filter.slice(1);
        }, []);

        return {
            filters: filters_str || ['Artist', 'Album', 'Genre', 'Year'],
            shownGenres: dynamicVars.shownGenres || ['Rock', 'Pop', 'Jazz', 'Classical'],
            filtersPath: dynamicVars.filtersPath || 'client/src/components/DashBoard/Filters',
            shownAttributes: dynamicVars.shownAttributes || ['title', 'artist', 'album', 'genre', 'duration'],
        };
    } catch (error) {
        console.error('Failed to load dynamic variables, using defaults:', error);
        return {
            filters: ['Artist', 'Album', 'Genre', 'Year'],
            shownGenres: ['Rock', 'Pop', 'Jazz', 'Classical'],
            filtersPath: 'client/src/components/DashBoard/Filters',
            shownAttributes: ['title', 'artist', 'album', 'genre', 'duration'],
        };
    }
};

// const loadDynamicVariables = async () => {
//     try {
//         const dynamicVars = await import('../../AppStyle');
//
//         return {
//         };
//     } catch (error) {
//         console.error('Failed to load dynamic variables, using defaults:', error);
//         return {
//         };
//     }
// };

export default function Dashboard() {
    const theme = useTheme();
    const dispatch = useDispatch();

    const variant = theme.components?.SongView?.variant || DEFAULT;

    const [selectedSong, setSelectedSong] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [resetPageTrigger, setResetPageTrigger] = useState(false);
    const [showSongDetails, setShowSongDetails] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [filterFunctions, setFilterFunctions] = useState({});

    const {user, loading: authLoading} = useSelector((state) => state.auth);
    const {songs, loading: songsLoading} = useSelector((state) => state.songs);

    // const shownAttributes = ['title', 'artist', 'album', 'genre', 'duration'];
    const [shownAttributes, setShownAttributes] = useState([]);
    const [filterVars, setFilterVars] = useState({
        filterComponents: {},
        filters: [],
        shownGenres: [],
    });

    useEffect(() => {
        const initializeAttributes = async () => {
            const vars = loadDynamicVariables();
            setShownAttributes(vars.shownAttributes);

            const components = {};
            for (let i = 0; i < vars.filters.length; i++) {
                try {
                    components[vars.filters[i]] = await require(`../../../../${vars.filtersPath}/${vars.filters[i]}.jsx`).default;
                } catch (error) {
                    console.error(`Failed to load ${vars.filters[i]} filter component`, error);
                }
            }
            setFilterVars({
                filterComponents: components,
                filters: vars.filters,
                shownGenres: vars.shownGenres,
            });
        };

        initializeAttributes()
    }, []);

    useEffect(() => {
        console.log('Checking logged in');
        if (!authLoading && !user) {
            console.log('Dispatching checkLoggedIn');
            dispatch(checkLoggedIn());
        }
    }, [dispatch, user, authLoading]);

    useEffect(() => {
        dispatch(getSongs());
    }, [dispatch]);

    const applyFilters = useCallback((newFilterFunctions) => {
        setFilterFunctions(newFilterFunctions);
    }, []);

    const resetFilters = useCallback(() => {
        setFilterFunctions({});
    }, []);

    const filteredSongs = useMemo(() => {
        let result = [...songs];

        // Apply filter functions
        Object.values(filterFunctions).forEach((filterFunction) => {
            if (filterFunction) {
                result = filterFunction(result);
            }
        });

        // Apply search query
        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase();

            // result = result.filter(song =>
            //     // song.tags.title.toLowerCase().includes(lowerCaseQuery) ||
            //     // song.tags.artist.toLowerCase().includes(lowerCaseQuery)
            //     (song.tags.title.toLowerCase() + ' - ' + song.tags.artist.toLowerCase() + ' - ' + song.tags.album.toLowerCase()).includes(lowerCaseQuery)
            // );

            const queryParts = lowerCaseQuery.split(' ');
            const filters = {title: '', artist: '', album: '', general: ''};

            queryParts.forEach((part) => {
                if (part.startsWith('title:')) {
                    filters.title = part.replace('title:', '').trim();
                } else if (part.startsWith('artist:')) {
                    filters.artist = part.replace('artist:', '').trim();
                } else if (part.startsWith('album:')) {
                    filters.album = part.replace('album:', '').trim();
                } else {
                    filters.general += ` ${part}`.trim(); // General search for any field
                }
            });

            result = result.filter(song => {
                const titleMatch = filters.title
                    ? song.tags.title.toLowerCase().includes(filters.title)
                    : true;
                const artistMatch = filters.artist
                    ? song.tags.artist.toLowerCase().includes(filters.artist)
                    : true;
                const albumMatch = filters.album
                    ? song.tags.album.toLowerCase().includes(filters.album)
                    : true;
                const generalMatch = filters.general
                    ? (
                        song.tags.title.toLowerCase() +
                        ' ' +
                        song.tags.artist.toLowerCase() +
                        ' ' +
                        song.tags.album.toLowerCase()
                    ).includes(filters.general)
                    : true;

                return titleMatch && artistMatch && albumMatch && generalMatch;
            });
        }

        return result;
    }, [songs, filterFunctions, searchQuery]);

    if (authLoading || songsLoading) {
        return <Loading/>;
    }

    const handleSongClick = (song) => {
        setSelectedSong(song);
        setShowSongDetails(true);
    };

    const handleDeleteSelected = () => {
        const ids = selectedSongs.map(songId => songId);

        for (let i = 0; i < ids.length; i++) {
            dispatch(deleteSong(ids[i]));
        }

        const updatedSongs = songs.filter((song) => !ids.includes(song._id));
        dispatch({type: SET_SONGS, payload: updatedSongs});

        setSelectedSongs([]);
        setIsSelecting(false);
        setResetPageTrigger(prev => !prev);
    };

    const handleEditSong = (editedSong) => {
        dispatch(updateSong(editedSong._id, editedSong));

        const updatedSongs = songs.map((song) =>
            song._id === editedSong._id ? editedSong : song
        );
        dispatch({type: SET_SONGS, payload: updatedSongs});

        setSelectedSong(editedSong);
    };

    const handleDeleteSong = (songToDelete) => {
        dispatch(deleteSong(songToDelete._id));

        const updatedSongs = songs.filter((song) => song._id !== songToDelete._id);
        dispatch({type: SET_SONGS, payload: updatedSongs});

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
        <PageWrapper>
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
                    filterVars={filterVars}
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
                    {variant === MODERN ? (
                        <Box>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
                                <Typography variant="h4">Your Songs</Typography>
                            </Box>
                            <SongsCards
                                songs={filteredSongs}
                                onSongSelect={handleSongClick}
                                isSelecting={isSelecting}
                                setIsSelecting={setIsSelecting}
                                selectedSongs={selectedSongs}
                                setSelectedSongs={setSelectedSongs}
                                reset={resetPageTrigger}
                                shownAttributes={shownAttributes}
                            />
                        </Box>
                    ) :
                        // default view
                        <SongsTable
                            songs={filteredSongs}
                            onSongSelect={handleSongClick}
                            isSelecting={isSelecting}
                            setIsSelecting={setIsSelecting}
                            selectedSongs={selectedSongs}
                            setSelectedSongs={setSelectedSongs}
                            reset={resetPageTrigger}
                            shownAttributes={shownAttributes}
                        />
                    }
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
        </PageWrapper>
    );
}
