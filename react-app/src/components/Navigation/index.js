import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);


	return (
		<div className='splash-nav-container'>
			{/* <ul>
				<li>
					<NavLink exact to="/">Home</NavLink>
				</li>
				{isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				)}
			</ul> */}
			<div className='splash-nav-content'>
				<NavLink exact to="/" className={'splash-nav-home-button'}>SlackLine</NavLink>
				<div className='splash-nav-login-signup'>
					<NavLink className={'splash-nav-login-signup-button'} to='/signup'>Sign Up</NavLink>
					<NavLink className={'splash-nav-login-signup-button'} to='/login'>Log In</NavLink>
				</div>
			</div>
		</div>
	);
}

export default Navigation;
