import React, {useState} from 'react';

export default function useVisualMode(initial) {
  let [mode, setMode] = useState(initial);
  let [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (!replace) {
      setHistory([...history, newMode]);
    } else {
      history = [...history.slice(0, history.length - 1), newMode];
      setHistory(history);
    }
    setMode(newMode);
  };

  const back = () => {
    if (history.length > 1) {
      history = [...history.slice(0, history.length - 1)];
      setHistory(history);
      setMode(history[history.length - 1]);
    }
  };

  return { mode, transition, back };
}