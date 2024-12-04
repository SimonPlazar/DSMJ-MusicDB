import {Box, Fade, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper} from "@mui/material";
import {Close as CloseIcon, Menu as MenuIcon} from "@mui/icons-material";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";

const NavbarMenuWrapper = styled(Paper)(({theme}) => ({
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

export const NavbarMenu = ({menuItems}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleMenuClick = (path) => {
        toggleMenu();
        navigate(path); // Redirect to the page
    };

    const handleClickAway = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
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

    return (
        <Box ref={menuRef}>
            <IconButton
                color="inherit"
                aria-label="open menu"
                edge="start"
                onClick={toggleMenu}
                sx={{mr: 2}}
            >
                {menuOpen ? <CloseIcon/> : <MenuIcon/>}
            </IconButton>
            {/*<Logo />*/}
            <Fade in={menuOpen}>
                <NavbarMenuWrapper sx={{maxHeight: menuOpen ? '1000px' : 0, opacity: menuOpen ? 1 : 0}}>
                    <List>
                        {menuItems.map((item) => (
                            <ListItem button="true" key={item.text} onClick={() => handleMenuClick(item.path)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text}/>
                            </ListItem>
                        ))}
                    </List>
                </NavbarMenuWrapper>
            </Fade>
        </Box>
    )
}