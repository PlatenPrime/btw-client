import { create } from 'zustand';
import axios from '../../utils/axios';

const usePalletStore = create((set) => ({
	pallets: [],


	createPallet: async (title, rowId) => {
		try {
			
			const response = await axios.post('pallets', { title, rowId });
		

			if (response.status === 201) {
				const newPallet = response.data;
				set((state) => ({ pallets: [...state.pallets, newPallet] }));
			} else {
				throw new Error('Ошибка создания Pallet');
			}
		} catch (error) {
			console.error('Ошибка создания Pallet:', error);
		}
	},



	getAllPallets: async () => {
		try {
			const response = await axios.get('pallets');

			if (response.status === 200) {
				const data = response.data;
				set({ pallets: data.pallets });
			} else {
				throw new Error('Ошибка получения Pallets');
			}
		} catch (error) {
			console.error('Ошибка получения Pallets:', error);
		}
	},


	getPalletById: async (id) => {
		try {
			const response = await axios.get(`pallets/${id}`);

			if (response.status === 200) {
				const pallet = response.data;
				return pallet;
			} else {
				throw new Error('Ошибка получения Pallet по ID');
			}
		} catch (error) {
			console.error('Ошибка получения Pallet по ID:', error);
		}
	},
	updatePalletById: async (id, updatedData) => {
		try {
			const response = await axios.put(`pallets/${id}`, updatedData);

			if (response.status === 200) {
				const updatedPallet = response.data;
				set((state) => ({
					pallets: state.pallets.map((p) =>
						p._id === updatedPallet._id ? updatedPallet : p
					),
				}));
				return updatedPallet;
			} else {
				throw new Error('Ошибка обновления Pallet по ID');
			}
		} catch (error) {
			console.error('Ошибка обновления Pallet по ID:', error);
		}
	},
	deletePalletById: async (id) => {
		try {
			const response = await axios.delete(`pallets/${id}`);

			if (response.status === 200) {
				set((state) => ({
					pallets: state.pallets.filter((p) => p._id !== id),
				}));
			} else {
				throw new Error('Ошибка удаления Pallet по ID');
			}
		} catch (error) {
			console.error('Ошибка удаления Pallet по ID:', error);
		}
	},


	// Функция для получения Pallets для конкретного Row по ID
	getRowPallets: async (id) => {
		try {
			const response = await axios.get(`rows/pallets/${id}`);
			set((state) => ({
				pallets: [ ...response.data],
			}));

			return response.data;
		} catch (error) {
			throw error;
		}
	},
}));







export default usePalletStore;
