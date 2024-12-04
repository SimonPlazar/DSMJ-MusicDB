import { Box, Typography, Button, Drawer } from '@mui/material';
import {useCallback, useState} from 'react';
import { ArtistFilter } from './Filters/Artist';
import { AlbumFilter } from './Filters/Album';
import { GenreFilter } from './Filters/Genre';
import { YearFilter } from './Filters/Year';

export function FilterSidebar({ open, onClose, onApplyFilters, onResetFilters }) {
    const [resetTrigger, setResetTrigger] = useState(false);
    const [filterFunctions, setFilterFunctions] = useState({});
    const genres = ['Rock', 'Pop', 'Jazz', 'Classical'];

    const handleFilterFunctionChange = useCallback((filterName, filterFunction) => {
        setFilterFunctions(prev => ({
            ...prev,
            [filterName]: filterFunction
        }));
    }, []);

    const handleApplyFilters = () => {
        onApplyFilters(filterFunctions);
    };

    const handleResetFilters = () => {
        setFilterFunctions({});
        setResetTrigger(prev => !prev);
        onResetFilters();
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
                    <ArtistFilter onFilterFunctionChange={handleFilterFunctionChange} reset={resetTrigger}/>
                    <AlbumFilter onFilterFunctionChange={handleFilterFunctionChange} reset={resetTrigger}/>
                    <GenreFilter onFilterFunctionChange={handleFilterFunctionChange} genres={genres} reset={resetTrigger}/>
                    <YearFilter onFilterFunctionChange={handleFilterFunctionChange} reset={resetTrigger}/>
                </Box>

                <Box sx={{ mt: 2 }}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleApplyFilters}
                    >
                        Apply Filters
                    </Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        color="error"
                        sx={{ mt: 1 }}
                        onClick={handleResetFilters}
                    >
                        Reset Filters
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
}

