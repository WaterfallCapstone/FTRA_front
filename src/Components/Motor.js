import React, { useState, useEffect } from "react";

const Motor = ({socket,  motorvalue, axis,mode}) => {
  const arr2 = motorvalue.join(', ');

  const [inputmotor, setInputmotor] = useState("");
  const onChangeMotorValue = (e) => {
    const inputMotorValue = e.target.value;
    setInputmotor(inputMotorValue);
  };
  const renderMotorValue = () => {
    const result = [];
    for (let i = 0; i < motorvalue.length; i++) {
      result.push(<span key={i}>{Number(motorvalue[i]).toFixed(3) + " , "}</span>);
    }
    return result;
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
      <span>Motor Value (degree) </span>
      <div>{renderMotorValue()}</div>
      <div>
        {mode == "control" &&
          <div>
            <input onChange={onChangeMotorValue} />
            <button onClick={Push}>입력</button>
          </div>
        }
      </div>
    </div>
  );
};

export default Motor;