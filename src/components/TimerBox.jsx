import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TimerContainer = styled.div`
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const TimerBox = ({ start, reset }) => {
  const [time, setTime] = useState(300);
  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [start]);

  useEffect(() => {
    if (reset) {
      setTime(300);
    }
  }, [reset]);

  return (
    <TimerContainer>
      {Math.floor(time / 60)}:{time % 60 < 10 ? `0${time % 60}` : time % 60}
    </TimerContainer>
  );
};

export default TimerBox;
