import React, { useState, useEffect } from "react";

const Motor = ({socket, image,dir,loc}) => {
    // const [loop, setLoop] = useState({});

    // useEffect(() => {
    //     setLoop({})
    //     socket.emit("video");
    //   }, [loop]);
  
  return (
    <div>
      <div>
        <div>
          <span>face location from camera (polar)</span>
          <span>({Number(loc[0]).toFixed(3)}, {Number(loc[1]).toFixed(3)}, {Number(loc[2]).toFixed(3)})</span>
        </div>
        <div>
          <span>face dir vector from camera (cart)</span>
          <span>({Number(dir[0]).toFixed(3)}, {Number(dir[1]).toFixed(3)}, {Number(dir[2]).toFixed(3)})</span>
        </div>
      </div>
    </div>
  );
};

export default Motor;