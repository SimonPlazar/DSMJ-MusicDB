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
import {Close as CloseIcon, Edit as EditIcon, Delete as DeleteIcon} from '@mui/icons-material';

export function SongDetails({open, song, onClose, onEdit, onDelete}) {
    if (!song) return null;

    return (
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
            <Box sx={{p: 3}}>
                <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                    <Typography variant="h6" sx={{flexGrow: 1}}>
                        {song.title}
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon/>
                    </IconButton>
                </Box>

                <Divider/>

                <List sx={{mb: 10}}>
                    <ListItem>
                        <ListItemText primary="Artist" secondary={song.artist}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Album" secondary={song.album}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Year" secondary={song.year}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Genre" secondary={song.genre}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Duration" secondary={song.duration}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Total Plays"
                            secondary={song.plays.toLocaleString()}
                        />
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        {/*<Box sx={{display: 'flex', gap: 2}}>*/}
                            <Button
                                variant="contained"
                                startIcon={<EditIcon/>}
                                fullWidth
                                onClick={() => onEdit(song)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<DeleteIcon/>}
                                fullWidth
                                onClick={() => onDelete(song)}
                            >
                                Delete
                            </Button>
                        {/*</Box>*/}
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
}

