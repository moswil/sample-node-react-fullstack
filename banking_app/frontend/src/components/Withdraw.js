import React, { useEffect, useState } from 'react';
import Card from './common/CardComponent';

export function Withdraw() {
	const [withdraw, setWithdraw] = useState(0);
	const [balance, setBalance] = useState(0);

	useEffect(() => {
		// get the user using local storage token
		getBalance();
	}, [balance]);

	const getBalance = async () => {
		try {
			const response = await fetch(
				'http://localhost:8085/api/v1/users/balance',
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: localStorage.getItem('token'),
					},
				}
			);

			if (response.ok) {
				const data = await response.json();
				setBalance(data.balance);
			}
		} catch (error) {}
	};

	const makeWithdraw = async (withdrawAmount) => {
		try {
			const response = await fetch(
				'http://localhost:8085/api/v1/users/withdraw',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: localStorage.getItem('token'),
					},

					body: JSON.stringify({ withdrawAmount }),
				}
			);
			if (response.ok) {
				const data = await response.json();
				setBalance(data.balance);
				alert('Withdraw success!');
				setWithdraw(0);
			} else {
				const res = await response.json();
				alert(res.error);
			}
		} catch (error) {}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (withdraw > 0) {
			// call deposit
			makeWithdraw(withdraw);
		}
	};

	return (
		<Card
			bgcolor='primary'
			header='WITHDRAW'
			body={
				<>
					<br />
					<br />
					Balance
					<input
						style={{ width: '20%', height: '35px', marginLeft: '50px' }}
						type='input'
						className='form-control'
						id='name'
						placeholder='35.0'
						value={balance}
						onChange={(e) => setBalance(e.currentTarget.value)}
					/>
					<br />
					<br />
					Withdraw Amount
					<br />
					<input
						style={{ width: '50%', height: '35px' }}
						type='input'
						className='form-control'
						id='email'
						placeholder='20.0'
						value={withdraw}
						onChange={(e) => setWithdraw(e.currentTarget.value)}
					/>
					<br /> <br /> <br />
					<button
						type='submit'
						className='btn btn-light'
						onClick={handleSubmit}
					>
						Withdraw{' '}
					</button>
				</>
			}
		/>
	);
}
