import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './styling/navbar.css';

const Navbar = () => {
	const [email, setEmail] = useState('');
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const location = useLocation();
	const isActive = (path) => location.pathname === path;

	useEffect(() => {
		// get logged in user
		getUser();
	}, [email]);

	const getUser = () => {
		if (localStorage.getItem('email')) {
			setEmail(localStorage.getItem('email'));
		}
		if (localStorage.getItem('token')) {
			setIsLoggedIn(true);
		}
	};

	return (
		<div className='navbar'>
			<ul className='navbar-list'>
				<li className='navbar-item'>
					<NavLink to='/'>Bad Bank</NavLink>
				</li>

				{isLoggedIn ? (
					<>
						<li className='navbar-item'>
							<NavLink to='/deposit'>Deposit</NavLink>
						</li>
						<li className='navbar-item active-link'>
							<NavLink to='/withdraw'>Withdraw</NavLink>
						</li>
						<li className='navbar-item'>
							<NavLink to='/balance'>Balance</NavLink>
						</li>
						<li className='navbar-item'>
							<NavLink to='/all-data'>All Data</NavLink>
						</li>
						<li className='navbar-item'>
							<NavLink to='/logout'>Logout</NavLink>
						</li>
						<li className='navbar-item'>
							<Link style={{ backgroundColor: 'cyan', marginLeft: '80px' }}>
								{email}
							</Link>
						</li>
					</>
				) : (
					<>
						<li className='navbar-item' style={{ marginLeft: '300px' }}>
							<NavLink to='/create-account'>Create Account</NavLink>
						</li>
						<li className='navbar-item'>
							<NavLink to='/login'>Login</NavLink>
						</li>
					</>
				)}
			</ul>
		</div>
	);
};

export default Navbar;
