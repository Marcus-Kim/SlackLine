import SideBar from './Sidebar';
import MainContent from './MainContent';
import './HomePage.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllChannels } from '../../store/channels';

function HomePage() {
  const channels = useSelector((state) => Object.values(state.channels.allChannels));
  const [selectedChannel, setSelectedChannel] = useState(channels[0]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChannels = async () => {
      await dispatch(thunkGetAllChannels());
      setLoading(false);
    };

    fetchChannels();
  }, [dispatch]);

  if (!channels.length) return null;

  return (
    <div className="home-container">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <SideBar channels={channels} onChannelSelect={setSelectedChannel} />
          <MainContent selectedChannel={selectedChannel} />
        </>
      )}
    </div>
  );
}

export default HomePage;
