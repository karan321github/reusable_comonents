import React from "react";
import { showToast } from "./Toast";

function SomeComponent() {
  const handleClick = () => {
    showToast("Hi MR karan how are you", "info");
  };
  return (
    <div>
      <button onClick={handleClick}>Show Toast</button>
    </div>
  );
}

export default SomeComponent;
