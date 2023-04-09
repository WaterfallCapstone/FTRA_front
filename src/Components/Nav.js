import React, { useState, useEffect } from "react";

const Nav = ({ socket, started, axis }) => {

  const [StartBtnText, setStartBtnText] = useState("Start");

  const handleStart = async (e) => {
    e.preventDefault();
    if (!started) {
      socket.emit("start");
    }
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

      <div className="form-group">
        <span>Axis : {axis}</span>
        <button className="btn btn-primary btn-block" onClick={handleStart}>
          {StartBtnText}
        </button>
      </div>

    </div>
  );
};

export default Nav;