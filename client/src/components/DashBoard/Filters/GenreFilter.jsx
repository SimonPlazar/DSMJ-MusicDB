import { Accordion, AccordionSummary, AccordionDetails, Typography, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

export function GenreFilter({ value, onChange, genres, onGenreChange }) {
  return (
    <Accordion defaultExpanded={false}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Genre</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          fullWidth
          size="small"
          placeholder="Search genres..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          sx={{ mb: 2 }}
        />
        {genres.map((genre) => (
          <FormControlLabel
            key={genre}
            control={<Checkbox onChange={(e) => onGenreChange(genre, e.target.checked)} />}
            label={genre}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
}

