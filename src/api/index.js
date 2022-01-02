import axios from 'axios';

const API= axios.create({baseURL : 'https://vet-plus.herokuapp.com/'})

//const url='https://vet-plus.herokuapp.com/posts';

API.interceptors.request.use((req)=>{
    if( localStorage.getItem('profile')){
        req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});


export const fetchPosts =()=> API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const updatePost=(id , postData)=> API.patch(`/posts/${id}`,postData);
export const likePost=(id)=> API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post('/user/signin',formData);
export const signUp = (formData) => API.post('/user/signup',formData);
export const getUsers = ()=> API.get('/user/all');