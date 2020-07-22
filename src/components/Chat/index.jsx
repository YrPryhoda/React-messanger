import React, { useEffect, useState } from "react";
import MessageList from "../MessageList";
import MessageInput from "../MessageInput";
import Header from "../Header";
import Spinner from '../Spinner';
import Footer from '../Footer';
import EditMessage from '../EditMessage';
import moment from 'moment';
import { getState } from "../../service/data";
import { v4 } from 'uuid';
import "./chat.css";

function App() {
  const [state, setState] = useState(null);
  const [editedMsg, setEditedMsg] = useState(null);
  useEffect(() => {
    getState().then(data => {
      const newArr = data.sort((a,b) => moment(a.createdAt, "hh:mm:ss") - moment(b.createdAt, "hh:mm:ss"));
      setState(newArr);
    })
  }, []);
  const sendMessage = (text) => {
    const obj = {
      id: v4(),
      text,
      user: 'Admin',
      avatar: '',
      userId: v4(),
      editedAt: null,
      createdAt: (new Date()).toJSON()
    }
    setState([
      ...state,
      obj
    ])
  }
  const editOwnPost = (id) => {
    const index = state.findIndex(el => el.id === id);
    const edited = state[index];
    setEditedMsg({
      index,
      msg: edited
    })
  }
  const onModalClose = () => {
    setEditedMsg(null);
  }
  const sendEditedMsg = (input, e) => {
    e.preventDefault();
    const newMsg = {
      ...editedMsg.msg,
      editedAt: (new Date()).toJSON(),
      text: input
    }
    const newState = [
      ...state.slice(0, editedMsg.index),
      newMsg,
      ...state.slice(+editedMsg.index + 1)
    ]
    setState(newState);
    setEditedMsg(null);
  }
  const deleteOwnMessage = (id) => {
    const newState = state.filter(el => el.id !== id)
    setState(newState);
  }
  const setLike = (user, text) => {
    const index = state.findIndex(el => el.user === user && el.text === text);
    const post = state[index];
    if (!post.likes) {
      post.likes = 1;
      const newState = [
        ...state.slice(0, index),
        post,
        ...state.slice(index + 1)
      ]
      console.log(index);
      setState(newState);
    } else {
      return null;
    }
  }
  return !state ? (
    <Spinner />
  ) : (
      <div className="App">
        <Header state={state} />
        <MessageList
          state={state}
          editOwnPost={editOwnPost}
          deleteOwnMessage={deleteOwnMessage}
          setLike={setLike}
        />
        <MessageInput sendMessage={sendMessage} />
        {
          editedMsg && <EditMessage
            editedMsg={editedMsg}
            onModalClose={onModalClose}
            sendEditedMsg={sendEditedMsg} />
        }
        <Footer />
      </div>
    );
}

export default App;
