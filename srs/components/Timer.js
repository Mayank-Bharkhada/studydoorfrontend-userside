import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

const Timer = ({ totalTime, onTimeUp }) => {
  const [secondsLeft, setSecondsLeft] = useState(totalTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (secondsLeft === 0) {
      onTimeUp();
    }
  }, [secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <Text>
      {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
    </Text>
  );
};

export default Timer;
