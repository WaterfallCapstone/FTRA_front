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
    const [facedircam, setFaceDirCam] = useState([]);
    const [faceloccam, setFaceLocCam] = useState([]);

    useEffect(() => {
        socket.on("connected", (info) => {
            console.log(info.axis)
            setAxis(Number(info.axis));
        });
        socket.on("started", (info) => {
            setStarted(true);
            console.log("started ");
            socket.emit("video")
        });
        socket.on("video", (info) => {
            console.log(info.image)
            setImage(info.image)
        })
        socket.on("face_from_cam", (info) =>{
            setFaceDirCam(info.dir_vector);
            setFaceLocCam(info.face_loc);
        })
    }, []);
  
    return (
        <div>
            <Nav socket = {socket}  started = {started} axis = {axis}></Nav>
            {/* {started &&
            <ReqTimer socket={socket}></ReqTimer>
            } */}
            {started &&
            <Video socket={socket} image = {image} dir = {facedircam} loc = {faceloccam}></Video>
            }
            
        </div>
        
    );
  }
  
  export default Router;
  