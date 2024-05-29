import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authService from '../services/auth.service';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005';

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState(null);
	const [authError, setAuthError] = useState(null);
	const storeToken = (token) => {
		localStorage.setItem('authToken', token);
	};

	const authenticateUser = () => {
		// Get the stored token from the localStorage
		const storedToken = localStorage.getItem('authToken');

		// If the token exists in the localStorage
		if (storedToken) {
			// We must send the JWT token in the request's "Authorization" Headers
			authService
				.verify()
				.then((response) => {
					// If the server verifies that JWT token is valid
					const user = response.data;
					setIsLoggedIn(true);
					setIsLoading(false);
					setUser(user);
				})
				.catch((error) => {
					if (error) {
						setAuthError(error.response.data.message);
						return;
					}
					// If the server sends an error response (invalid token)
					setIsLoggedIn(false);
					setIsLoading(false);
					setUser(null);
				});
		} else {
			// If the token is not available
			setIsLoggedIn(false);
			setIsLoading(false);
			setUser(null);
		}
	};

	const removeToken = () => {
		// Upon logout, remove the token from the localStorage
		localStorage.removeItem('authToken');
	};

	const logOutUser = () => {
		removeToken();
		authenticateUser();
	};

	useEffect(() => {
		// Run the function after the initial render,
		// after the components in the App render for the first time.
		authenticateUser();
	}, []);


	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				isLoading,
				user,
				storeToken,
				authenticateUser,
				logOutUser,
				authError,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
}

export { AuthProviderWrapper, AuthContext };
