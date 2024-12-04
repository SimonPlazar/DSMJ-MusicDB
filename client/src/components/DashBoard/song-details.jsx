import React, { useState } from 'react';
import {
    Drawer,
    Typography,
    IconButton,
    Box,
    Button,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import { Close as CloseIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { EditSongModal } from './SongDetail/EditSongModal';

export function SongDetails({ open, song, onClose, onEdit, onDelete }) {
    const [editModalOpen, setEditModalOpen] = useState(false);

    // console.log("SongDetails", song);

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
                    minHeight: '100vh',
                }}
            >
                <Box sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            {song.tags.title}
                        </Typography>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Divider />

                    <List>
                        <ListItem>
                            <ListItemText primary="Artist" secondary={song.tags.artist} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Album" secondary={song.tags.album} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Year" secondary={song.tags.year} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Genre" secondary={song.tags.genre} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Duration" secondary={song.basicInfo.duration} />
                        </ListItem>
                        <Divider/>
                        <ListItem sx={{mb: 5}}>
                            <Button
                                variant="contained"
                                startIcon={<EditIcon />}
                                fullWidth
                                onClick={handleEditClick}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<DeleteIcon />}
                                fullWidth
                                onClick={() => onDelete(song)}
                            >
                                Delete
                            </Button>
                        </ListItem>
                    </List>
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

