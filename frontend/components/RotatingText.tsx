"use client";

import { useState, useEffect } from "react";

interface Props {
  values: string[];
  interval?: number; // optional, defaults to 2000ms
}

export default function RotatingText({ values, interval = 2000 }: Props) {
  
  // useState(0) means start with index 0 (first word in the array)
  // index = current value, setIndex = function to update it
  // every time setIndex is called, React re-renders and shows the new word
  const [index, setIndex] = useState(0);

  // useEffect runs once when this component appears in the browser
  useEffect(() => {

    // setInterval is a built-in browser function
    // it runs the function inside it repeatedly, every "interval" milliseconds
    // we store the timer in "timer" so we can stop it later
    const timer = setInterval(() => {

      // setIndex updates the index
      // prev is the current index value React passes in safely
      // (prev + 1) % values.length moves to next word, wraps back to 0 at the end
      // e.g. with 4 words: 0 → 1 → 2 → 3 → 0 → 1 ...
      setIndex((prev) => (prev + 1) % values.length);

    }, interval); // fires every "interval" ms (2000ms = 2 seconds by default)

    // this return is special in useEffect
    // React calls this automatically when the component is removed from the page
    // clearInterval(timer) stops the timer so it does not keep running in the background
    // without this you get a memory leak
    return () => clearInterval(timer);

  }, [values, interval]);
  // the array at the end is the dependency array
  // it tells React: only re-run this useEffect if "values" or "interval" change
  // if it was [] it would run once only on load and never again

  // render the current word based on the current index
  return (
    <span className="text-blue-400">{values[index]}</span>
  );
}