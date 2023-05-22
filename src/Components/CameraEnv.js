import { parse } from "nth-check";
import React, { useEffect, useState } from "react";


const CameraEnv = ({ camerasocket }) => {
    const [tickrate, setTickrate] = useState(20);
    const [camidx, setCamidx] = useState(1);
    const [tickratetmp, setTickrateTmp] = useState("");
    const [camidxtmp, setCamidxTmp] = useState("");
    const [iscamrun, setIsCamRun] = useState(false);
    const [isfacemesh, setFaceMesh] = useState(false);

    useEffect(() => {
        camerasocket.emit("getconfig");

        camerasocket.on("getconfig", (info) => {
            console.log(info)
            setTickrate(info.tickrate * 1000);
            setCamidx(info.camindex);
            // setIsCamRun()
        })
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

    return (
        <div className="container">

            <h1>CameraEnv</h1>
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
        </div>
    );
};

export default CameraEnv;