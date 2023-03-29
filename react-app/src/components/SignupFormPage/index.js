import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import errorTriangle from './triangle-exclamation-solid.svg'

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        const data = await dispatch(signUp(username, email, password));
        if (data) {
          setErrors(data)
        }
    } else {
        setErrors(['Passwords must match']);
    }
  };

  const logoClick = (e) => {
    e.preventDefault();

    history.push('/')
  }

  return (
    <div className="signup-page-container">
      <div className="login-page-logo" onClick={e => logoClick(e)}>SlackLine</div>
      <div className="signup-page-title">Sign Up for SlackLine</div>
      <div className="signup-page-description">We recommend using the email you use at work</div>
      <form onSubmit={handleSubmit} className="signup-page-form-container">
        <ul className="signup-errors-list">
          {errors.map((error, idx) => <li className="signup-error" key={idx}><img className="error-triangle" src={errorTriangle}/>{ error.split('').includes(':') ? <div>{error.split(':')[1]}</div> : error}</li>)}
        </ul>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="signup-page-input"
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
            className="signup-page-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="signup-page-input"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
            className="signup-page-input"
          />
        <button type="submit" className="signup-page-continue-button">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
