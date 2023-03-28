import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

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

  return (
    <div className="login-page-container">
      <div className="login-page-logo">SlackLine</div>
      <div className="login-page-title">First, enter your email</div>
      <div className="login-page-title-description">We suggest using the email address you use at work</div>
      <form className="login-page-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
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
