
import React, { useState, useEffect } from "react";
import Video from "./Video";

const Home = ({ socket, mode }) => {
  const [StartBtnText, setStartBtnText] = useState("Start");
  const [ErrMsg, setErrMsg] = useState("");
  const [started, setstarted] = useState(false);

  const handleStart = async (e) => {
    e.preventDefault();
    if (!started) {
      socket.emit("start");
    } else {
      socket.emit("stop");
      setstarted(false)
    }
  }
  const onchange = () => {
    socket.emit("changemod")
  }

  useEffect(() => {
    socket.on("startinfo", (info) => {
      console.log(info)
      setErrMsg(info.errmsg)
      if (info.camera) {
        socket.emit("startcam")
        socket.emit("startmesh")
        socket.emit("getimg", { "from": "video" });
      }
      if (info.motor) {
        socket.emit("motortrack")
      }
      setstarted(true)
    });

  }, []);

  useEffect(() => {
    console.log(started);
    if (started) {
      setStartBtnText("Stop");
    }
    else {
      setStartBtnText("Start");
    }
  }, [started]);
  return (
    <div className="container">

      <h1>home</h1>
      <div >
        <button onClick={handleStart}>
          {StartBtnText}
        </button>
        <span> {ErrMsg} </span>
      </div>
      <div>
        {(started) &&
          <div>
            <span>mode : {mode}</span>
            <button className="btn btn-primary btn-block" onClick={onchange}>
              change
            </button>
            <div>
              <Video socket={socket}/>
            </div>
          </div>

        }
      </div>
    </div>
  );
};

export default Home;