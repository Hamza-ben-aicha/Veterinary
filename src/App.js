import React  from "react";
import { Container } from "@material-ui/core";



import NavBar from "./components/navbar/navbar";

import { BrowserRouter, Routes , Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
    return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <NavBar/>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/auth" exact element={<Auth/>}/>
        </Routes>
      </Container>
    </BrowserRouter>
    );
}

export default App;
