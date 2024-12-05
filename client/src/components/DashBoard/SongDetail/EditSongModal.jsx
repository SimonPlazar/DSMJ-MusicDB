import React, { useState, useEffect } from 'react';
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Divider
} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflow: 'auto',
};

export function EditSongModal({ open, handleClose, song, onSave }) {
    const [editedSong, setEditedSong] = useState(song);

    useEffect(() => {
        setEditedSong(song);
    }, [song]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [category, field] = name.split('.');

        setEditedSong((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [field]: value,
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedSong);
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="edit-song-modal-title"
        >
            <Box sx={style}>
                <Typography id="edit-song-modal-title" variant="h6" component="h2" gutterBottom>
                    Edit Song
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom>Tags</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Title"
                                name="tags.title"
                                value={editedSong.tags.title}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Artist"
                                name="tags.artist"
                                value={editedSong.tags.artist}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Album"
                                name="tags.album"
                                value={editedSong.tags.album}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Album Artist"
                                name="tags.albumArtist"
                                value={editedSong.tags.albumArtist}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Genre"
                                name="tags.genre"
                                value={editedSong.tags.genre}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Year"
                                name="tags.year"
                                type="number"
                                value={editedSong.tags.year}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Track Number"
                                name="tags.trackNumber"
                                type="number"
                                value={editedSong.tags.trackNumber}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Disc Number"
                                name="tags.discNumber"
                                type="number"
                                value={editedSong.tags.discNumber}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="subtitle1" gutterBottom>Basic Info</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Duration (seconds)"
                                name="basicInfo.duration"
                                type="number"
                                value={editedSong.basicInfo.duration}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Format"
                                name="basicInfo.format"
                                value={editedSong.basicInfo.format}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Bitrate (bps)"
                                name="basicInfo.bitrate"
                                type="number"
                                value={editedSong.basicInfo.bitrate}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Save Changes
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Modal>
    );
}