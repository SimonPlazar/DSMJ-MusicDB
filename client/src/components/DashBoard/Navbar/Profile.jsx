import {Avatar, Box, IconButton, Menu, MenuItem} from "@mui/material";
import {useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {logout} from "../../../actions/users";

const StyledMenu = styled(Menu)(({theme}) => ({
    '& .MuiPaper-root': {
        marginTop: theme.spacing(1),
        minWidth: 180,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
    },
}));

export const Profile = () => {
    const {user} = useSelector((state) => state.auth);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // useEffect(() => {
    //     console.log('Profile User:', user);
    //     console.log('User picture:', user?.picture);
    // }, [user]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    }


    return (
        <Box sx={{position: 'relative'}}>
            <IconButton
                size="large"
                aria-label="account of current user"
                onClick={handleClick}
                color="inherit"
            >
                <Avatar alt={user?.first_name || "User"} src={user?.picture || ""}/>
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
                <MenuItem onClick={() => {
                    navigate('/settings')
                }}>Settings</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </StyledMenu>
        </Box>
    )
}