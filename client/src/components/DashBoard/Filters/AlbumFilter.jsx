import { Accordion, AccordionSummary, AccordionDetails, Typography, TextField } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

export function AlbumFilter({ value, onChange }) {
  return (
    <Accordion defaultExpanded={false}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Album</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          fullWidth
          size="small"
          placeholder="Search albums..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </AccordionDetails>
    </Accordion>
  );
}

