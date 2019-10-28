import React from "react";

const Alert = ({ message, color }) => {
  return (
    <span style={{ padding: "10px", backgroundColor: color, widht: "100" }}>
      {message}
    </span>
  );
};

export default Alert;
