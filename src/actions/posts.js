import * as api from '../api';


//actions creators --> are functions that returns actions
export const getPosts = ()=> async(dispatch) =>{
    try {
        const {data} = await api.fetchPosts();
        dispatch({ type: "FETCH_ALL", payload: data });    
} catch (error) {
        console.log(error.message);
    }    
    // const action = ;//payload is data where we store all of our posts  
}

export const createPost = (post)=> async(dispatch) =>{
    try {
        const {data} = await api.createPost(post);
        dispatch({ type: "CREATE", payload: data });    
} catch (error) {
        console.log(error.message);
    }    
    // const action = ;//payload is data where we store all of our posts  
}

export const updatePost = (id,post)=> async(dispatch) =>{
    try {
        const {data} = await api.updatePost(id,post);// this api request returning the updating post -> response
        dispatch({type:'UPDATE', payload:data})
} catch (error) {
        console.log(error.message);
    }    
      
}


export const deletePost = (id)=> async(dispatch) =>{
    try {
        await api.deletePost(id);
        dispatch({type:'DELETE', payload:id })
} catch (error) {
        console.log(error.message);
    }    
      
}