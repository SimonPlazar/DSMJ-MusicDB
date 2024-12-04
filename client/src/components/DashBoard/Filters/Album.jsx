import {useState, useEffect} from 'react';
import {Accordion, AccordionSummary, AccordionDetails, Typography, TextField} from '@mui/material';
import {ExpandMore as ExpandMoreIcon} from '@mui/icons-material';

export function AlbumFilter({onFilterFunctionChange, reset}) {
    const [album, setAlbum] = useState('');

    useEffect(() => {
        setAlbum('');
        onFilterFunctionChange('album', null);
    }, [reset, onFilterFunctionChange]);
    const handleChange = (e) => {
        const value = e.target.value;
        setAlbum(value);

        const filterFunction = (songs) => {
            return songs.filter(song =>
                song.tags.album.toLowerCase().includes(value.toLowerCase())
            );
        };

        onFilterFunctionChange('album', filterFunction);
    };

    return (
        <Accordion defaultExpanded={false}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography>Album</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Search albums..."
                    value={album}
                    onChange={handleChange}
                />
            </AccordionDetails>
        </Accordion>
    );
}

