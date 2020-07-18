import React, { useState } from 'react'
import './editMessage.css';

const EditMessage = ({ editedMsg, onModalClose, sendEditedMsg }) => {
  const [input, setInput] = useState(editedMsg.msg.text);
  const onChange = e => setInput(e.target.value);
  return (
    <div className="abs-wrapper">
      <div className="modal">
        <form onSubmit={e => sendEditedMsg(input, e)} className='edit-form'>
          <textarea cols="30" rows="4" value={input} onChange={e => onChange(e)}>
          </textarea>
          <input type="submit" className="pointer" value="Edit" />
          <i className="abs-close fas fa-times" onClick={onModalClose}></i>
        </form>
      </div>
    </div>
  )
}

export default EditMessage;
