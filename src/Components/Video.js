import React, { useState, useEffect } from "react";

// const Video = ({socket, image,isface, dir,loc}) => {
const Video = ({ socket }) => {
  const [image, setImage] = useState("")
  // const [loop, setLoop] = useState({});

  // useEffect(() => {
  //     setLoop({})
  //     socket.emit("video");
  //   }, [loop]);
  useEffect(() => {
    socket.on("video", (info) => {
      setImage(info.image)
    });
  }, [])

  const takePicture = (key) => {
    socket.emit("takepicture", { "key" : key });
  }

  return (
    <div>
      <div>
        <img src={image} alt="no img" height="360" width="480" />
      </div>
      <button onClick={() => takePicture("Normal")}>Take Picture</button>
      <button onClick={() => takePicture("RMBG")}>Take Picture remove bg</button>
      <button onClick={() => takePicture("Chroma")}>Take Picture set Chroma Key</button>
      {/* <div>
        <div>
          <span>face location from camera (polar) </span>
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
          
        </div> */}
    </div>

  );
};

export default Video;