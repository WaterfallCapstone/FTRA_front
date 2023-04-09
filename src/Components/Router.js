import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import io from "socket.io-client";
import Nav from "./Nav";


import { API_URL } from "../_variables";
import Video from "./Video";
import ReqTimer from "./ReqTimer";

const socket = io.connect(API_URL,{
    cors: { origin: '*' }
});

function Router() {
    const navigate = useNavigate();
    const location = useLocation();

    const [started, setStarted] = useState(false);
    const [axis, setAxis] = useState(4);
    const [image, setImage] = useState("");

    useEffect(() => {
        socket.on("connected", (info) => {
            setAxis(Number(info.axis));
        });
        socket.on("started", (info) => {
            setStarted(true);
            console.log("started ");
        });
        socket.on("video", (info) => {
            console.log(info.image)
            setImage(info.image)
        })
    }, []);
  
    return (
        <div>
            <Nav socket = {socket}  started = {started} axis = {axis}></Nav>
            {started &&
            <ReqTimer socket={socket}></ReqTimer>
            }
            {started &&
            <Video socket={socket} image = {image} ></Video>
            }
            
        </div>
        
    );
  }
  
  export default Router;
  