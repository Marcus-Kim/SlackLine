import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { io } from "socket.io-client";
import { actionCreateDirectMessage, actionDeleteDirectMessageMessage, actionEditDirectMessage, thunkGetAllDirectMessages } from "../../../store/messages";
import { useRef } from "react";
import OpenModalButton from "../../OpenModalButton";
import { faDoorClosed, faDoorOpen, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditDirectMessageMessageModal from "../HomePageModals/EditDirectMessageMessage/EditDirectMessage";
import DeleteDirectMessageMessage from "../HomePageModals/DeleteDirectMessageMessage/DeleteDirectMessageMessage";
let socket;

function MainContentDirect({ type }) {
  const { dmId } = useParams(); //*
  const dms = useSelector(state => Object.values(state.directMessages.dms)); //*
  const selectedDm = dms.find((dm) => dm.id === parseInt(dmId)); //*
  const messages = useSelector(state => state.messages.directMessages) //*
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const messagesEndRef = useRef(null);

  // useStates
  const [message, setMessage] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom()
  }, [messages, dms.length])

  useEffect(() => {
    socket = io();

    socket.on('created_direct_message', (message) => {
      dispatch(actionCreateDirectMessage(message));
    })

    socket.on('direct_message_edited', (message) => {
      dispatch(actionEditDirectMessage(message));
    })

    socket.on('direct_message_message_deleted', (message) => {
      dispatch(actionDeleteDirectMessageMessage(message));
    })

    return (() => {
      socket.disconnect()
    })
  }, [])

  if (!selectedDm) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.length === 0) return;

    const newMessage = {
      user_id: user.id,
      direct_message_id: dmId,
      body: message
    }

    socket.emit('direct_message', newMessage);
    setMessage('');
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="home-content-container">
      <div className="home-content-header-container">{user.id === selectedDm.user2.id ? selectedDm.user1.username : selectedDm.user2.username}</div>
      <div className="home-content-messages-container">
        <div className="messages-wrapper">
          {messages[dmId] ? Object.values(messages[dmId]).map(message => (
            <div className="message-container-container">
              <div className="message-container">
                <div className="message-username">{message.username}</div>
                <div className="message-body">{message.body}</div>
              </div>
              {user.id === message.user_id && (
                    <div className='message-edit-delete-buttons'>
                      <OpenModalButton className={'message-edit-button'} icon={faPen} modalComponent={<EditDirectMessageMessageModal messageId={message.id} messageBody={message.body} socket={socket}/>}/>
                      <OpenModalButton className={'message-delete-button'} icon={faTrash} modalComponent={<DeleteDirectMessageMessage message={message} socket={socket}/>} />
                    </div>
                  )}
            </div>
          )) : (
            <div className='message-container'>
              <div className='message-body'>No messages yet</div>
            </div>
          )}
          <div ref={messagesEndRef}></div>
        </div>
      </div>
      <form className="message-form-container" onSubmit={e => handleSubmit(e)}> {/* Add submit function */}
        <textarea
          className="message-form-input"
          placeholder={`Message ${selectedDm.user2.username}`}
          value={message}
          onChange={e => setMessage(e.target.value)}
          maxLength={400}
          onKeyDown={e => handleKeyDown(e)}
        />
        <button
          type='submit'
          className={`message-form-submit-button ${message.length !== 0 ? 'green' : ''}`}
          disabled={message.length === 0}>
            <FontAwesomeIcon icon={faPaperPlane}/>
        </button>
      </form>
    </div>
  )
}

export default MainContentDirect
