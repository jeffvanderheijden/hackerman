import React from "react";
import "./DialogueBox.css"; 

const DialogueBox = ({ message }) => {
  return (
    <div className="dialogue-box">
      <p>{message}</p>
      <span className="dialogue-hint">[Press Enter]</span>
    </div>
  );
};

export default DialogueBox;
