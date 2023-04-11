import React, { useState, useEffect } from "react";

const Video = ({socket, image,isface, dir,loc}) => {
    // const [loop, setLoop] = useState({});

    // useEffect(() => {
    //     setLoop({})
    //     socket.emit("video");
    //   }, [loop]);
  
  return (
    <div>
      <div>
        <img src = {image} alt="no img"/>
      </div>
      <div>
        <div>
          <span>face location from camera (polar)</span>
          {isface ?
          <span>({Number(loc[0]).toFixed(3)}, {Number(loc[1]).toFixed(3)}, {Number(loc[2]).toFixed(3)})</span>
          : <span>No Face</span>
          }
        </div>
        <div>
          <span>face dir vector from camera (cart)</span>
          {isface ?
          <span>({Number(dir[0]).toFixed(3)}, {Number(dir[1]).toFixed(3)}, {Number(dir[2]).toFixed(3)})</span>
          : <span>No Face</span>
          }
          
        </div>
      </div>

    </div>
  );
};

export default Video;