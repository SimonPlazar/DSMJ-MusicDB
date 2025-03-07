import React, {useEffect, useState} from "react";
import useStyles from './styles';
import {TextField, Button, Typography, Paper, MenuPaper} from "@mui/material";
import FileBase from "react-file-base64";
import {useDispatch, useSelector} from "react-redux";
import {createPost, updatePost} from "../actions_posts";

const Form = ({currentId, setCurrentId}) => {

    const posts = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);

    const [postData, setPostData] = useState({
        creator: '', title: '', message: '', tags: '', selectedFile: ''
    });

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if (posts) setPostData(posts);
    }, [posts]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, postData));
        } else {
            dispatch(createPost(postData));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({creator: '', title: '', message: '', tags: '', selectedFile: ''});
    }
    return (
        <Paper className={classes.paper}>
            <div className={classes.root}>
                <form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit}>
                    <Typography variant="h6">{currentId ? 'Editing': 'Creating'} a Memory</Typography>
                    <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator}
                               onChange={(e) => setPostData({...postData, creator: e.target.value})}/>
                    <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title}
                               onChange={(e) => setPostData({...postData, title: e.target.value})}/>
                    <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message}
                               onChange={(e) => setPostData({...postData, message: e.target.value})}/>
                    <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags}
                               onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}/>
                    <div className={classes.fileInput}>
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                        />
                    </div>

                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large"
                            type="submit"
                            fullWidth>Submit</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                </form>
            </div>
        </Paper>
    );
}

export default Form;