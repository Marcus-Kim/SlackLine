import ProfileButton from "./ProfileButton";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import './UserNavigation.css'

function UserNavigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user)

  return (
		<div className="user-nav-container">
			<div className="user-nav-logo">SlackLine</div>
			<div className="user-nav-profile-button"><ProfileButton user={sessionUser} /></div>
		</div>
	);
}

export default UserNavigation
