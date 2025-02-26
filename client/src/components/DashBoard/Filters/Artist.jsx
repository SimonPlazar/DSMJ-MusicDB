import {useState, useEffect} from 'react';
import {Accordion, AccordionSummary, AccordionDetails, Typography, TextField} from '@mui/material';
import {ExpandMore as ExpandMoreIcon} from '@mui/icons-material';

export function ArtistFilter({onFilterFunctionChange, reset}) {
    const [artist, setArtist] = useState('');

    useEffect(() => {
        setArtist('');
        onFilterFunctionChange('artist', null);
    }, [reset, onFilterFunctionChange]);

    const handleChange = (e) => {
        const value = e.target.value;
        setArtist(value);

        const filterFunction = (songs) => {
            return songs.filter(song =>
                song.tags.artist.toLowerCase().includes(value.toLowerCase())
            );
        };

        onFilterFunctionChange('artist', filterFunction);
    };

    return (
        <Accordion defaultExpanded={false}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography>Artist</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Search artists..."
                    value={artist}
                    onChange={handleChange}
                />
            </AccordionDetails>
        </Accordion>
    );
}

export default ArtistFilter;

