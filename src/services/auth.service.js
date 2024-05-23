import axios from 'axios';

class AuthService {
	constructor() {
		// Create a new instance of axios with a custom configuration
		this.api = axios.create({
			baseURL: import.meta.env.SERVER_URL || 'http://localhost:5005',
		});

        // The axios interceptor is a function that gets called for every request that is sent using the axios instance.
		// It automatically sets JWT token in the headers for every request
		this.api.interceptors.request.use((config) => {
			// Retrieve the JWT token from the local storage
			const storedToken = localStorage.getItem('authToken');

			if (storedToken) {
				config.headers = { Authorization: `Bearer ${storedToken}` };
			}

			return config;
		});
	}

	login = (requestBody) => {
		return this.api.post('/auth/login', requestBody);
		// same as
		// return axios.post("http://localhost:5005/auth/login");
	};

	signup = (requestBody) => {
		return this.api.post('/auth/signup', requestBody);
		// same as
		// return axios.post("http://localhost:5005/auth/singup");
	};

	verify = () => {
		return this.api.get('/auth/verify');
		// same as
		// return axios.post("http://localhost:5005/auth/verify");
	};
}

// Create one instance object
const authService = new AuthService();

export default authService;