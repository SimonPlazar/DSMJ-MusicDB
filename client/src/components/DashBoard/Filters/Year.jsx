import { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, TextField, Box } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

export function YearFilter({ onFilterFunctionChange, reset }) {
    const [yearStart, setYearStart] = useState('');
    const [yearEnd, setYearEnd] = useState('');

    useEffect(() => {
        // if (reset) {
            setYearStart('');
            setYearEnd('');
            onFilterFunctionChange('year', null);
        // }
    }, [reset, onFilterFunctionChange]);

    const handleChange = () => {
        const filterFunction = (songs) => {
            return songs.filter(song => {
                const year = song.tags.year;
                if (yearStart && yearEnd) {
                    return year >= parseInt(yearStart) && year <= parseInt(yearEnd);
                } else if (yearStart) {
                    return year >= parseInt(yearStart);
                } else if (yearEnd) {
                    return year <= parseInt(yearEnd);
                }
                return true;
            });
        };

        onFilterFunctionChange('year', filterFunction);
    };

    return (
        <Accordion defaultExpanded={false}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Year</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <TextField
                        size="small"
                        placeholder="From"
                        value={yearStart}
                        onChange={(e) => {
                            setYearStart(e.target.value);
                            handleChange();
                        }}
                        type="number"
                    />
                    <Typography>-</Typography>
                    <TextField
                        size="small"
                        placeholder="To"
                        value={yearEnd}
                        onChange={(e) => {
                            setYearEnd(e.target.value);
                            handleChange();
                        }}
                        type="number"
                    />
                </Box>
            </AccordionDetails>
        </Accordion>
    );
}

export default YearFilter;