import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import video from './splash.mp4'
function Navigation({ isLoaded }){

	return (
		<div className='splash-nav-container'>
			<div className='splash-nav-content'>
				<NavLink exact to="/" className={'splash-nav-home-button'}>SlackLine</NavLink>
				<div className='splash-nav-login-signup'>
					<NavLink className={'splash-nav-login-signup-button'} to='/signup'>Sign Up</NavLink>
					<NavLink className={'splash-nav-login-signup-button'} to='/login'>Log In</NavLink>
				</div>
			</div>
			<video className='video' autoPlay loop muted >
				<source src={video} type='video/mp4'/>
			</video>
		</div>
	);
}

export default Navigation;
