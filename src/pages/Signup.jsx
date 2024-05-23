import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '@context';
import authService from "../services/auth.service";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005';

function SignupPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [errorMessage, setErrorMessage] = useState(undefined);

	const navigate = useNavigate();

	const handleEmail = (e) => setEmail(e.target.value);
	const handlePassword = (e) => setPassword(e.target.value);
	const handleName = (e) => setName(e.target.value);

	const handleSignupSubmit = (e) => {
		e.preventDefault();
		// Create an object representing the request body
		const requestBody = { email, password, name };

		// Make an axios request to the API
		// If POST request is successful redirect to login page
		// If the request resolves with an error, set the error message in the state
		authService
			.signup(requestBody)
			.then(() => {
				navigate('/login');
			})
			.catch((error) => {
				console.log(error);
				const errorDescription = error.response
					? error.response.data.message
					: error.message;
				setErrorMessage('❌ ' + errorDescription);
			});
	};

	return (
		<div className=''>
			<form
				onSubmit={handleSignupSubmit}
				className=''>
				<h3 className=''>Sign Up</h3>

				<fieldset>
					<label
						htmlFor='name'
						className=''>
						Name
					</label>
					<input
						type='text'
						name='name'
						id='name'
						value={name}
						onChange={handleName}
						className=''
						autoComplete='off'
					/>
				</fieldset>

				<fieldset>
					<label
						htmlFor='email'
						className=''>
						Email
					</label>
					<input
						type='email'
						name='email'
						id='email'
						value={email}
						onChange={handleEmail}
						className=''
						autoComplete='off'
					/>
				</fieldset>

				<fieldset>
					<label
						htmlFor='password'
						className=''>
						Password
					</label>
					<input
						type='password'
						name='password'
						id='password'
						value={password}
						onChange={handlePassword}
						className=''
						autoComplete='off'
					/>
				</fieldset>

				<button
					type='submit'
					className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 transition duration-150 ease-in-out'>
					Create Account
				</button>
			</form>
			{errorMessage && <p className='error-message'>{errorMessage}</p>}
			<p className='mt-10 mb-2'>Already have an account?</p>
			<Link to={'/login'}> Log in</Link>
		</div>
	);
}

export default SignupPage;
