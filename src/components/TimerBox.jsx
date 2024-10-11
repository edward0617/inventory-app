import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TimerContainer = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const TimerLabel = styled.div`
  border: 1px solid #aaa;
  justify-content: center;
  align-items: center;
  padding: 40px;
  font-size: 24px;
  font-weight: bold;
  background-color: white;
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
      <TimerLabel>
        {Math.floor(time / 60)}:{time % 60 < 10 ? `0${time % 60}` : time % 60}
      </TimerLabel>
    </TimerContainer>
  );
};

export default TimerBox;
