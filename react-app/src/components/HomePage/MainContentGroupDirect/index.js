import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { io } from "socket.io-client";
import { useRef } from "react";
import OpenModalButton from "../../OpenModalButton";
import { faDoorClosed, faDoorOpen, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { actionCreateGroupDirectMessageMessage } from "../../../store/messages";
let socket;

function MainContentGroupDirect() {
  const { gdmId } = useParams();
  const gdms = useSelector(state => Object.values(state.directMessages.gdms));
  const selectedGdm = gdms.find((gdm) => gdm.id === parseInt(gdmId));
  const messages = useSelector(state => state.messages.groupDirectMessages);
  const user = useSelector(state => state.session.user);
  const messagesEndRef = useRef(null);

  const dispatch = useDispatch();

  // useStates
  const [message, setMessage] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom()
  }, [messages, gdms.length])

  useEffect(() => {
    socket = io();

    socket.on('group_direct_message_message_created', (message) => {
      dispatch(actionCreateGroupDirectMessageMessage(message));
    })

    return (() => {
      socket.disconnect()
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.length === 0) return;

    const newMessage = {
      user_id: user.id,
      group_direct_message_id: gdmId,
      body: message
    };

    socket.emit('create_group_direct_message_message', newMessage);
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
      <div className="home-content-header-container">{selectedGdm.name}</div>
      <div className="home-content-messages-container">
        <div className="messages-wrapper">
          {messages[gdmId] ? Object.values(messages[gdmId]).map(message => (
            <div className="message-container-container">
            <div className="message-container">
              <div className="message-username">{message.username}</div>
              <div className="message-body">{message.body}</div>
            </div>
            {user.id === message.user_id && (
                  <div className='message-edit-delete-buttons'>
                    <OpenModalButton className={'message-edit-button'} icon={faPen} />
                    <OpenModalButton className={'message-delete-button'} icon={faTrash} />
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
          placeholder={`Message ${selectedGdm.name}`}
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

export default MainContentGroupDirect
