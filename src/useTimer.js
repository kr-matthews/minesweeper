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
    clearInterval(intRef.current);
    setState("stopped");
  }

  function handleReset() {
    clearInterval(intRef.current);
    setTime(0);
    setState("reset");
  }

  return { time, state, handleStart, handleStop, handleReset };
}

export default useTimer;
