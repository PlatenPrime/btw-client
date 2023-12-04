import {create} from 'zustand';
import axios from '../../utils/axios';

export const useAuthStore = create((set) => ({
	user: null,
	token: null,
	isLoading: false,
	status: null,

	registerUser: async ({ username, password }) => {
		try {
			const { data } = await axios.post('/auth/register', { username, password });
			if (data.token) {
				window.localStorage.setItem('token', data.token);
			}
			set({ user: data.user, token: data.token, isLoading: false, status: data.message });
		} catch (error) {
			console.error('Error registering user:', error);
			set({ isLoading: false, status: 'Error registering user' });
		}
	},

	loginUser: async ({ username, password }) => {
		try {
			const { data } = await axios.post('/auth/login', { username, password });
			if (data.token) {
				window.localStorage.setItem('token', data.token);
			}
			set({ user: data.user, token: data.token, isLoading: false, status: data.message });
		} catch (error) {
			console.error('Error logging in:', error);
			set({ isLoading: false, status: 'Error logging in' });
		}
	},

	getMe: async () => {
		try {
			const { data } = await axios.get('/auth/me');
			set({ user: data?.user, token: data?.token, isLoading: false, status: null });
		} catch (error) {
			console.error('Error getting user:', error);
			set({ isLoading: false, status: 'Error getting user' });
		}
	},

	logout: () => {
		window.localStorage.removeItem('token');
		set({ user: null, token: null, isLoading: false, status: null });
	},
}));

