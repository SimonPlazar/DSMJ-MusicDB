import React, {useState, useEffect} from 'react';
import logo from './images/logo.svg';
// import './App.css';
import {
    Container, AppBar, Typography, Grow, Grid
} from "@mui/material";
import {useDispatch} from "react-redux";

import {getPosts} from "./actions/posts";
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from './styles';

import {ThemeProvider, createTheme} from '@mui/material/styles';

function App() {
    const theme = createTheme();
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    // }, [currentId, dispatch]);
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg">
                <AppBar className={classes.appBar} position="static" color="inherit">
                    <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
                    <img className={classes.img} src={logo} alt="memories" height="60"/>
                </AppBar>
                <Grow in>
                    <Container>
                        <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                            <Grid item xs={12} sm={7}>
                                <Posts setCurrentId={setCurrentId}/>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Form currentId={currentId} setCurrentId={setCurrentId}/>
                            </Grid>
                        </Grid>
                    </Container>
                </Grow>
            </Container>
        </ThemeProvider>
    );
}

export default App;
