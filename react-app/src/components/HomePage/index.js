import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideBar from './Sidebar';
import MainContent from './MainContent';
import './HomePage.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllChannels, thunkGetMessagesForChannel } from '../../store/channels';
import { thunkGetAllMessages } from "../../store/messages";

function HomePage() {
  const channels = useSelector((state) => Object.values(state.channels.allChannels));
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChannels = async () => {
      await dispatch(thunkGetAllChannels());
      await dispatch(thunkGetAllMessages());
      setLoading(false);
    };

    fetchChannels();
  }, [dispatch, channels.length]);

  if (!channels.length) return null;

  return (
    <Router>
      <div className="home-container">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <SideBar channels={channels} />
            <Switch>
              <Route exact path="/home">
                <MainContent selectedChannel={channels[0]}/>
              </Route>
              {channels.map((channel) => (
                <Route key={channel.id} path={`/home/channel/${channel.id}`}>
                  <MainContent selectedChannel={channel} channels={channels}/>
                </Route>
              ))}
            </Switch>
          </>
        )}
      </div>
    </Router>
  );
}

export default HomePage;
