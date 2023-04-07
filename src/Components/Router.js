import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import io from "socket.io-client";
import Nav from "./Nav";



import { API_URL } from "../_variables";

const socket = io.connect(API_URL,{
    cors: { origin: '*' }
});

function Router() {
    // const navigate = useNavigate();
    // const location = useLocation();

  
    return (
        <div>
            <Nav socket = {socket}></Nav>
            {/* <Routes>
                <Route
                    path="/*"
                    element={<RoomContainer socket={socket} room_list={room_list} />}
                />
            </Routes> */}
        </div>
        
    );
  }
  
  export default Router;
  