import React,{ useState, useEffect } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useNavigate,useLocation } from 'react-router-dom';
import useStyles from './styles';
import { useDispatch } from "react-redux";
import vetLogo from "../../images/VET+G.png";
import './style.css';
 const NavBar =()=>{

    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));// fetch from localStorage
    const dispatch = useDispatch();
    const history = useNavigate();
    const location= useLocation();  
    const logout = () => {
      dispatch({ type: "LOGOUT" });
      history("/");
      setUser(null);
    };
    useEffect(() => {
      const token = user?.token;
      //TODO:jwt manual sing up
      setUser(JSON.parse(localStorage.getItem("profile")));

    }, [location]);

    return (
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
           <img className={classes.image} src={vetLogo} alt="icon" height="60" />
          <Typography component={Link} to="/" className={classes.heading} variant="h6" align="center">
             erinary
          </Typography>
        </div>
        <Toolbar className={classes.toolbar}>
          {user ? (
            <div className={classes.profile}>
              {" "}
              <Avatar  className={classes.purple}  alt={user.result.name}  src={user.result.imageUrl}>
                {user.result.name.charAt(0)}
              </Avatar>
            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
            <Button className={classes.Button} variant="contained" className={classes.logout} color="secondary" onClick={logout}>Log Out</Button>
            </div>
          ) : (
            <Button className={classes.Button} component={Link} to="/auth" variant="contained" id="Button">sing In</Button>
          )}
        </Toolbar>
      </AppBar>
    );

}

export default NavBar;