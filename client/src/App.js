import { useState } from 'react';
import socketIOClient from 'socket.io-client';
const socket = socketIOClient('/');

socket.emit('initial_data');
socket.on('get_data', (a) => console.log(a));
// socket.on('change_data', (a) => console.log(a));

function App() {
	const [value, setValue] = useState('Start Value');

	const handleInputText = (e) => {
		socket.emit('changeInputValue', e.target.value);
		socket.on('get_value', ({ value }) => {
			console.log('message', value);
			setValue(value);
		});
	};

	return (
		<div>
			<p>{value}</p>
			<input type='text' onChange={handleInputText} value={value} />
		</div>
	);
}

export default App;
