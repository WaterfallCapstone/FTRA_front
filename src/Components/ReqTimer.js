import React, { useState, useEffect } from "react";

const ReqTimer = ({socket}) => {

    useEffect(()=>{
      let timer = setInterval(()=>{ 
        socket.emit("image") 
      }, 20);
    });    
  
  return (
    <div>
    </div>
  );
};

export default ReqTimer;