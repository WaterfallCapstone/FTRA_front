import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Nav = ({started }) => {
  const navigate = useNavigate();
  

  const envconfig = () => {
    navigate("/env");
    window.location.reload();
  }
  const home = () => {
    navigate("/");
    window.location.reload();
  }

  // useEffect(() => {
  //   console.log(started);
  //   if(started){
  //     setStartBtnText("Stop");
  //   }
  //   else{
  //     setStartBtnText("Start");
  //   }
  // }, [started]);

  return (
    <div>
      <div>
        <button onClick={home}>
          Home
        </button>
      </div>

      <div>
        {(!started) &&
          <div>
            <button onClick={envconfig}>
              Env
            </button>
          </div>
        }
      </div>
      
    </div>
  );
};

export default Nav;