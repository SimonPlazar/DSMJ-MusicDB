import {useState, useEffect} from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    TextField,
    Checkbox,
    FormControlLabel
} from '@mui/material';
import {ExpandMore as ExpandMoreIcon} from '@mui/icons-material';

export function GenreFilter({onFilterFunctionChange, genres, reset}) {
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genere, setGenere] = useState('');

    useEffect(() => {
        setSelectedGenres([]);
        setGenere('');
        onFilterFunctionChange('genre', null);
    }, [reset, onFilterFunctionChange]);

    const handleGenreChange = (genre, isChecked) => {
        let newSelectedGenres;
        if (isChecked) {
            newSelectedGenres = [...selectedGenres, genre];
        } else {
            newSelectedGenres = selectedGenres.filter(g => g !== genre);
        }
        setSelectedGenres(newSelectedGenres);

        const filterFunction = (songs) => {
            if (newSelectedGenres.length === 0) return songs;
            return songs.filter(song => newSelectedGenres.includes(song.tags.genre));
        };

        onFilterFunctionChange('genre', filterFunction);
    };

    return (
        <Accordion defaultExpanded={false}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography>Genre</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {/*<TextField*/}
                {/*    fullWidth*/}
                {/*    size="small"*/}
                {/*    placeholder="Search artists..."*/}
                {/*    value={genres}*/}
                {/*    onChange={handleChange}*/}
                {/*/>*/}
                {genres.map((genre) => (
                    <FormControlLabel
                        key={genre}
                        control={
                            <Checkbox
                                checked={selectedGenres.includes(genre)}
                                onChange={(e) => handleGenreChange(genre, e.target.checked)}
                            />
                        }
                        label={genre}
                    />
                ))}
            </AccordionDetails>
        </Accordion>
    );
}

export default GenreFilter;

