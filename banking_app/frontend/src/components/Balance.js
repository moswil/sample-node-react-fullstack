import React, { useEffect, useState } from 'react';
import Card from './common/CardComponent';

function Balance() {
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

	return (
		<Card
			bgcolor='primary'
			header='BALANCE'
			body={
				balance !== null ? (
					<div>
						<p>Your current balance is:</p>
						<p>${balance}</p>
					</div>
				) : (
					<p>Loading balance...</p>
				)
			}
		/>
	);
}

export default Balance;
