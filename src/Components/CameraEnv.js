import { parse } from "nth-check";
import React, { useEffect, useState } from "react";


const CameraEnv = ({ camerasocket }) => {
    const [tickrate, setTickrate] = useState(20);
    const [camidx, setCamidx] = useState(1);
    const [tickratetmp, setTickrateTmp] = useState("");
    const [camidxtmp, setCamidxTmp] = useState("");
    const [iscamrun, setIsCamRun] = useState(false);
    const [isfacemesh, setFaceMesh] = useState(false);
    const [istest, setIsTest] = useState(false)
    const [image,setImage] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        camerasocket.emit("getconfig");

        camerasocket.on("getconfig", (info) => {
            console.log(info)
            setTickrate(info.tickrate * 1000);
            setCamidx(info.camindex);
            setIsCamRun(info.iscamrun)
            setFaceMesh(info.isfacemesh)
            setIsOpen(info.isOpen)
        });
        camerasocket.on("video", (info) => {
            setImage(info.image)
        });
    }, []);

    const onChangeTickrate = (e) => {
        const temp = e.target.value;
        setTickrateTmp(temp);
    };

    const submitTickrate = () => {
        camerasocket.emit("setconfig", { "tickrate": parseInt(tickratetmp) });
        setTickrateTmp("");
    }
    const onChangeCamIdx = (e) => {
        const temp = e.target.value;
        setCamidxTmp(temp);
    };

    const submitCamIdx = () => {
        camerasocket.emit("setconfig", { "camindex": parseInt(camidxtmp) });
        setCamidxTmp("");
    }
    const submitCamRun = () => {
        let result = true
        if(iscamrun){
            result = false
        }
        camerasocket.emit("setconfig", { "camera": result });
    }
    const submitFaceMesh = () => {
        let result = true
        if(isfacemesh){
            result = false
        }
        console.log(result)
        camerasocket.emit("setconfig", { "facemesh": result });
    }

    const submitTest = () => {
        if(istest) {
            camerasocket.emit("stop");
            setIsTest(false)
        }else{
            if(isOpen){
                camerasocket.emit("start");
                if(isfacemesh){
                    camerasocket.emit("startmesh")
                }
                camerasocket.emit("getimg");
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
                <input value={tickratetmp} onChange={onChangeTickrate} />
                <button onClick={submitTickrate}>submit</button>
            </div>
            <div>
                <span>camidx : </span>
                <span>{camidx}  </span>
                <input value={camidxtmp} onChange={onChangeCamIdx} />
                <button onClick={submitCamIdx}>submit</button>
            </div>
            <div>
                <span>iscamrun : </span>
                {iscamrun ? <span>true</span> : <span>false</span>}
                <button onClick={submitCamRun}>change</button>
            </div>
            <div>
                <span>isfacemesh : </span>
                {isfacemesh ? <span>true</span> : <span>false</span>}
                <button onClick={submitFaceMesh}>change</button>
            </div>
            <div>
                <div>
                    <img src={image} alt="no img" height="360" width="480" />
                </div>
                <button onClick={submitTest}>{istest ? <span>stop</span> : <span>test</span>}</button>

            </div>
        </div>

        
    );
};

export default CameraEnv;