import React, {useState, useEffect} from 'react';
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    Grid
} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export function EditSongModal({open, handleClose, song, onSave}) {
    const [editedSong, setEditedSong] = useState(song);

    // console.log("EditSongModal", song);

    useEffect(() => {
        setEditedSong(song);
    }, [song]);

    const handleChange = (e) => {
        const {name, value} = e.target;

        // Check if the field belongs to `tags` or `basicInfo`
        if (name in editedSong.tags) {
            // Update the tags object immutably
            setEditedSong((prev) => ({
                ...prev,
                tags: {
                    ...prev.tags,
                    [name]: value, // Update the specific field in tags
                },
            }));
        } else if (name in editedSong.basicInfo) {
            // Update the basicInfo object immutably
            setEditedSong((prev) => ({
                ...prev,
                basicInfo: {
                    ...prev.basicInfo,
                    [name]: value, // Update the specific field in basicInfo
                },
            }));
        }
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
                            <TextField
                                fullWidth
                                label="Title"
                                name="title"
                                value={editedSong.tags.title}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Artist"
                                name="artist"
                                value={editedSong.tags.artist}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Album"
                                name="album"
                                value={editedSong.tags.album}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Year"
                                name="year"
                                type="number"
                                value={editedSong.tags.year}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Genre"
                                name="genre"
                                value={editedSong.tags.genre}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Duration"
                                name="duration"
                                value={editedSong.basicInfo.duration}
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

