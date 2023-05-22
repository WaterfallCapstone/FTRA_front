import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Nav = ({ socket, camerasocket, started, mode }) => {
  const navigate = useNavigate();
  const [StartBtnText, setStartBtnText] = useState("Start");

  const handleStart = async (e) => {
    e.preventDefault();
    if (!started) {
      socket.emit("start");
    }else{
      socket.emit("stop");
    }
  }
  const onchange = () => {
    socket.emit("changemod")
  }

  const cameraEnv = () => {
    navigate("/cameraenv");
    window.location.reload();
  }

  useEffect(() => {
    console.log(started);
    if(started){
      setStartBtnText("Stop");
    }
    else{
      setStartBtnText("Start");
    }
  }, [started]);

  return (
    <div>

      <div>
        {(started) &&
          <div>
            <span>mode : {mode}</span>
            <button className="btn btn-primary btn-block" onClick={onchange}>
              change
            </button>
          </div>
        }
      </div>
      <div>
        {(!started) &&
          <div>
            <button onClick={cameraEnv}>
              CamEnv
            </button>
          </div>
        }
      </div>

    </div>
  );
};

export default Nav;