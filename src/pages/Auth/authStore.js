import { create } from 'zustand';
import axios from '../../utils/axios';


const useAuthStore = create((set) => ({
	user:  null,
	token: localStorage.getItem('token') || null,
	error: null,

	setUser: (user) => set({ user }),
	setToken: (token) => set({ token }),


	setTokenToLS: (token) => {
		set({ token });
		localStorage.setItem('token', token);
	},
	setUserToLS: (user) => {
		set({ user });
		localStorage.setItem('user', user);
	},





	
	setError: (error) => set({ error }),

	login: async (formData) => {
		try {
			const response = await axios.post('/auth/login', formData);
			console.log(response);
			set({ user: response.data.user, token: response.data.token, error: null });
			useAuthStore.getState().setTokenToLS(response.data.token)
			useAuthStore.getState().setUserToLS(JSON.stringify(response.data.user))
			return response.data.user
		} catch (error) {
			set({ error: 'Login error. Please check your credentials.' });
		}
	},

	logout: () => {
		set({ user: null, token: null, error: null });
		localStorage.removeItem('token');
		localStorage.removeItem('user');
	},

	registration: async (formData) => {
		try {
			const response = await axios.post('/auth/registration', formData);
			set({ user: response.data.user, token: response.data.token, error: null });
		} catch (error) {
			set({ error: 'Registration error. Please check your input data.' });
		}
	},

	getMe: async () => {
		try {
			const response = await axios.get(`/auth/me/${useAuthStore.getState().user._id}`);
			console.log(response);

			set({ user: response.data.user, token: response.data.token, error: null });
		} catch (error) {
			set({ error: 'GetMe error. User is not authenticated.' });
		}
	},

	getUsers: async () => {
		try {
			const response = await axios.get('/auth/users');
			return response.data;
		} catch (error) {
			set({ error: 'Error while fetching users.' });
		}
	},

	getUserById: async (id) => {
		try {
			const response = await axios.get(`/auth/users/${id}`);
			return response.data.user;
		} catch (error) {
			set({ error: 'Error while fetching user by ID.' });
		}
	},
}));

export default useAuthStore;
