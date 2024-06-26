import React, { useState } from "react";
import "./keyboard.css";

const keys = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
  ["Caps Lock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
  ["Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Shift"],
  ["Space"],
];

function Keyboard() {
  const [value, setValue] = useState("");
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [shiftOn, setShiftOn] = useState(false);
 
  function clickButton(e) {
    const clickedValue = e.target.textContent;

    if (clickedValue === "Backspace") {
      setValue((prevValue) => prevValue.slice(0, -1));
    }
    else if (clickedValue === "Space"){
      setValue((prevValue) => prevValue + " ");
    }
    else if (clickedValue === "Enter"){
      setValue((prevValue) => prevValue + "\n")
    }
    
    else if (clickedValue === "Caps Lock") {
      setCapsLockOn((prevCapsLockOn) => !prevCapsLockOn);
    } else if (clickedValue === "Shift") {
      setShiftOn(true);
    } else {
      setValue((prevValue) => {
        const shouldUpperCase = capsLockOn !== shiftOn;
        const newValue = shouldUpperCase ? clickedValue.toUpperCase() : clickedValue.toLowerCase();
        return prevValue + newValue;
      });
      setShiftOn(false);
    }
  }

  return (
    <div className="keyboard">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key, keyIndex) => (
            <div key={keyIndex} className="keyboard-key" onClick={clickButton}>
              {key}
            </div>
          ))}
        </div>
      ))}
      <div className="input-container">
        <textarea type="text" value={value} readOnly className="input-field" />
      </div>
    </div>
  );
}

export default Keyboard;

