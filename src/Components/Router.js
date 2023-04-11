import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import io from "socket.io-client";
import Nav from "./Nav";


import { API_URL } from "../_variables";
import Video from "./Video";
import ReqTimer from "./ReqTimer";
import Motor from "./Motor";
import MiddleData from "./MiddleData";

const socket = io.connect(API_URL,{
    cors: { origin: '*' }
});

function Router() {
    const navigate = useNavigate();
    const location = useLocation();

    const [started, setStarted] = useState(false);
    const [axis, setAxis] = useState(4);
    const [image, setImage] = useState("");
    const [isface, setIsFace] = useState(false);
    const [facedircam, setFaceDirCam] = useState([]);
    const [faceloccam, setFaceLocCam] = useState([]);
    const [motorvalue, setMotorValue] = useState([]);
    const [armtip_lp, setALP] = useState([]);
    const [armtip_lc, setALC] = useState([]);
    const [armtip_dp, setADP] = useState([]);
    const [cam_loc, setCamLoc] = useState([]);
    const [cam_dir, setCamDir] = useState([]);
    const [mode, setMode] = useState(["control"]);

    useEffect(() => {
        socket.on("connected", (info) => {
            console.log(info.axis)
            setAxis(Number(info.axis));
        });
        socket.on("mainprocess", (info) => {
            setStarted(info.stat);
            if(info.stat){
                console.log("Started")
                socket.emit("mainprocess")
            }
        });
        socket.on("mode", (info) => {
            setMode(info.mode);
        });
        socket.on("video", (info) => {
            // console.log(info.image)
            setImage(info.image)
            setIsFace(info.isface)
        })
        socket.on("face_from_cam", (info) =>{
            setFaceDirCam(info.dir_vector);
            setFaceLocCam(info.face_loc);
        })
        socket.on("motor", (info) =>{
            console.log(info.motorvalue)
            setMotorValue(info.motorvalue);
        })
        socket.on("armtip", (info) =>{
            setALP(info.alp);
            setALC(info.alc);
            setADP(info.adp);
        })
        socket.on("camdata", (info) =>{
            setCamLoc(info.camloc);
            setCamDir(info.camdir);
        })
    }, []);
  
    return (
        <div>
            <Nav socket = {socket}  started = {started} axis = {axis} mode = {mode}></Nav>
            {/* {started &&
            <ReqTimer socket={socket}></ReqTimer>
            } */}
        
            {started &&
            <Video socket={socket} image = {image} isface = {isface} dir = {facedircam} loc = {faceloccam}></Video>
            }
            {started &&
            <Motor socket={socket} motorvalue = {motorvalue} axis = {axis} mode = {mode}></Motor>
            }
            {started &&
            <MiddleData socket={socket} at_loc_polar = {armtip_lp} at_loc_cart = {armtip_lc} at_dir_polar = {armtip_dp} cam_loc = {cam_loc} cam_dir ={cam_dir}></MiddleData>
            }
            
        </div>
        
    );
  }
  
  export default Router;
  