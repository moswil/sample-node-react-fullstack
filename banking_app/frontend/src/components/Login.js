import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './styling/login.css';
function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [isFormValid, setIsFormValid] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (formData.email && formData.password) {
			setIsFormValid(true);
		}

		if (isLoggedIn) {
			navigate('/');
			window.location.reload(false);
		}
	}, [formData, isLoggedIn]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const authenticateUser = async (formData) => {
		try {
			const response = await fetch('http://localhost:8085/api/v1/users/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				// set local storage
				const data = await response.json();
				console.log({ data });
				localStorage.setItem('token', data.token);
				localStorage.setItem('email', data.email);
				return true; // Authentication success
			} else {
				return false; // Authentication failure
			}
		} catch (error) {
			console.log(`error occurred when logging in: ${error}`);
			return false;
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Implement authentication logic here
		if (formData.email && formData.password) {
			const isAuthenticated = await authenticateUser(formData);

			if (isAuthenticated) {
				alert('Login success!');
				setIsLoggedIn(true);
			} else {
				alert('Invalid email or password.');
				// clear the form?
			}
		} else {
			alert('Please fill in all fields.');
		}
	};

	return (
		<div className='login-form'>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='email'>Email:</label>
					<input
						type='email'
						name='email'
						id='email'
						value={formData.email}
						onChange={handleChange}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password:</label>
					<input
						type='password'
						name='password'
						id='password'
						value={formData.password}
						onChange={handleChange}
					/>
				</div>
				<button type='submit' disabled={!isFormValid}>
					Login
				</button>
			</form>
		</div>
	);
}

export default Login;
