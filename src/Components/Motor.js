import React, { useState, useEffect } from "react";

const Motor = ({socket,  motorvalue}) => {
    // const [loop, setLoop] = useState({});

    // useEffect(() => {
    //     setLoop({})
    //     socket.emit("video");
    //   }, [loop]);
  
  return (
    <div>
      <div>
        <div>
          <span>Motor Value (polar)</span>
          <span>({Number(motorvalue[0]).toFixed(3)}, {Number(motorvalue[1]).toFixed(3)}, {Number(motorvalue[2]).toFixed(3)}, {Number(motorvalue[3]).toFixed(3)}, {Number(motorvalue[4]).toFixed(3)})</span>
        </div>
      </div>
    </div>
  );
};

export default Motor;