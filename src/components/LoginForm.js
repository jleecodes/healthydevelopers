import React, { useState } from 'react';
import { API_URL } from '../config';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Input from '@material-ui/core/Input';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

const LoginForm = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [state, setState] = useState({
		email: '',
		password: '',
	});

	const [confirmPassword, setConfirmPassword] = useState({
		showPassword: false,
		showConfirmPassword: false,
	})


	function handleClickShowPassword () {
		setConfirmPassword({ ...confirmPassword, showPassword: !confirmPassword.showPassword, showConfirmPassword: !confirmPassword.showConfirmPassword })
	}

	function handleMouseDownPassword (event) {
		event.preventDefault();
	};

	function handleChange(event) {
		const value = event.target.value;
		setState({
			...state,
			[event.target.name]: value,
		});
	}
	
	function handleSubmit(event) {
		event.preventDefault();
		const userData = {
			email: state.email,
			password: state.password,
		};

		// const url = `${API_URL}/users/login`;
		const url = 'https://healthydevelopers-jl.herokuapp.com/users/login/'

		fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userData),
		})
			.then((res) => res.json())
			.then((user) => {
				console.log(user)
				if (user.token) {
					localStorage.setItem('token', user.token)
					localStorage.setItem('owner', user.foundUser._id)
					localStorage.setItem('name', user.foundUser.firstName)

					dispatch({
						type: 'SET_USER',
						payload: user
					})

					history.push("/myprofile")
				}
			})
			// .then(
			// 	setTimeout(() => {
			// 		window.location.reload(true);
			// 	}, 150)
			// )
			.catch((err) => {console.log(err)});
	}


	return (
		<div>
			<form onSubmit={handleSubmit}>
				<Input
					type='text'
					name='email'
					value={state.email}
					onChange={handleChange}
					placeholder='Email'
					required
				/>

				<Input
					type={confirmPassword.showPassword ? 'text' : 'password'}
					name='password'
					value={state.password}
					onChange={handleChange}
					placeholder='Password'
					endAdornment={
					<InputAdornment position="end">
						<IconButton
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
						>
							{confirmPassword.showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					}
					required
				/>

				<div>
					<button type='submit'>
							<span>Log In</span>
					</button>
				</div>

				<div className='divide-line'></div>

			</form>
			<div>
				<p>Don't have an account?</p>
				<Link to='/signup'>
					<span>
						Sign Up
					</span>
				</Link>
			</div>
		</div>
	);
};

export default LoginForm;
