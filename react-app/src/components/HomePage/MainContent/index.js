import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MainContent.css';
import { actionDeleteChannelMessage, actionEditMessage, thunkGetAllChannelIdMessages } from '../../../store/messages';
import { io } from 'socket.io-client';
import { actionCreateChannelMessage } from '../../../store/messages';
import DeleteMessageModal from '../HomePageModals/DeleteMessage/DeleteMessageModal';
import OpenModalButton from '../../OpenModalButton';
import EditMessageModal from '../HomePageModals/EditMessage/EditMessageModal';
import { useParams } from 'react-router-dom';

let socket;

function MainContent() {
  const { channelId } = useParams();
  const channels = useSelector(state => Object.values(state.channels.allChannels));
  const selectedChannel = channels.find((channel) => channel.id === parseInt(channelId));
  const messages = useSelector(state => state.messages.channelMessages)
  const user = useSelector(state => state.session.user);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedChannel) {
      dispatch(thunkGetAllChannelIdMessages(selectedChannel.id))
    }
  }, [dispatch, channelId, selectedChannel])

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
    // when component unmounts, disconnect
    return (() => {
        socket.disconnect()
    })
  }, [])

  if (!selectedChannel) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

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

  return (
    <div className='home-content-container'>
      <div className='home-content-header-container'><span className='main-hashtag'>#</span>{selectedChannel.name}</div>
      <div className='home-content-messages-container'>
        {messages[selectedChannel.id] ? Object.values(messages[selectedChannel.id]).map(message => (
          <div key={message.id} className='message-container-container'>
            <div className='message-container'>
              <div className='message-username'>{message.username}</div>
              <div className='message-body'>{message.body}</div>
            </div>
            {user.id === message.user_id && (
              <div className='message-edit-delete-buttons'>
                <OpenModalButton buttonText={'Delete'} modalComponent={<DeleteMessageModal channelId={selectedChannel.id} messageId={message.id} socket={socket}/>}/>
                <OpenModalButton buttonText={'Edit'} modalComponent={<EditMessageModal messageId={message.id} messageBody={message.body} socket={socket}/>}/>
              </div>
            )}
          </div>
        )) : (
          <div className='message-container'>
            <div className='message-body'>No messages yet</div>
          </div>
        )}
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
          className='message-form-submit-button'
          disabled={message.length === 0}>
            Send
        </button>
      </form>
    </div>
  );
}

export default MainContent;
