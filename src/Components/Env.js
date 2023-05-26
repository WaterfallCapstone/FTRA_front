// import { parse } from "nth-check";
import React, { useEffect, useState } from "react";


const Env = ({ socket }) => {
    const [tickrate, setTickrate] = useState(20);
    const [camidx, setCamidx] = useState(1);
    const [tickratetmp, setTickrateTmp] = useState("");
    const [camidxtmp, setCamidxTmp] = useState("");
    const [iscamrun, setIsCamRun] = useState(false);
    const [isfacemesh, setFaceMesh] = useState(false);
    const [istest, setIsTest] = useState(false)
    const [image,setImage] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [arduinoport,setArduinoport] = useState("")
    const [baudrate,setBaudrate] = useState("")
    const [portlist,setPortList] = useState([])
    const [arduinoporttmp, setArduinoportTmp] = useState("");
    const [baudratetmp, setBaudrateTmp] = useState("");
    const [isarduino, setIsArduino] = useState(false);

    useEffect(() => {
        socket.emit("getconfig");

        socket.on("getconfig", (info) => {
            console.log(info)
            setTickrate(info.tickrate * 1000);
            setCamidx(info.camindex);
            setIsCamRun(info.iscamrun)
            setFaceMesh(info.isfacemesh)
            setIsOpen(info.isOpen)
            setArduinoport(info.arduinoport)
            setBaudrate(info.baudrate)
            setPortList(info.portlist)
            setIsArduino(info.isarduino)
        });
        socket.on("video", (info) => {
            setImage(info.image)
        });
    }, []);

    const onChange = (key, data) => {
        if(key === "tickrate"){
            setTickrateTmp(data);
        }
        else if(key === "camindex"){
            setCamidxTmp(data);
        }
        else if(key === "arduinoport"){
            setArduinoportTmp(data);
        }
        else if(key === "baudrate"){
            setBaudrateTmp(data);
        }
    }
    const submitSetting = (key) => {
        if(key === "tickrate"){
            socket.emit("setconfig", { "tickrate" : parseInt(tickratetmp) });
            setTickrateTmp("");
        }
        else if(key === "camindex"){
            socket.emit("setconfig", { "camindex" : parseInt(camidxtmp) });
            setCamidxTmp("");
        }
        else if(key === "camera"){
            let result = true
            if(iscamrun){
                result = false
            }
            socket.emit("setconfig", { "camera" : result });
        }
        else if(key === "facemesh"){
            let result = true
            if(isfacemesh){
                result = false
            }
            socket.emit("setconfig", { "isfacemesh" : result });
        }
        else if(key === "arduinoport"){
            socket.emit("setconfig", { "arduinoport" : arduinoporttmp });
            setArduinoportTmp("");
        }
        else if(key === "baudrate"){
            socket.emit("setconfig", { "baudrate" : baudratetmp });
            setBaudrateTmp("");
        }
    }

    const submitTest = () => {
        if(istest) {
            socket.emit("stop");
            setIsTest(false)
        }else{
            if(isOpen){
                socket.emit("startcam");
                if(isfacemesh){
                    socket.emit("startmesh")
                }
                socket.emit("getimg");
                setIsTest(true)
            }
        }
    }



    return (
        <div className="container">

            <h1>CameraEnv</h1>
            <div>
                <span>isCameraOpen : </span>
                <span>{isOpen? <span>true</span> : <span>false</span>}  </span>
            </div>
            <div>
                <span>tickrate : </span>
                <span>{tickrate}  </span>
                <input value={tickratetmp} onChange={(e) => onChange("tickrate",e.target.value)} />
                <button onClick={() => submitSetting("tickrate")}>submit</button>
            </div>
            <div>
                <span>camidx : </span>
                <span>{camidx}  </span>
                <input value={camidxtmp} onChange={(e) => onChange("camindex",e.target.value)} />
                <button onClick={() => submitSetting("camindex")}>submit</button>
            </div>
            <div>
                <span>iscamrun : </span>
                {iscamrun ? <span>true</span> : <span>false</span>}
                <button onClick={() => submitSetting("camera")}>change</button>
            </div>
            <div>
                <span>isfacemesh : </span>
                {isfacemesh ? <span>true</span> : <span>false</span>}
                <button onClick={() => submitSetting("facemesh")}>change</button>
            </div>
            <div>
                <div>
                    <img src={image} alt="no img" height="360" width="480" />
                </div>
                <button onClick={submitTest}>{istest ? <span>stop</span> : <span>test</span>}</button>

            </div>

            <h2>MotorEnv</h2>
            <div>
                <span>arduinoport : </span>
                <span>{arduinoport}  </span>
                <input value={arduinoporttmp} onChange={(e) => onChange("arduinoport",e.target.value)} />
                <button onClick={() => submitSetting("arduinoport")}>submit</button>
                <span> available ports : {portlist}</span> 
            </div>
            <div>
                <span>baudrate : </span>
                <span>{baudrate}  </span>
                <input value={baudratetmp} onChange={(e) => onChange("baudrate",e.target.value)} />
                <button onClick={() => submitSetting("baudrate")}>submit</button>
            </div>
            <div>
                <span>isarduino : </span>
                {isarduino ? <span>true</span> : <span>false</span>}
            </div>
        </div>
        
    );
};

export default Env;