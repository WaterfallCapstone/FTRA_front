
import React, { useState, useEffect } from "react";

const Home = ({socket, started, mode}) => {
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
    <div className="container">

      <h1>home</h1>
      <div >
        <button onClick={handleStart}>
          {StartBtnText}
        </button>
      </div>
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
    </div>
  );
};

export default Home;