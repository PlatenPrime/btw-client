import { create } from 'zustand';
import axios from '../../../utils/axios';

const usePalletStore = create((set) => ({
	pallet: null,
	selectedPallet: null,
	pallets: [],
	rowPallets: [],
	selectedRowPallets: [],



	createPallet: async (createData) => {
		try {

			const response = await axios.post('pallets', { ...createData });


			if (response.status === 201) {
				const newPallet = response.data;
				set((state) => ({ rowPallets: [...state.rowPallets, newPallet] }));
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
				return data.pallets
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

				set({ pallet: pallet });
				return pallet;
			} else {
				throw new Error('Ошибка получения Pallet по ID');
			}
		} catch (error) {
			console.error('Ошибка получения Pallet по ID:', error);
		}
	},


	getSelectedPalletById: async (id) => {
		try {
			const response = await axios.get(`pallets/${id}`);

			if (response.status === 200) {
				const selectedPallet = response.data;

				set({ selectedPallet: selectedPallet });
				return selectedPallet;
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
				set({ pallet: updatedPallet });
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
			set({ rowPallets: [...response.data] });
			return response.data;
		} catch (error) {
			throw error;
		}
	},


	getSelectedRowPallets: async (id) => {
		try {
			const response = await axios.get(`rows/pallets/${id}`);
			set({ selectedRowPallets: [...response.data] });
			return response.data;
		} catch (error) {
			throw error;
		}
	},




	clearPalletById: async (id) => {
		try {
			const response = await axios.put(`pallets/clear/${id}`);

			if (response.status === 200) {
				const message = response.data.message;

				return message;
			} else {
				throw new Error('Ошибка при очистке Pallet по ID');
			}
		} catch (error) {
			console.error('Ошибка при очистке Pallet по ID:', error);
		}
	},


	movePalletContent: async (currentPalletId, targetPalletId) => {
		try {
			const response = await axios.put('pallets/move', {
				currentPalletId,
				targetPalletId,
			});

			if (response.status === 200) {
				const message = response.data.message;

				return message;
			} else {
				throw new Error('Ошибка при перемещении содержимого Pallet');
			}
		} catch (error) {
			console.error('Ошибка при перемещении содержимого Pallet:', error);
		}
	},

}));




export default usePalletStore;
