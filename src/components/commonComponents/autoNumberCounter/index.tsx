// components/AutoNumberCounter.tsx
import { useState, useEffect } from "react";

interface AutoNumberCounterProps {
  max: number;
  speed: number;
  stopValues: number[]; // An array of stop values
}

const AutoNumberCounter: React.FC<AutoNumberCounterProps> = ({
  max,
  speed,
  stopValues,
}) => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount >= max || stopValues.includes(prevCount)) {
          return prevCount; // Stop at specified values or the specified max value
        } else {
          return prevCount + 1;
        }
      });
    }, speed);

    return () => {
      clearInterval(intervalId);
    };
  }, [max, speed, stopValues]);

  return <div>{count}</div>;
};

export default AutoNumberCounter;