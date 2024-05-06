import { create } from 'zustand';
import axios from '../../../utils/axios';

const useArtikulStore = create((set) => ({
	artikuls: [],

	createArtikul: async (artikul, zone, nameukr, namerus) => {
		try {
			const response = await axios.post('arts', { artikul, zone, nameukr, namerus });

			if (response.status === 201) {
				const newArtikul = response.data;
				set((state) => ({ artikuls: [...state.artikuls, newArtikul] }));
			} else {
				throw new Error('Ошибка создания Artikul');
			}
		} catch (error) {
			console.error('Ошибка создания Artikul:', error);
		}
	},

	getAllArtikuls: async () => {
		try {
			const response = await axios.get('arts');

			if (response.status === 200) {
				const data = response.data;
				set({ artikuls: data.arts });
				return data;
			} else {
				throw new Error('Ошибка получения Artikuls');
			}
		} catch (error) {
			console.error('Ошибка получения Artikuls:', error);
		}
	},

	getArtikulById: async (id) => {
		try {
			const response = await axios.get(`arts/${id}`);

			if (response.status === 200) {
				const artikul = response.data;
				return artikul;
			} else {
				throw new Error('Ошибка получения Artikul по ID');
			}
		} catch (error) {
			console.error('Ошибка получения Artikul по ID:', error);
		}
	},

	updateArtikulById: async (id, updatedData) => {
		try {
			const response = await axios.put(`arts/${id}`, updatedData);

			if (response.status === 200) {
				const updatedArtikul = response.data;
				set((state) => ({
					artikuls: state.artikuls.map((a) =>
						a._id === updatedArtikul._id ? updatedArtikul : a
					),
				}));
				return updatedArtikul;
			} else {
				throw new Error('Ошибка обновления Artikul по ID');
			}
		} catch (error) {
			console.error('Ошибка обновления Artikul по ID:', error);
		}
	},

	deleteArtikulById: async (id) => {
		try {
			const response = await axios.delete(`arts/${id}`);

			if (response.status === 200) {
				set((state) => ({
					artikuls: state.artikuls.filter((a) => a._id !== id),
				}));
			} else {
				throw new Error('Ошибка удаления Artikul по ID');
			}
		} catch (error) {
			console.error('Ошибка удаления Artikul по ID:', error);
		}
	},
}));

export default useArtikulStore;
