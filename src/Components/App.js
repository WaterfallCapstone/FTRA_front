import React, { useState }  from "react";
import io from "socket.io-client";
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";

const App = () => {

    return (
      <BrowserRouter><Router /></BrowserRouter>
      

    );
  };
  
  export default App;