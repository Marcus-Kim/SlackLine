import { useSelector } from 'react-redux';
import './MainContent.css';

function MainContent({ selectedChannel }) {
  const messages = useSelector(state => Object.values(state.messages.channelMessages[selectedChannel.id]))
  console.log(messages)
  if (!selectedChannel) return null;
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
      <form className='message-form-container'>
        <textarea
          className='message-form-input'
        />
      </form>
    </div>
  );
}

export default MainContent;
