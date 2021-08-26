import { useState } from "react";

function useTimer() {
  // everything in milliseconds
  const updatePeriod = 10;

  const [startTime, setStartTime] = useState(null);
  const [time, setTime] = useState(0);
  const [state, setState] = useState("reset");
  const [int, setInt] = useState(null);

  function handleStart() {
    let startAt = Date.now();
    setStartTime(startAt);
    setState("running");
    setInt(setInterval(() => setTime(Date.now() - startAt), updatePeriod));
  }

  function handleStop(time = null) {
    let endTime = time === null ? Date.now() - startTime : time;
    clearInterval(int);
    setStartTime(null);
    setState("stopped");
    setTime(endTime);
  }

  function handleReset() {
    clearInterval(int);
    setStartTime(null);
    setState("reset");
    setTime(0);
  }

  return { time, state, handleStart, handleStop, handleReset };
}

export default useTimer;
