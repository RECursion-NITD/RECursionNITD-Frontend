import React from "react";

const rDashedLine = () => {
  return (
    <svg width="200" height="100">
      <line
        x1="50"
        y1="25"
        x2="155"
        y2="25"
        stroke="white"
        strokeWidth={2}
        strokeDasharray={(5, 5)}
      />
      <circle cx="55" cy="25" r="5" fill="white" />
    </svg>
  );
};

export default rDashedLine;
