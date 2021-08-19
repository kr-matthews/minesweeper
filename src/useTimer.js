import { useState, useRef } from "react";

function useTimer() {
  // time in milliseconds
  const [time, setTime] = useState(0);
  const [state, setState] = useState("reset");
  const intRef = useRef(null);

  function handleStart() {
    setState("running");
    // update every 0.01 seconds, ie track 13.48 seconds
    intRef.current = setInterval(() => setTime((prev) => prev + 10), 10);
  }

  function handleStop() {
    setState("stopped");
    clearInterval(intRef.current);
  }

  function handleReset() {
    setState("reset");
    clearInterval(intRef.current);
    setTime(0);
  }

  return { time, state, handleStart, handleStop, handleReset };
}

export default useTimer;
