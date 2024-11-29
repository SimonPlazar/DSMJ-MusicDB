import { Accordion, AccordionSummary, AccordionDetails, Typography, TextField, Box } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

export function YearFilter({ startYear, endYear, onStartYearChange, onEndYearChange }) {
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
            value={startYear}
            onChange={(e) => onStartYearChange(e.target.value)}
            type="number"
          />
          <Typography>-</Typography>
          <TextField
            size="small"
            placeholder="To"
            value={endYear}
            onChange={(e) => onEndYearChange(e.target.value)}
            type="number"
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

