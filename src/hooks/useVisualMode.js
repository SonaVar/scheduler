import {useState} from 'react';

export default function useVisualMode(initial) {
  let [mode, setMode] = useState(initial);
  let [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (!replace) {
      setHistory([...history, newMode]);
    } else {
      const newHistory = [...history.slice(0, history.length - 1), newMode];
      setHistory(newHistory);
    }
    setMode(newMode);
  };

  const back = () => {
    if (history.length > 1) {
      const newHistory = [...history.slice(0, history.length - 1)];
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
  };

  return { mode, transition, back };
}