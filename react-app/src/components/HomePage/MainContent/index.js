import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MainContent.css';
import { thunkGetAllChannelIdMessages } from '../../../store/messages';
import { io } from 'socket.io-client';
import { actionCreateChannelMessage } from '../../../store/messages';

function MainContent({ selectedChannel }) {
  const messages = useSelector(state => Object.values(state.messages.channelMessages[selectedChannel.id]))
  const user = useSelector(state => state.session.user);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const socket = io.connect('http://localhost:5000')

  useEffect(() => {
    dispatch(thunkGetAllChannelIdMessages(selectedChannel.id))
  }, [dispatch, selectedChannel.id])

  useEffect(() => {
    socket.on('response', (message) => {
      dispatch(actionCreateChannelMessage(message))
    })
  }, [socket])

  if (!selectedChannel) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMessage = {
      user_id: user.id,
      channel_id: selectedChannel.id,
      body: message
    }

    socket.emit('message', newMessage)

    // const response = await dispatch(thunkCreateChannelMessage(selectedChannel.id, newMessage))

    // if (response) setMessage('');

  }

  return (
    <div className='home-content-container'>
      <div className='home-content-header-container'><span className='main-hashtag'>#</span>{selectedChannel.name}</div>
      <div className='home-content-messages-container'>
        {messages.map(message => (
          <div className='message-container'>
            <div className='message-username'>{message.username}</div>
            <div className='message-body'>{message.body}</div>
          </div>
        ))}
      </div>
      <form className='message-form-container' onSubmit={e => handleSubmit(e)}>
        <textarea
          className='message-form-input'
          placeholder={`Message #${selectedChannel.name}`}
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button
          type='submit'
          className='message-form-submit-button'
          disabled={message.length == 0}>
            Send
        </button>
      </form>
    </div>
  );
}

export default MainContent;
