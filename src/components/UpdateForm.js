import React from 'react';

const UpdateForm = () => {
	const dailyInput = {
		water: '',
		pushups: '',
		situps: '',
		squats: '',
	};

	const [dailyData, setDailyData] = useState(dailyInput);

	const handleChange = (event) => {
		setDailyData({ ...dailyData, [event.target.id]: event.target.value });
	};

	function handleSubmit(event) {
		event.preventDefault();
		const url = `${API_URL}/habits/${}`;
		fetch(url, {
			method: 'PUT',
			body: JSON.stringify(dailyData),
			headers: {
				Authorization: `Bearer ${window.localStorage.getItem('token')}`,
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor='water'>Water</label>
				<input
					type='text'
					value={dailyData.water}
					onChange={handleChange}
					placeholder='0 cups'
				/>

				<label htmlFor='pushups'>Push-Ups</label>
				<input
					type='text'
					value={dailyData.pushups}
					onChange={handleChange}
					placeholder='0'
				/>

				<label htmlFor='situps'>Sit-Ups</label>
				<input
					type='text'
					value={dailyData.situps}
					onChange={handleChange}
					placeholder='0'
				/>

				<label htmlFor='squats'>Squats</label>
				<input
					type='text'
					value={dailyData.squats}
					onChange={handleChange}
					placeholder='0'
				/>

				<br />
				<button type='submit' value='submit' />
			</form>
		</div>
	);
};

export default UpdateForm;
