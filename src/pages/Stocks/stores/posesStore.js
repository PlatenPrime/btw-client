import { create } from 'zustand';
import axios from '../../../utils/axios';



const usePosesStore = create((set) => ({
	poses: [],
	allPoses: [],

	posesWithArtikul: [],


	clearPosesStore: () => set(() => ({
		poses: [],
	})),


	createPos: async (palletId, posData) => {
		try {

			const response = await axios.post('poses', { palletId, ...posData });
			// console.log(response)

			if (response.status === 201) {
				const newPos = response.data
				set((state) => ({
					poses: [newPos, ...state.poses],
				}));

			} else {
				throw new Error('Ошибка создания Pos')
			}

		} catch (error) {
			console.error('Ошибка при создании позиции:', error);
			throw error;
		}
	},

	getAllPoses: async () => {
		try {
			const response = await axios.get('poses');
			const data = response.data.poses.sort((a, b) => a.artikul - b.artikul)
			set({ allPoses: data });
			return data
		} catch (error) {
			console.error('Ошибка при получении всех позиций:', error);
		}
	},


	addNewPosToAllPoses: async (newPos) => {
		try {
			set((state) => ({
				allPoses: [newPos, ...state.allPoses],
			}));
		} catch (error) {
			console.error('Ошибка при добавлении новой позиции ко всем позициям:', error);
		}
	},



	getPosById: async (id) => {
		try {
			const response = await axios.get(`poses/${id}`);
			return response.data;
		} catch (error) {
			console.error('Ошибка при получении позиции по ID:', error);
			throw error;
		}
	},

	updatePosById: async (id, updateData) => {
		try {
			const response = await axios.put(`poses/${id}`, updateData);
			set((state) => ({
				poses: state.poses.map((pos) => (pos._id === id ? response.data : pos)),
			}));
			return response.data;
		} catch (error) {
			console.error('Ошибка при обновлении позиции:', error);
			throw error;
		}
	},

	updatePosWithArtikulById: async (id, updateData) => {
		try {
			const response = await axios.put(`poses/${id}`, updateData);
			set((state) => ({
				posesWithArtikul: state.posesWithArtikul.map((pos) => (pos._id === id ? response.data : pos)),
			}));
			return response.data;
		} catch (error) {
			console.error('Ошибка при обновлении позиции:', error);
			throw error;
		}
	},






	deletePosById: async (id) => {
		try {
			const response = await axios.delete(`poses/${id}`);
			set((state) => ({
				poses: state.poses.filter((pos) => pos._id !== id),
			}));
			return response.data;
		} catch (error) {
			console.error('Ошибка при удалении позиции:', error);
			throw error;
		}
	},

	getPalletPoses: async (id) => {
		try {
			const response = await axios.get(`pallets/poses/${id}`);
			const fetchedPoses = response.data.poses.sort((a, b) => {
				const aArtikul = Number(a.artikul.replace(/-/g, ''));
				const bArtikul = Number(b.artikul.replace(/-/g, ''));
				return aArtikul - bArtikul;
			});
			// console.log(fetchedPoses)

			set((state) => ({
				poses: [...fetchedPoses],
			}));

			return response.data;
		} catch (error) {
			throw error;
		}
	},

	getPosesByArtikul: async (artikul) => {
		try {
			const response = await axios.get(`poses/artikul/${artikul}`);
			set({ posesWithArtikul: response.data.positions });
			return response.data.positions
		} catch (error) {
			console.error('Ошибка при получении позиций по артикулу:', error);
		}
	},

}));








export default usePosesStore;
