import React  from "react";
import { Container } from "@material-ui/core";



import NavBar from "./components/navbar/navbar";

import { BrowserRouter, Routes , Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/postDetail/postDetails";

const App = () => {

    const user=JSON.parse(localStorage.getItem(" profile"));

    return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <NavBar/>
        <Routes>
          <Route path="/" exact element={<Navigate to="/posts"/>}/>
          <Route path="/posts" exact element={<Home/>}/>
          <Route path="/posts/:id" element={<PostDetails/>}/>
          <Route path="/auth" exact element={!user ? <Auth/> : <Navigate to="/posts"/>}/>
        </Routes>
      </Container>
    </BrowserRouter>
    );
}

export default App;
