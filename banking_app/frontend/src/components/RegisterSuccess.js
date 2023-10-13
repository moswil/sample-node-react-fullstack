import Card from './common/CardComponent';

export function RegisterSuccess() {
	return (
		<Card
			bgcolor='primary'
			header='Registered Successfully'
			body={
				<div>
					<button type='submit'>Add another account</button>
				</div>
			}
		/>
	);
}
