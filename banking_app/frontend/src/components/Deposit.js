import React, { useEffect, useState } from 'react';
import Card from './common/CardComponent';

export function Deposit() {
	const [deposit, setDeposit] = useState(0);
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

	const makeDeposit = async (depositAmount) => {
		try {
			const response = await fetch(
				'http://localhost:8085/api/v1/users/deposit',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: localStorage.getItem('token'),
					},

					body: JSON.stringify({ depositAmount }),
				}
			);
			console.log({ response });
			if (response.ok) {
				const data = await response.json();
				setBalance(data.balance);
				alert('Deposit success');
				setDeposit(0);
			}
		} catch (error) {
			console.log({ error });
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (deposit > 0) {
			// call deposit
			makeDeposit(deposit);
		}
	};

	return (
		<Card
			bgcolor='primary'
			header='DEPOSIT'
			body={
				<>
					<br />
					<br />
					Balance
					<input
						style={{ width: '20%', height: '35px', marginLeft: '50px' }}
						type='input'
						className='form-control'
						value={balance}
						onChange={(e) => setBalance(e.currentTarget.value)}
					/>
					<br />
					<br />
					Deposit Amount
					<br />
					<input
						style={{ width: '50%', height: '35px' }}
						type='input'
						className='form-control'
						id='deposit'
						placeholder='20.0'
						value={Number(deposit)}
						onChange={(e) => setDeposit(e.currentTarget.value)}
					/>
					<br /> <br /> <br />
					<button
						type='submit'
						className='btn btn-light'
						onClick={handleSubmit}
					>
						Deposit{' '}
					</button>
				</>
			}
		/>
	);
}
