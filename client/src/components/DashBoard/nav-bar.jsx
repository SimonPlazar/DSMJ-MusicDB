import { useState, useRef, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    InputBase,
    IconButton,
    Avatar,
    Box,
    Menu,
    MenuItem,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Fade,
    Paper,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
    Search as SearchIcon,
    Menu as MenuIcon,
    Close as CloseIcon,
    CheckBox as CheckBoxIcon,
    ImportExport as ImportExportIcon,
    PlaylistPlay as PlaylistPlayIcon,
    BarChart as BarChartIcon,
    Settings as SettingsIcon,
} from '@mui/icons-material';

import {CheckBoxOutlineBlankOutlined} from "@mui/icons-material";

import { Logo } from './Navbar/logo';

import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(3),
    width: '100%',
    maxWidth: '400px',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        marginTop: theme.spacing(1),
        minWidth: 180,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
    },
}));

const NavbarMenu = styled(Paper)(({ theme }) => ({
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '250px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    zIndex: theme.zIndex.drawer + 2,
    overflow: 'hidden',
    transition: theme.transitions.create(['max-height', 'opacity'], {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeInOut,
    }),
}));

const SelectButton = styled(IconButton)(({ theme, isselecting }) => ({
    backgroundColor: isselecting === 'true' ? alpha(theme.palette.primary.main, 0.2) : 'transparent',
    '&:hover': {
        backgroundColor: isselecting === 'true' ? alpha(theme.palette.primary.main, 0.3) : alpha(theme.palette.common.white, 0.1),
    },
    transition: theme.transitions.create(['background-color'], {
        duration: theme.transitions.duration.shortest,
    }),
}));

export function Navbar({ searchQuery, setSearchQuery, isSelecting, setIsSelecting }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleClickAway = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
    };

    const handleMenuClick = (path) => {
        toggleMenu();
        navigate(path); // Redirect to the desired page
    };

    useEffect(() => {
        if (menuOpen) {
            document.addEventListener('mousedown', handleClickAway);
        } else {
            document.removeEventListener('mousedown', handleClickAway);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickAway);
        };
    }, [menuOpen]);

    const menuItems = [
        { text: 'Import/Export', icon: <ImportExportIcon />, path: '/import-export' },
        { text: 'Playlists', icon: <PlaylistPlayIcon />, path: '/playlists' },
        { text: 'Analytics', icon: <BarChartIcon />, path: '/analytics' },
        { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    ];

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }} ref={menuRef}>
                    <IconButton
                        color="inherit"
                        aria-label="open menu"
                        edge="start"
                        onClick={toggleMenu}
                        sx={{ mr: 2 }}
                    >
                        {menuOpen ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>
                    <Logo />
                    <Fade in={menuOpen}>
                        <NavbarMenu sx={{ maxHeight: menuOpen ? '1000px' : 0, opacity: menuOpen ? 1 : 0 }}>
                            <List>
                                {menuItems.map((item) => (
                                    <ListItem button="true" key={item.text} onClick={() => handleMenuClick(item.path)}>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItem>
                                ))}
                            </List>
                        </NavbarMenu>
                    </Fade>
                </Box>

                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search songs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Search>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <SelectButton
                        color="inherit"
                        onClick={() => setIsSelecting(!isSelecting)}
                        isselecting={isSelecting.toString()}
                        aria-label="toggle selection mode"
                    >
                        {isSelecting ? <CheckBoxIcon /> : <CheckBoxOutlineBlankOutlined />}
                    </SelectButton>
                    <Box sx={{ position: 'relative' }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            onClick={handleClick}
                            color="inherit"
                        >
                            <Avatar alt="User" src="/placeholder.svg" />
                        </IconButton>
                        <StyledMenu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>Settings</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </StyledMenu>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}