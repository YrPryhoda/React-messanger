import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./messageInput.css";
const MessageInput = ({ sendMessage }) => {
  const [input, setInput] = useState('');
  const onChange = e => setInput(e.target.value);
  const onSubmit = () => {
    sendMessage(input);
    setInput('');
  }
  return (
    <div className="input-block">
      <textarea
        className='input-area'
        rows="5"
        value={input}
        onChange={e => onChange(e)}
        placeholder='Input message'></textarea>
      <input
        type="submit"
        className="input-send pointer"
        value="Send"
        onClick={onSubmit} />
    </div>
  )
}

MessageInput.propTypes = {
  sendMessage: PropTypes.func.isRequired
};

export default MessageInput;
