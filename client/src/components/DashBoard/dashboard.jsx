import {useState} from 'react';
import {Box, CssBaseline, ThemeProvider, createTheme, Fab, Zoom} from '@mui/material';
import {FilterList as FilterListIcon} from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import {Navbar} from './nav-bar';
import {FilterSidebar} from './filter-sidebar';
import {SongDetails} from './song-details';
import {SongsTable} from './songs-table';
import {Footer} from './footer';

import {mockSongs} from './Data';

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
    const [selectedSong, setSelectedSong] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSongDetails, setShowSongDetails] = useState(false);
    const [showFilters, setShowFilters] = useState(true);
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectedSongs, setSelectedSongs] = useState([]);

    const handleSongClick = (song) => {
        setSelectedSong(song);
        setShowSongDetails(true);
    };

    const handleDeleteSelected = () => {
        // Implement delete logic here
        console.log('Deleting selected songs:', selectedSongs);
        setSelectedSongs([]);
        setIsSelecting(false);
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
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Navbar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    isSelecting={isSelecting}
                    setIsSelecting={setIsSelectingHandler}
                />
                <Box sx={{ display: 'flex', flex: 1 }}>
                    <FilterSidebar
                        open={showFilters}
                        onClose={() => setShowFilters(false)}
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
                            songs={mockSongs}
                            onSongSelect={handleSongClick}
                            isSelecting={isSelecting}
                            setIsSelecting={setIsSelecting}
                            selectedSongs={selectedSongs}
                            setSelectedSongs={setSelectedSongs}
                        />
                    </Box>
                </Box>
                <Footer />
                <SongDetails
                    open={showSongDetails}
                    song={selectedSong}
                    onClose={() => setShowSongDetails(false)}
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
                        <DeleteIcon />
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
                    <FilterListIcon />
                </Fab>
            </Box>
        </ThemeProvider>
    );
}