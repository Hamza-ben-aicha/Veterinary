import { AUTH, LOGOUT } from "../constants/actionType";

const authReducer = (state={authData : null}, action) => {
  switch (action.type) {
    case AUTH:
      //console.log('in reducers/auth.js');
      localStorage.setItem('profile', JSON.stringify({...action.data}));
      //console.log('in reducers/auth.js after localStore instruction ');
      return {...state, authData: action.data};
    case LOGOUT:
        localStorage.clear();
        return {...state, authData: null};
    default:
      return state;
  }
};

export default authReducer;
