import React, { useEffect, useState } from 'react';

import './styling/register.css';

import Card from './common/CardComponent';

function Registration() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const [isFormValid, setIsFormValid] = useState(false);
	const [show, setShow] = useState(true);

	useEffect(() => {
		if (formData.name && formData.email && formData.password) {
			setIsFormValid(true);
		}
	}, [formData]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log({ formData });

		// Implement form validation logic here
		if (formData.name && formData.email && formData.password) {
			// Validation passed
			try {
				const response = await fetch(
					'http://localhost:8085/api/v1/users/register',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(formData),
					}
				);

				if (response.ok) {
					// alert('Registration success!');
					setFormData({
						name: '',
						email: '',
						password: '',
					});
					setIsFormValid(false);
					setShow(false);
				} else {
					alert('Registration failed. Please try again.');
				}
			} catch (error) {
				console.error('Error:', error);
				alert('An error occurred during registration.');
			}
		} else {
			alert('Please fill in all fields.');
		}
	};

	const SetShow = () => {
		setShow(true);
	};

	return (
		<>
			{' '}
			{show ? (
				<div className='registration-form'>
					<h2>Register</h2>
					<form onSubmit={handleSubmit}>
						<div className='form-group'>
							<label htmlFor='name'>Name:</label>
							<input
								type='text'
								name='name'
								id='name'
								value={formData.name}
								onChange={handleChange}
							/>
						</div>
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
							Register
						</button>
					</form>
				</div>
			) : (
				<Card
					bgcolor='primary'
					header='Registered Successfully'
					body={
						<div>
							<button type='submit' onClick={SetShow}>
								Add another account
							</button>
						</div>
					}
				/>
			)}
		</>
	);
}

export default Registration;
