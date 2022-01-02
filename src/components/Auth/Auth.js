import React, { useState ,useEffect} from "react";
import { useDispatch } from "react-redux";
import {Avatar,Button,Paper,Grid,Typography,Container,TextField}from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import LockOutLinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { signin, signup,getUsers } from "../../actions/auth";


const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

export const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const history = useNavigate();
  const [formData, setFormData] = useState(initialState);


  const handleChange = (e) => {setFormData({...formData, [e.target.name]:e.target.value})};

  const handleShowPassword = () =>setShowPassword((prevShowPassword) => !prevShowPassword);
  
  const switchMode = () => {
    setIsSignUp((prevIs) => !prevIs);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokeId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google sing in was unsuccessful");
  };

  const handleSubmit = (e) => {
    
    if(isSignUp){
      dispatch(signup(formData,history));
    }else{
      dispatch(signin(formData,history));
    }
    e.preventDefault();
  };


  useEffect(() => {
    dispatch(getUsers());
  });


  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutLinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sing Up" : "Sing In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              /* when ... ? ... : null -- then we changeit to && and change the ? sign with && */ 
              <>
                <Input name="firstName" label="first Name" handleChange={handleChange} autoFocus half/>
                <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
              </>
            )}
            <Input name="email"  label="Email Adress"  handleChange={handleChange}  type="email"/>
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
            {isSignUp && (
              <Input name="confirmPassword" label="confirm password" handleChange={handleChange} type={showPassword ? "text" : "password"}/>
            )}
          </Grid>
          <Button type="sumbit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignUp ? "sign up" : "sing in"}
          </Button>
          <GoogleLogin
            clientId="637118768601-2mh7db33v2vk97kvbcf6nje018g5379q.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} variant="contained">
                {" "}
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="center">
            <Button onClick={switchMode}>
              {isSignUp
                ? "I have an account"
                : "I don't have an Account ! Sing Up here"}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
