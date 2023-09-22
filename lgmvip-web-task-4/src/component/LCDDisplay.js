import React from 'react';
import './LCDDisplay.css';

const LCDDisplay = (props) => {
  return (
    <div className="lcd-display">
      <div className="lcd-border">
        <div className="lcd-screen">
          <div className="lcd-content">{props.value}</div>
        </div>
      </div>
    </div>
  );
};

export default LCDDisplay;
