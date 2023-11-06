import { create } from 'zustand';
import axios from '../../../utils/axios';

const useAskStore = create((set) => ({
	asks: [],

	createAsk: async (askData) => {
		try {
			const response = await axios.post('asks', { askData });

			if (response.status === 201) {
				const newAsk = response.data;
				set((state) => ({ asks: [newAsk, ...state.asks] }));
			} else {
				throw new Error('Ошибка создания запроса на снятие');
			}
		} catch (error) {
			console.error('Ошибка создания запроса на снятие:', error);
		}
	},

	getAllAsks: async () => {
		try {
			const response = await axios.get('asks');

			if (response.status === 200) {
				const data = response.data;
				set({ asks: data.asks });
				return data.asks;
			} else {
				throw new Error('Ошибка получения запросов на снятие');
			}
		} catch (error) {
			console.error('Ошибка получения запросов на снятие:', error);
		}
	},

	getAskById: async (id) => {
		try {
			const response = await axios.get(`asks/${id}`);

			if (response.status === 200) {
				const ask = response.data;
				return ask;
			} else {
				throw new Error('Ошибка получения запроса на снятие по ID');
			}
		} catch (error) {
			console.error('Ошибка получения запроса на снятие по ID:', error);
		}
	},

	updateAskById: async (id, updateData) => {
		try {
			const response = await axios.put(`asks/${id}`, updateData);

			if (response.status === 200) {
				const updatedAsk = response.data;
				set((state) => ({
					asks: state.asks.map((a) =>
						a._id === updatedAsk._id ? updatedAsk : a
					),
				}));
				return updatedAsk;
			} else {
				throw new Error('Ошибка обновления запроса на снятие по ID');
			}
		} catch (error) {
			console.error('Ошибка обновления запроса на снятие по ID:', error);
		}
	},

	deleteAskById: async (id) => {
		try {
			const response = await axios.delete(`asks/${id}`);

			if (response.status === 200) {
				set((state) => ({
					asks: state.asks.filter((a) => a._id !== id),
				}));
			} else {
				throw new Error('Ошибка удаления запроса на снятие по ID');
			}
		} catch (error) {
			console.error('Ошибка удаления запроса на снятие по ID:', error);
		}
	},
}));

export default useAskStore;
