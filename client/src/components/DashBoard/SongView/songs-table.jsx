import {useEffect, useState} from 'react';
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
    TablePagination,
} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useSelector} from "react-redux";
import {useTheme} from "@mui/system";

import {stableSort, getComparator} from './SortLogic';

const AnimatedCheckbox = styled(Checkbox)(({theme}) => ({
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
})(({theme, isSelecting}) => ({
    transition: 'width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms, padding 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
    width: ({isSelecting}) => (isSelecting ? 'auto' : 0),
    padding: ({isSelecting}) => (isSelecting ? 'default' : 0),
}));

export function SongsTable({songs, onSongSelect, isSelecting, setIsSelecting, selectedSongs, setSelectedSongs, reset, shownAttributes}) {
    const [orderBy, setOrderBy] = useState('title');
    const [order, setOrder] = useState('asc');
    const [page, setPage] = useState(0);
    const {user} = useSelector((state) => state.auth)
    const theme = useTheme();

    // const shownAttributes = ['title', 'artist', 'album', 'genre', 'duration'];

    const ITEMS_PER_PAGE = user?.settings?.table_rows || theme.components?.SongView?.defaultRows || 5;
    const lessThanOnePage = songs.length <= ITEMS_PER_PAGE;
    // const lessThanOnePage = false;

    useEffect(() => {
        if (songs.length <= page * ITEMS_PER_PAGE) {
            setPage(0);
        }
    }, [reset, page, songs, ITEMS_PER_PAGE]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const displayedSongs = stableSort(songs, getComparator(order, orderBy))
        .slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE);


    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = songs.map((n) => n._id);
            setSelectedSongs(newSelected);
            return;
        }
        setSelectedSongs([]);
    };

    const handleClick = (event, id) => {
        if (event.shiftKey && !isSelecting) {
            setIsSelecting(true);
            setSelectedSongs([].concat(id));
        } else if (isSelecting) {
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
            onSongSelect(songs.find(song => song._id === id));
        }
    };

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const isSelected = (id) => selectedSongs.indexOf(id) !== -1;

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="songs table">
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
                            {shownAttributes.map((headCell) => (
                                <AnimatedTableCell key={headCell} isSelecting={isSelecting}>
                                    <TableSortLabel
                                        active={orderBy === headCell}
                                        direction={orderBy === headCell ? order : 'asc'}
                                        onClick={() => handleRequestSort(headCell)}
                                    >
                                        {headCell.charAt(0).toUpperCase() + headCell.slice(1)}
                                        {orderBy === headCell ? (
                                            <span style={{
                                                border: 0,
                                                clip: 'rect(0 0 0 0)',
                                                height: '1px',
                                                margin: -1,
                                                overflow: 'hidden',
                                                padding: 0,
                                                position: 'absolute',
                                                top: '20px',
                                                width: '1px'
                                            }}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </span>
                                        ) : null}
                                    </TableSortLabel>
                                </AnimatedTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(order === 'none' ? displayedSongs : stableSort(displayedSongs, getComparator(order, orderBy))).map((song) => {
                            const isItemSelected = isSelected(song._id);

                            return (
                                <TableRow
                                    hover
                                    onClick={(event) => handleClick(event, song._id)}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={song._id}
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

                                    {shownAttributes.map((attribute) => (
                                        <AnimatedTableCell key={attribute} isSelecting={isSelecting}>
                                            {song.tags[attribute] || song.basicInfo[attribute]}
                                        </AnimatedTableCell>
                                    ))}

                                    {/*<AnimatedTableCell isSelecting={isSelecting}>{song.tags.title}</AnimatedTableCell>*/}
                                    {/*<AnimatedTableCell isSelecting={isSelecting}>{song.tags.artist}</AnimatedTableCell>*/}
                                    {/*<AnimatedTableCell isSelecting={isSelecting}>{song.tags.album}</AnimatedTableCell>*/}
                                    {/*<AnimatedTableCell isSelecting={isSelecting}>{song.tags.genre}</AnimatedTableCell>*/}
                                    {/*<AnimatedTableCell isSelecting={isSelecting}>{song.basicInfo.duration}</AnimatedTableCell>*/}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {!lessThanOnePage && <TablePagination
                rowsPerPageOptions={[ITEMS_PER_PAGE]}
                component="div"
                count={songs.length}
                rowsPerPage={ITEMS_PER_PAGE}
                page={page}
                onPageChange={handleChangePage}
            />}
        </>
    );
}