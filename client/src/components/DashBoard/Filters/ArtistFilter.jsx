import { Accordion, AccordionSummary, AccordionDetails, Typography, TextField } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

export function ArtistFilter({ value, onChange }) {
  return (
    <Accordion defaultExpanded={false}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Artist</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          fullWidth
          size="small"
          placeholder="Search artists..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </AccordionDetails>
    </Accordion>
  );
}

