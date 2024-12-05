import React, { useState } from 'react';
import {
    Drawer,
    Typography,
    IconButton,
    Box,
    Button,
    Paper,
    Grid,
    Divider,
} from '@mui/material';
import { Close as CloseIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { EditSongModal } from './SongDetail/EditSongModal';

export function SongDetails({ open, song, onClose, onEdit, onDelete }) {
    const [editModalOpen, setEditModalOpen] = useState(false);

    if (!song) return null;

    const handleEditClick = () => {
        setEditModalOpen(true);
    };

    const handleEditClose = () => {
        setEditModalOpen(false);
    };

    const handleSaveEdit = (editedSong) => {
        onEdit(editedSong);
        setEditModalOpen(false);
    };

    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <>
            <Drawer
                anchor="right"
                open={open}
                onClose={onClose}
                sx={{
                    width: 400,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 400,
                        boxSizing: 'border-box',
                        mt: 8,
                    },
                }}
            >
                <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                            Song Details
                        </Typography>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Paper elevation={3} sx={{
                        p: 3,
                        mb: 3,
                        flexGrow: 1,
                        overflow: 'auto',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}>
                        <Typography variant="h6" gutterBottom>{song.tags.title}</Typography>
                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>{song.tags.artist}</Typography>

                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">Album</Typography>
                                <Typography variant="body1">{song.tags.album}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">Album Artist</Typography>
                                <Typography variant="body1">{song.tags.albumArtist}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">Year</Typography>
                                <Typography variant="body1">{song.tags.year}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">Genre</Typography>
                                <Typography variant="body1">{song.tags.genre}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">Track Number</Typography>
                                <Typography variant="body1">{song.tags.trackNumber}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">Disc Number</Typography>
                                <Typography variant="body1">{song.tags.discNumber}</Typography>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6" gutterBottom>File Information</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">Duration</Typography>
                                <Typography variant="body1">{song.basicInfo.duration} s</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">Format</Typography>
                                <Typography variant="body1">{song.basicInfo.format}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">Bitrate</Typography>
                                <Typography variant="body1">{`${song.basicInfo.bitrate / 1000} kbps`}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 8 }}>
                        <Button
                            variant="contained"
                            startIcon={<EditIcon />}
                            onClick={handleEditClick}
                            sx={{ flex: 1, mr: 1 }}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={() => onDelete(song)}
                            sx={{ flex: 1, ml: 1 }}
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>
            </Drawer>
            <EditSongModal
                open={editModalOpen}
                handleClose={handleEditClose}
                song={song}
                onSave={handleSaveEdit}
            />
        </>
    );
}

