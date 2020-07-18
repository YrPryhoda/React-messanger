import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';
import './messageList.css';

function MessageList({ state, editOwnPost, deleteOwnMessage, setLike }) {
  const messanger = useRef(null);
  useEffect(() => {
    messanger.current.scrollTo(0, messanger.current.scrollHeight);
  }, [messanger.current && messanger.current.scrollHeight])
  const getMessageList = data => {
    let i = 0;
    return data.map(el => {
      return (<div
        className={`${el.user === 'Admin' ? "message-block right" : "message-block"}`}
        key={i++}
      >
        {
          el.user !== 'Admin' && (<img
            src={el.avatar}
            className="message-avatar"
            alt='users avatar' />)
        }
        <div className="message-body">
          <h3 className="user-name">
            {el.user}
          </h3>
          <div className="message-text">
            {el.text}
          </div>
          <div className="message-meta">
            <div className="message-react">
              {
                el.user !== 'Admin' && (
                  <>
                    <span>{el.likes}</span>
                    <span
                      className="pointer fa fa-thumbs-o-up"
                      aria-hidden="true"
                      onClick={() => setLike(el.user, el.text)}
                    >
                    </span>
                  </>
                )
              }
              {
                el.user === 'Admin' && (
                  <>
                    <span
                      class="pointer fas fa-edit"
                      onClick={() => editOwnPost(el.id)}
                    >
                    </span>
                    <span
                      class="pointer far fa-trash-alt"
                      onClick={() => deleteOwnMessage(el.id)}
                    >
                    </span>
                  </>
                )
              }
            </div>
            <div className="message-date">
              {moment(el.createdAt).format("DD MM YYYY hh:mm:ss")}
            </div>
          </div>
        </div>
      </div>
      )
    })
  }
  return (
    <div className='messages' ref={messanger}>
      {getMessageList(state)}
    </div>
  )
}

MessageList.propTypes = {
  state: PropTypes.array.isRequired,
  editOwnPost: PropTypes.func.isRequired,
  setLike: PropTypes.func.isRequired,
  deleteOwnMessage: PropTypes.func.isRequired
}

export default MessageList;
