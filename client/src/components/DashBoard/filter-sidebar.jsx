import {Box, Typography, Button, Drawer} from '@mui/material';
import React, {Suspense, useCallback, useEffect, useState} from 'react';

// import { ArtistFilter } from './Filters/Artist';
// import {AlbumFilter} from './Filters/Album';
// import {GenreFilter} from './Filters/Genre';
// import {YearFilter} from './Filters/Year';
// import Artist from './Filters/Artist';

// import {filtersPath, filters, shownGenres} from "../../AppStyle";

export function FilterSidebar({open, onClose, onApplyFilters, onResetFilters, filterVars}) {
    const [resetTrigger, setResetTrigger] = useState(false);
    const [filterFunctions, setFilterFunctions] = useState({});
    // const [filterComponents, setFilterComponents] = useState({});

    // const [dynamicVariables, setDynamicVariables]

    // useEffect(() => {
    //     const initializeFilters  = async () => {
    //         const vars = await loadDynamicVariables();
    //
    //     };
    //
    //     initializeFilters();
    // }, []);

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
            <Box sx={{p: 3, height: '100%', display: 'flex', flexDirection: 'column'}}>
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
                    {/*<Artist onFilterFunctionChange={handleFilterFunctionChange} reset={resetTrigger}/>*/}
                    {/*/!*<ArtistFilter onFilterFunctionChange={handleFilterFunctionChange} reset={resetTrigger}/>*!/*/}
                    {/*<AlbumFilter onFilterFunctionChange={handleFilterFunctionChange} reset={resetTrigger}/>*/}
                    {/*<GenreFilter onFilterFunctionChange={handleFilterFunctionChange} genres={genres} reset={resetTrigger}/>*/}
                    {/*<YearFilter onFilterFunctionChange={handleFilterFunctionChange} reset={resetTrigger}/>*/}

                    {filterVars.filters.map((filter) => {
                        const FilterComponent = filterVars.filterComponents[filter];
                        return (
                            FilterComponent ? (
                                <Suspense fallback={<div>Loading...</div>} key={filter}>
                                    <FilterComponent
                                        onFilterFunctionChange={handleFilterFunctionChange}
                                        reset={resetTrigger}
                                        {...(filter === 'Genre' && {genres: filterVars.shownGenres})}
                                    />
                                </Suspense>
                            ) : null
                        );
                    })}

                </Box>

                <Box sx={{mt: 2}}>
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
                        sx={{mt: 1}}
                        onClick={handleResetFilters}
                    >
                        Reset Filters
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
}

