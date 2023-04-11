import React, { useState, useEffect } from "react";

const Motor = ({socket,  motorvalue, axis}) => {
  const arr2 = motorvalue.join(', ');

  const [inputmotor, setInputmotor] = useState("");
  const onChangeMotorValue = (e) => {
    const inputMotorValue = e.target.value;
    setInputmotor(inputMotorValue);
  };

  const Push = () => {
    socket.emit("setmotorclient", {"data": inputmotor});
    // console.log(motorBtnText);
  }

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
          <span>{arr2}</span>
          <input onChange = {onChangeMotorValue}/>
          <button onClick={Push}>입력</button>
      </div>
      </div>
    </div>
  );
};

export default Motor;