import React, { useState, useEffect } from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    Checkbox,
    Fade,
    Pagination,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from "react-redux";
import { useTheme } from "@mui/system";

import { stableSort, getComparator } from './SortLogic';

const AnimatedCheckbox = styled(Checkbox)(({ theme }) => ({
    transition: theme.transitions.create(['opacity', 'transform'], {
        duration: theme.transitions.duration.shorter,
    }),
    '&.MuiCheckbox-root': {
        opacity: 0,
        transform: 'scale(0.8)',
    },
    '&.MuiCheckbox-root.visible': {
        opacity: 1,
        transform: 'scale(1)',
    },
}));

export function SongsCards({ songs, onSongSelect, isSelecting, setIsSelecting, selectedSongs, setSelectedSongs, reset, shownAttributes }) {
    const [page, setPage] = useState(1);
    const [orderBy, setOrderBy] = useState('title');
    const [order, setOrder] = useState('asc');
    const { user } = useSelector((state) => state.auth);
    const theme = useTheme();

    // const shownAttributes = ['title', 'artist', 'album', 'genre', 'duration'];

    const ITEM_ROWS = user?.settings?.table_rows || theme.components?.SongView?.defaultRows || 4;
    // const ITEM_COLUMNS = user?.settings?.table_cols || theme.components?.SongView?.defaultColumns || 3;
    const ITEM_COLUMNS = theme.components?.SongView?.defaultColumns || 3;
    // console.log("ITEM_COLUMNS: ", theme.components?.SongView?.defaultColumns)

    // const gridSize = Math.floor(12 / ITEM_COLUMNS);
    const gridSize = 12 / ITEM_COLUMNS;
    const ITEMS_PER_PAGE = ITEM_ROWS * ITEM_COLUMNS;
    // const ITEMS_PER_PAGE = ITEM_ROWS * gridSize;
    const totalPages = Math.ceil(songs.length / ITEMS_PER_PAGE);

    useEffect(() => {
        if (songs.length <= (page - 1) * ITEMS_PER_PAGE) {
            // setPage(Math.ceil(songs.length / ITEMS_PER_PAGE)); // go to last page
            setPage(1);
        }
    }, [reset, page, songs, ITEMS_PER_PAGE]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleSelectAllClick = (event) => {
        if (selectedSongs.length !== songs.length) {
            const newSelected = songs.map((song) => song._id);
            setSelectedSongs(newSelected);
        } else {
            setSelectedSongs([]);
        }
    };

    const handleClick = (event, id) => {
        if (event.shiftKey && !isSelecting) {
            setIsSelecting(true);
            setSelectedSongs([].concat(id));
        } else if (isSelecting) {
            const selectedIndex = selectedSongs.indexOf(id);
            let newSelected = [];

            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selectedSongs, id);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selectedSongs.slice(1));
            } else if (selectedIndex === selectedSongs.length - 1) {
                newSelected = newSelected.concat(selectedSongs.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selectedSongs.slice(0, selectedIndex),
                    selectedSongs.slice(selectedIndex + 1),
                );
            }

            setSelectedSongs(newSelected);
        } else {
            onSongSelect(songs.find(song => song._id === id));
        }
    };

    const handleSort = (event) => {
        const property = event.target.value;
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const isSelected = (id) => selectedSongs.indexOf(id) !== -1;

    const sortedSongs = stableSort(songs, getComparator(order, orderBy));
    const displayedSongs = sortedSongs.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <FormControl variant="outlined" size="small">
                    <InputLabel id="sort-select-label">Sort by</InputLabel>
                    <Select
                        labelId="sort-select-label"
                        value={orderBy}
                        onChange={handleSort}
                        label="Sort by"
                        variant={'outlined'}
                    >
                        {shownAttributes.map((attr) => (
                            <MenuItem key={attr} value={attr}>
                                {attr.charAt(0).toUpperCase() + attr.slice(1)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {isSelecting && (
                    <Button
                        variant="outlined"
                        onClick={handleSelectAllClick}
                    >
                        {selectedSongs.length === songs.length ? 'Deselect All' : 'Select All'}
                    </Button>
                )}
            </Box>
            <Grid container spacing={2}>
                {displayedSongs.map((song) => {
                    const isItemSelected = isSelected(song._id);

                    return (
                        // <Grid item xs={12} sm={6} md={4} lg={3} key={song._id}>
                        // <Grid item xs={12} sm={gridSize} md={gridSize} lg={gridSize} key={song._id}>
                        <Grid item xs={12 / ITEM_COLUMNS} sm={12 / ITEM_COLUMNS} md={12 / ITEM_COLUMNS} lg={12 / ITEM_COLUMNS} key={song._id}>
                            <Card
                                raised={isItemSelected}
                                onClick={(event) => handleClick(event, song._id)}
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: 3,
                                    },
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1 }}>
                                    {shownAttributes.map((attribute) => (
                                        <Typography key={attribute} variant={attribute === 'title' ? 'h6' : 'body2'} component="div">
                                            {attribute.charAt(0).toUpperCase() + attribute.slice(1)}: {song.tags[attribute] || song.basicInfo[attribute]}
                                        </Typography>
                                    ))}
                                </CardContent>
                                <CardActions>
                                    {isSelecting && (
                                        <Fade in={isSelecting}>
                                            <AnimatedCheckbox
                                                checked={isItemSelected}
                                                className={isSelecting ? 'visible' : ''}
                                                onClick={(event) => event.stopPropagation()}
                                            />
                                        </Fade>
                                    )}
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </Box>
    );
}

