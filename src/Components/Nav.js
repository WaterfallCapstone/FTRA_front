import React, { useState, useEffect }  from "react";

const Nav = ({socket}) => {
    const [Started, setStarted] = useState(false);
    const [StartBtnText, setStartBtnText] = useState("Start");

    const handleStart = async(e) => {
        e.preventDefault();
        if(!Started){
          socket.emit("start");
        }
      }
  
    return (
      <div>
        
        <div className="form-group">
          <button className="btn btn-primary btn-block" onClick={handleStart}>
            {StartBtnText}
          </button>
        </div>
  
      </div>
    );
  };
  
  export default Nav;