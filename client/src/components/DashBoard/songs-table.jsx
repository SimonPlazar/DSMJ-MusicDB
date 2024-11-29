import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    TableSortLabel,
    Fade,
} from '@mui/material';
import { styled } from '@mui/material/styles';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const AnimatedCheckbox = styled(Checkbox)(({ theme }) => ({
    transition: theme.transitions.create(['opacity', 'transform'], {
        duration: theme.transitions.duration.shorter,
    }),
    '&.MuiCheckbox-root': {
        opacity: 0,
        transform: 'scale(0.8)',
    },
    '&.MuiCheckbox-root.visible': {
        opacity: 1,
        transform: 'scale(1)',
    },
}));

const AnimatedTableCell = styled(TableCell, {
    shouldForwardProp: (prop) => prop !== 'isSelecting',
})(({ theme, isSelecting }) => ({
    transition: 'width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms, padding 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
    width: ({ isSelecting }) => (isSelecting ? 'auto' : 0),
    padding: ({ isSelecting }) => (isSelecting ? 'default' : 0),
}));

export function SongsTable({ songs, onSongSelect, isSelecting, setIsSelecting, selectedSongs, setSelectedSongs }) {
    const [orderBy, setOrderBy] = useState('title');
    const [order, setOrder] = useState('asc');

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = songs.map((n) => n.id);
            setSelectedSongs(newSelected);
            return;
        }
        setSelectedSongs([]);
    };

    const handleClick = (event, id) => {
        if (event.shiftKey && !isSelecting) {
            setIsSelecting(true);
            setSelectedSongs([].concat(id));
        }else if (isSelecting) {
            const selectedIndex = selectedSongs.indexOf(id);
            let newSelected = [];

            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selectedSongs, id);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selectedSongs.slice(1));
            } else if (selectedIndex === selectedSongs.length - 1) {
                newSelected = newSelected.concat(selectedSongs.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selectedSongs.slice(0, selectedIndex),
                    selectedSongs.slice(selectedIndex + 1),
                );
            }

            setSelectedSongs(newSelected);
        } else {
            onSongSelect(songs.find(song => song.id === id));
        }
    };

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const isSelected = (id) => selectedSongs.indexOf(id) !== -1;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="songs table">
                <TableHead>
                    <TableRow>
                        {isSelecting && (
                            <Fade in={isSelecting}>
                                <AnimatedTableCell padding="checkbox" isSelecting={isSelecting}>
                                    <AnimatedCheckbox
                                        indeterminate={selectedSongs.length > 0 && selectedSongs.length < songs.length}
                                        checked={songs.length > 0 && selectedSongs.length === songs.length}
                                        onChange={handleSelectAllClick}
                                        className={isSelecting ? 'visible' : ''}
                                    />
                                </AnimatedTableCell>
                            </Fade>
                        )}
                        {['title', 'artist', 'album', 'genre', 'duration'].map((headCell) => (
                            <AnimatedTableCell key={headCell} isSelecting={isSelecting}>
                                <TableSortLabel
                                    active={orderBy === headCell}
                                    direction={orderBy === headCell ? order : 'asc'}
                                    onClick={() => handleRequestSort(headCell)}
                                >
                                    {headCell.charAt(0).toUpperCase() + headCell.slice(1)}
                                    {orderBy === headCell ? (
                                        <span style={{ border: 0, clip: 'rect(0 0 0 0)', height: '1px', margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', top: '20px', width: '1px' }}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </span>
                                    ) : null}
                                </TableSortLabel>
                            </AnimatedTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(order === 'none' ? songs : stableSort(songs, getComparator(order, orderBy))).map((song) => {
                        const isItemSelected = isSelected(song.id);

                        return (
                            <TableRow
                                hover
                                onClick={(event) => handleClick(event, song.id)}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={song.id}
                                selected={isItemSelected}
                            >
                                {isSelecting && (
                                    <Fade in={isSelecting}>
                                        <AnimatedTableCell padding="checkbox" isSelecting={isSelecting}>
                                            <AnimatedCheckbox
                                                checked={isItemSelected}
                                                className={isSelecting ? 'visible' : ''}
                                            />
                                        </AnimatedTableCell>
                                    </Fade>
                                )}
                                <AnimatedTableCell isSelecting={isSelecting}>{song.title}</AnimatedTableCell>
                                <AnimatedTableCell isSelecting={isSelecting}>{song.artist}</AnimatedTableCell>
                                <AnimatedTableCell isSelecting={isSelecting}>{song.album}</AnimatedTableCell>
                                <AnimatedTableCell isSelecting={isSelecting}>{song.genre}</AnimatedTableCell>
                                <AnimatedTableCell isSelecting={isSelecting}>{song.duration}</AnimatedTableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}