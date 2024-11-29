import {MusicNote as MusicNoteIcon} from '@mui/icons-material';
import {Typography} from '@mui/material';


export function Logo() {
    return (
        <>
            <MusicNoteIcon sx={{mr: 1}}/>
            <Typography variant="h6" noWrap component="div">
                MusicDB
            </Typography>
        </>
    );
}