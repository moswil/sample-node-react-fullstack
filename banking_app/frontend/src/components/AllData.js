import React, { useEffect, useState } from 'react';
import Card from './common/CardComponent';

import './styling/usertable.css';

function UserTable() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = async () => {
		try {
			const response = await fetch('http://localhost:8085/api/v1/users', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: localStorage.getItem('token'),
				},
			});

			if (response.ok) {
				const data = await response.json();
				setUsers(data.users);
			}
		} catch (error) {}
	};

	return (
		<div>
			<Card
				bgcolor='primary'
				header='ALL DATA'
				body={
					<>
						<br />
						<br />
						<table className='user-table'>
							<thead>
								<tr>
									<th>Email</th>
									<th>Name</th>
									<th>Password</th>
								</tr>
							</thead>
							<tbody>
								{users.map((user) => (
									<tr key={user._id}>
										<td>{user.email}</td>
										<td>{user.name}</td>
										<td>{user.password}</td>
									</tr>
								))}
							</tbody>
						</table>
					</>
				}
			/>
		</div>
	);
}

export default UserTable;
