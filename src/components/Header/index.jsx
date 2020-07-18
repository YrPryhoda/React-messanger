import React from 'react'
import PropTypes from 'prop-types'
import './header.css'
const Header = ({ state }) => {
  const getUsersCount = (data) => {
    let uniqueUsers = [];
    for (let item of data) {
      if (!uniqueUsers.includes(item.user)) {
        uniqueUsers.push(item.user)
      }
    }
    return uniqueUsers.length;
  }
  return (
    <div className='header'>
      <div className="logo">
        <img src="https://c7.hotpng.com/preview/357/873/175/facebook-messenger-computer-icons-online-chat-symbol-like-us-on-facebook.jpg" alt="logo" />
        <span>Webgram</span>
      </div>
      <div className="chat-info">
        <span>
          <i className="fas fa-users"></i>
          {` ${getUsersCount(state)} users`}</span>
        <span>
          <i className="fas fa-envelope-open-text"></i>
          {` ${state.length} messages`}</span>
      </div>
    </div>
  )
}

Header.propTypes = {
  state: PropTypes.array.isRequired,
}

export default Header;
