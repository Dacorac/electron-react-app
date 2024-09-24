import { useState, useEffect } from 'react';

const useCountdown = (initialTime, onComplete) => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
      if (onComplete) onComplete();
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const start = () => {
    setIsActive(true);
  };

  const reset = () => {
    setIsActive(false);
    setTime(initialTime);
  };

  return { time, start, reset, isActive };
}

export default useCountdown;
