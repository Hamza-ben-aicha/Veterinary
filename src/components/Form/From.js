import React, {useState , useEffect} from "react";
import useStyles from './styles';
import FileBase from 'react-file-base64';
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import {useDispatch} from 'react-redux';
import { createPost,updatePost } from "../../actions/posts";
import {useSelector} from 'react-redux';

//for udpate: we hame to get the current Id

const Form =({currentId,setCurrentId})=>{

    const post = useSelector((state)=> currentId ? state.posts.find((p)=> p._id === currentId): null); // currentId ? it mean thats is not null
    
    const classes = useStyles();
    const [postData, setPostData]= useState({
        title:"", 
        message:"",
        selectedFile:"none"
    })

    const user=JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
      if (post) setPostData(post);
    }, [post]);

    const clear=()=>{
        setCurrentId(null);
        setPostData({
          title: "",
          message: "",
          selectedFile: "none",
        });   
    }

    const dispatch = useDispatch();
    
    const handleSumbit=(e)=>{
        e.preventDefault();
        if(currentId){
          dispatch(updatePost(currentId,{...postData, name :user?.result?.name}));
          clear(); 
        }else{
          dispatch(createPost({...postData, name :user?.result?.name}));
          clear(); 
        }
    }
    
    if (!user?.result?.name) {
      return (
          <Paper className={classes.paper}>
              <Typography variant="h6" align="center">
                Please Sign In , to create you own post
              </Typography>
          </Paper>
      )
    }

    return (
      //paper is like a div that has a wihtish background
      <Paper className={classes.paper}>
        <form  autoComplete="off" noValidate  className={`${classes.root} ${classes.form}`} onSubmit={handleSumbit} >
            <Typography variant="h6">{currentId ? 'Editing': 'Creating'} a Post</Typography>
            {/* <TextField name="creator" variant="outlined" label="creator" fullWidth value={postData.creator} onChange={(e)=> setPostData({...postData, creator : e.target.value})}/> */}
            <TextField name="title" variant="outlined" label="title" fullWidth value={postData.title} onChange={(e)=> setPostData({...postData, title : e.target.value})}/>
            <TextField name="message" variant="outlined" label="message" fullWidth value={postData.message} onChange={(e)=> setPostData({...postData, message : e.target.value})}/>
            <div className={classes.fileInput}><FileBase type="jpg" multiple={false} onDone={(base64)=> setPostData({...postData, selectedFile: base64.base64})}/></div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Post</Button>
            <Button  variant="contained"  size="small" onClick={clear} fullWidth>Clear</Button>

        </form>
          
      </Paper>
    );
}

export default Form;