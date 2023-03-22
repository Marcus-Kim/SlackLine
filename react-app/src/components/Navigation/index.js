import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
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
				<div><NavLink exact to="/">Home</NavLink></div>
				<div><ProfileButton user={sessionUser} /></div>
			</div>
		</div>
	);
}

export default Navigation;
