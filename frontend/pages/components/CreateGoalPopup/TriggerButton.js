import React from 'react';

const Trigger = ({ triggerText, buttonRef, showModal }) => {
  return (
    <button
      className="button"
      ref={buttonRef}
      onClick={showModal}
    >
      {triggerText}
    </button>
  );
};
export default Trigger;
