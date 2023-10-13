import React from 'react';

const Card = ({ bgcolor, header, body }) => {
	const cardStyle = {
		backgroundColor: bgcolor,
		padding: '60px',
		margin: '0 auto' /* Center the card horizontally */,
		borderRadius: '8px',
		boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
		width: 500,
	};

	return (
		<div style={cardStyle}>
			{header && <div className='card-header'>{header}</div>}
			{body && <div className='card-body'>{body}</div>}
		</div>
	);
};

export default Card;
