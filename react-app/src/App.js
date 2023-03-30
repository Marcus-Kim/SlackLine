import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import UserNavigation from "./components/Navigation/UserNavigation";
import SplashPage from "./components/SplashPage";
import HomePage from "./components/HomePage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {sessionUser && <UserNavigation isLoaded={isLoaded} />}
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path={'/home/channel/:channelId'}>
            {sessionUser ? <HomePage /> : <Redirect to={'/'} />}
          </Route>
          <Route path="/home">
            {sessionUser ? <Redirect to={"/home/channel/1"} /> : <Redirect to={"/"} />}
          </Route>
          <Route exact path="/">
            <Navigation isLoaded={isLoaded} />
            {sessionUser ? <Redirect to={"/home/channel/1"} /> : <SplashPage />}
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
