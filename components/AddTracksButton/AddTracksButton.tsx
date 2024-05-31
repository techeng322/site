import { useState } from 'react';
import Button from '../Button';

const AddTracksButton = () => {
	const [minting, setMinting] = useState(false);

	function onClick() {
		setMinting(true);
		setTimeout(() => {
			window.alert('Contract signed');
			setMinting(false);
		}, 1500);
	}

	return (
		<Button onClick={onClick} variant="secondary">
			{minting ? 'Sign contract... ' : 'Add tracks'}
		</Button>
	);
};

export default AddTracksButton;
