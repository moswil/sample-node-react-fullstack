import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

function Logout() {
	const navigate = useNavigate();
	useEffect(() => {
		// get the user using local storage token
		logout();
	}, []);

	const logout = async () => {
		localStorage.clear();
		window.location.reload(false);
		return navigate('/login');
	};

	return <></>;
}

export default Logout;
