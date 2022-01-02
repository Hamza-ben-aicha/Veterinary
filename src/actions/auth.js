import {AUTH,ALLUSER}from '../constants/actionType';
import * as api from '../api/index.js';

export const signin =(formData,history) => async(dispatch)=>{
    
    try {
        // log in the user ...
        const {data} = await api.signIn(formData);
        //console.log(data);
        dispatch({type: AUTH, data});
        //console.log("after dispatch ");
        history("/");
    } catch (error) {
        //console.log("error from sign in action/auth.js");    
        console.log(error);
    }
}

//      dispatch(signup(formData,history));


export const signup =(formData,history) => async(dispatch)=>{
    try {

        // sing up the user ...
        const {data} = await api.signUp(formData);
        
        dispatch({type: AUTH, data});
        history("/");
    } catch (error) {
       // console.log("error from sing up action/auth.js");
        console.log(error);
    }
}


export const getUsers = ()=> async(dispatch) =>{
    try {
        const {data} = await api.getUsers();
        dispatch({ type: ALLUSER, payload: data });    
} catch (error) {
        console.log(error);
    }    
    // const action = ;//payload is data where we store all of our posts  
}