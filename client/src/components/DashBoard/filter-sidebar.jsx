import { Box, Typography, Button, Paper, Drawer } from '@mui/material';
import { useState } from 'react';
import { ArtistFilter } from './Filters/ArtistFilter';
import { AlbumFilter } from './Filters/AlbumFilter';
import { GenreFilter } from './Filters/GenreFilter';
import { YearFilter } from './Filters/YearFilter';

export function FilterSidebar({ open, onClose }) {
    const [artistFilter, setArtistFilter] = useState('');
    const [albumFilter, setAlbumFilter] = useState('');
    const [genreFilter, setGenreFilter] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [yearStart, setYearStart] = useState('');
    const [yearEnd, setYearEnd] = useState('');

    const genres = ['Rock', 'Pop', 'Jazz', 'Classical']; // This could be fetched from an API

    const handleGenreChange = (genre, isChecked) => {
        if (isChecked) {
            setSelectedGenres([...selectedGenres, genre]);
        } else {
            setSelectedGenres(selectedGenres.filter(g => g !== genre));
        }
    };

    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            sx={{
                width: 300,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 300,
                    boxSizing: 'border-box',
                    top: 64,
                    height: 'calc(100% - 64px)',
                    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
                },
            }}
        >
            <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" gutterBottom>
                    Filters
                </Typography>

                <Box
                    sx={{
                        flex: 1,
                        overflow: 'auto',
                        pr: 2,
                        mr: -2,
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    <ArtistFilter value={artistFilter} onChange={setArtistFilter} />
                    <AlbumFilter value={albumFilter} onChange={setAlbumFilter} />
                    <GenreFilter
                        value={genreFilter}
                        onChange={setGenreFilter}
                        genres={genres}
                        onGenreChange={handleGenreChange}
                    />
                    <YearFilter
                        startYear={yearStart}
                        endYear={yearEnd}
                        onStartYearChange={setYearStart}
                        onEndYearChange={setYearEnd}
                    />

                </Box>

                <Box sx={{ mt: 2 }}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={() => {
                            // Apply filters logic here
                            console.log('Applying filters', {
                                artist: artistFilter,
                                album: albumFilter,
                                genre: genreFilter,
                                selectedGenres,
                                yearStart,
                                yearEnd
                            });
                        }}
                    >
                        Apply Filters
                    </Button>
                    <Button
                        variant="contained"
                        fullWidth
                        color="error"
                        sx={{ mt: 0.5 }}
                        onClick={() => {
                            // Reset filters logic here
                            console.log('Resetting filters');
                        }}
                    >
                        Reset Filters
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
}