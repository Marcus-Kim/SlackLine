import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideBar from './Sidebar';
import MainContent from './MainContent';
import './HomePage.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllChannels } from '../../store/channels';
import { thunkGetAllMessages } from "../../store/messages";
import { useParams } from "react-router-dom";

function HomePage() {
  const channels = useSelector((state) => Object.values(state.channels.allChannels));
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { channelId } = useParams();

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
                <MainContent key={channelId} />
              </Route>
              <Route path={`/home/channel/:channelId`}>
                <MainContent key={channelId} />
              </Route>
            </Switch>
          </>
        )}
      </div>
    </Router>
  );
}

export default HomePage;
