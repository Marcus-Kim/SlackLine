import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import { useHistory } from "react-router-dom";
import errorTriangle from '../SignupFormPage/triangle-exclamation-solid.svg'

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = (e) => {
    e.preventDefault();

    dispatch(login('demo@aa.io', 'password'))
  }

  const logoClick = (e) => {
    e.preventDefault();

    history.push('/')
  }

  return (
    <div className="login-page-container">
      <div className="login-page-logo" onClick={e => logoClick(e)}>SlackLine</div>
      <div className="login-page-title">First, enter your email</div>
      <div className="login-page-title-description">We suggest using the email address you use at work</div>
      <form className="login-page-form" onSubmit={handleSubmit}>
        <ul className="signup-errors-list">
          {errors.map((error, idx) => <li className="signup-error" key={idx}><img className="error-triangle" src={errorTriangle}/>{ error.split('').includes(':') ? <div>{error.split(':')[1]}</div> : error}</li>)}
        </ul>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="name@work-email.com"
            className="login-page-email-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="login-page-password-input"
          />
        <button className="login-page-continue-button" type="submit">Continue</button>
        <div>

        </div>
        <button className="demo-login-button" onClick={e => demoLogin(e)}>Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormPage;
