import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MainContent.css';
import { actionDeleteChannelMessage, actionEditMessage, thunkGetAllChannelIdMessages } from '../../../store/messages';
import { io } from 'socket.io-client';
import { actionCreateChannelMessage } from '../../../store/messages';
import DeleteMessageModal from '../HomePageModals/DeleteMessage/DeleteMessageModal';
import OpenModalButton from '../../OpenModalButton';
import EditMessageModal from '../HomePageModals/EditMessage/EditMessageModal';
import { useParams } from 'react-router-dom';
import { faDoorClosed, faDoorOpen, faPaperPlane, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { actionEditChannel } from '../../../store/channels';

let socket;

function MainContent() {
  const { channelId } = useParams();
  const channels = useSelector(state => Object.values(state.channels.allChannels));
  const selectedChannel = channels.find((channel) => channel.id === parseInt(channelId));
  const messages = useSelector(state => state.messages.channelMessages)
  const user = useSelector(state => state.session.user);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false)
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (selectedChannel) {
      dispatch(thunkGetAllChannelIdMessages(selectedChannel.id))
    }
  }, [dispatch, channelId, selectedChannel, selectedChannel?.users.length])

  useEffect(() => {

    // create websocket/connect
    socket = io();
    socket.on("channel_message", (message) => {
      dispatch(actionCreateChannelMessage(message))
    })

    socket.on("message_edited", (message) => {
      dispatch(actionEditMessage(message))
    })

    socket.on("message_deleted", (message_id) => {
      dispatch(actionDeleteChannelMessage(selectedChannel.id, message_id))
    })

    socket.on("added_user_to_channel", (channel) => {
      dispatch(actionEditChannel(channel))
    })
    // when component unmounts, disconnect
    return (() => {
        socket.disconnect()
    })
  }, [])

  if (!selectedChannel) return (<div className='home-content-container'></div>);

  const userIsInChannel = selectedChannel.users.includes(user.id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.length === 0) return;

    const newMessage = {
      user_id: user.id,
      channel_id: selectedChannel.id,
      body: message
    }

    socket.emit('channel_message', newMessage)
    setMessage('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const joinChannel = (e) => {
    e.preventDefault();

    const joinData = {
      userId: user.id,
      channelId: selectedChannel.id
    }

    socket.emit('join_channel', joinData)
  }





  return (
    <div className='home-content-container'>
      <div className='home-content-header-container'><span className='main-hashtag'>#</span>{selectedChannel.name}</div>
      {userIsInChannel ? (
        <>
          <div className='home-content-messages-container'>
            <div className='messages-wrapper'>
              {messages[selectedChannel.id] ? Object.values(messages[selectedChannel.id]).map(message => (
                <div key={message.id} className='message-container-container'>
                  <div className='message-container'>
                    <div className='message-username'>{message.username}</div>
                    <div className='message-body'>{message.body}</div>
                  </div>
                  {user.id === message.user_id && (
                    <div className='message-edit-delete-buttons'>
                      <OpenModalButton className={'message-edit-button'} icon={faPen} modalComponent={<EditMessageModal messageId={message.id} messageBody={message.body} socket={socket}/>}/>
                      <OpenModalButton className={'message-delete-button'} icon={faTrash} modalComponent={<DeleteMessageModal channelId={selectedChannel.id} messageId={message.id} socket={socket}/>}/>
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
          <form className='message-form-container' onSubmit={e => handleSubmit(e)}>
            <textarea
              className='message-form-input'
              placeholder={`Message #${selectedChannel.name}`}
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => handleKeyDown(e)}
              maxLength={400}
            />
            <button
              type='submit'
              className={`message-form-submit-button ${message.length !== 0 ? 'green' : ''}`}
              disabled={message.length === 0}>
                <FontAwesomeIcon icon={faPaperPlane}/>
            </button>
          </form>
        </>
      ) : (
        <>
        {/* Render alternative component */}
        <div className="restricted-channel-access">
          <h2>You are not a member of this channel.</h2>
          <p>Join the channel to view and send messages.</p>
          <div
            className='join-channel-button'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={e => joinChannel(e)}
          >
            <FontAwesomeIcon icon={isHovered ? faDoorOpen : faDoorClosed} />
            Join Channel
          </div>
        </div>
        </>
      )}
    </div>
  );
}

export default MainContent;
