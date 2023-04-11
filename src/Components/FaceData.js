import React, { useState, useEffect } from "react";

const FaceData = ({socket,isface, face_loc,face_lookat, arm_dest,motor_dest}) => {

  const renderMotorValue = (data) => {
    const result = [];
    for (let i = 0; i < data.length; i++) {
      result.push(<span key={i}>{Number(data[i]).toFixed(3) + " , "}</span>);
    }
    return result;
  };
  return (
    <div>
        {isface ?
        <div>
            <div>
                <span>face location (cart)        : </span>
                <span>{renderMotorValue(face_loc)}</span>
            </div>
            <div>
                <span>face lookat (cart)         : </span>
                <span>{renderMotorValue(face_lookat)}</span>
            </div>
            <div>
                <span>arm_destination (cart)         : </span>
                <span>{renderMotorValue(arm_dest)}</span>
            </div>
            <div>
                <span>motor destination         : </span>
                <span>{renderMotorValue(motor_dest)}</span>
            </div>
        </div>
        :
        <div>no face</div>
        }
    </div>
    
  );
};

export default FaceData;