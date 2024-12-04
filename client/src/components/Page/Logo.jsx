import {MusicNote as MusicNoteIcon} from '@mui/icons-material';
import {Typography} from '@mui/material';
import {Box} from '@mui/system';
import {Link} from "react-router-dom";


export function Logo() {
    return (
        <Link to={"/"} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MusicNoteIcon sx={{mr: 1}}/>
                <Typography variant="h6" noWrap component="div">
                    MusicDB
                </Typography>
            </Box>
        </Link>
    );
}