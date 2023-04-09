import React, { useState, useEffect } from "react";

const Video = ({socket, image}) => {
    // const [loop, setLoop] = useState({});

    // useEffect(() => {
    //     setLoop({})
    //     socket.emit("video");
    //   }, [loop]);
  
  return (
    <div>

      <img src = {image} alt="no img"/>

    </div>
  );
};

export default Video;