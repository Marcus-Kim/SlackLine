import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideBar from './Sidebar';
import MainContent from './MainContent';
import './HomePage.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllChannels } from '../../store/channels';
import { thunkGetAllMessages } from "../../store/messages";
import { thunkGetAllDMS } from "../../store/directMessages";
import { thunkGetAllDirectMessages } from "../../store/messages";
import { useParams } from "react-router-dom";
import MainContentDirect from "./MainContentDirect";
import { thunkGetUsers } from "../../store/allUsers";

function HomePage() {
  const channels = useSelector((state) => Object.values(state.channels.allChannels));
  const dms = useSelector(state => Object.values(state.directMessages.dms))
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { channelId } = useParams();

  useEffect(() => {
    const fetchChannels = async () => {
      await dispatch(thunkGetAllChannels());
      await dispatch(thunkGetAllMessages());
      await dispatch(thunkGetAllDMS());
      await dispatch(thunkGetAllDirectMessages())
      await dispatch(thunkGetUsers())
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
            <SideBar channels={channels} directMessages={dms}/>
            <Switch>
              <Route exact path="/home">
                <MainContent key={channelId} />
              </Route>
              <Route path={`/home/channel/:channelId`}>
                <MainContent key={channelId} />
              </Route>
              <Route path={`/home/dm/:dmId`}>
                <MainContentDirect type='direct' />
              </Route>
              <Route path={`/home/gdm/:gdmId`}>
                <MainContentDirect type='group' />
              </Route>
            </Switch>
          </>
        )}
      </div>
    </Router>
  );
}

export default HomePage;
