import React, { useState, useEffect } from "react";

const MiddleData = ({socket, at_loc_polar , at_loc_cart , at_dir_polar}) => {

  const renderMotorValue = (data) => {
    const result = [];
    for (let i = 0; i < data.length; i++) {
      result.push(<span key={i}>{Number(data[i]).toFixed(3) + " , "}</span>);
    }
    return result;
  };
  return (
    <div>
      <div>
        <span>armtip location (polar) </span>
        <span>{renderMotorValue(at_loc_polar)}</span>
      </div>
      <div>
        <span>armtip location (cart) </span>
        <span>{renderMotorValue(at_loc_cart)}</span>
      </div>
      <div>
        <span>armtip direction (polar) </span>
        <span>{renderMotorValue(at_dir_polar)}</span>
      </div>
    </div>
  );
};

export default MiddleData;