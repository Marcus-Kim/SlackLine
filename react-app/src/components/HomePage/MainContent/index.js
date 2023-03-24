import './MainContent.css';

function MainContent({ selectedChannel }) {

  console.log(selectedChannel)
  if (!selectedChannel) return null;

  return (
    <div className='home-content-container'>
      <div className='home-content-header-container'><span className='main-hashtag'>#</span>{selectedChannel.name}</div>
    </div>
  );
}

export default MainContent;
