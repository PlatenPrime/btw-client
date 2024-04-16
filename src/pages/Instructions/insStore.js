import { create } from 'zustand';
import axios from '../../utils/axios';

const useInsStore = create((set) => ({
	instruction: null,
	instructions: [],
	folderInstructions: [],

	createInstruction: async (instructionData) => {
		try {
			const response = await axios.post('ins', instructionData);

			if (response.status === 200) {
				const newInstruction = response.data;
				set((state) => ({ folderInstructions: [newInstruction, ...state.folderInstructions] }));
				return newInstruction;
			} else {
				throw new Error('Ошибка создания инструкции');
			}
		} catch (error) {
			console.error('Ошибка создания инструкции:', error);
		}
	},

	getAllInstructions: async () => {
		try {
			const response = await axios.get('ins');

			if (response.status === 200) {
				const data = response.data;
				set({ instructions: data.instructions });
				return data.instructions;
			} else {
				throw new Error('Ошибка получения инструкций');
			}
		} catch (error) {
			console.error('Ошибка получения инструкций:', error);
		}
	},





	getFolderInstructions: async (id) => {
		try {
			const response = await axios.get(`ins/insfolder/${id}`);

			if (response.status === 200) {
				const data = response.data;
				set({ folderInstructions: data.folderInstructions });
				return data.folderInstructions;
			} else {
				throw new Error('Ошибка получения инструкций');
			}
		} catch (error) {
			console.error('Ошибка получения инструкций:', error);
		}
	},










	getInstructionById: async (id) => {
		try {
			const response = await axios.get(`ins/${id}`);

			if (response.status === 200) {
				const instruction = response.data;
				return instruction;
			} else {
				throw new Error('Ошибка получения инструкции по ID');
			}
		} catch (error) {
			console.error('Ошибка получения инструкции по ID:', error);
		}
	},

	updateInstructionById: async (id, updateData) => {
		try {
			const response = await axios.put(`ins/${id}`, updateData);

			if (response.status === 200) {
				const updatedInstruction = response.data;
				set((state) => ({
					instructions: state.instructions.map((ins) =>
						ins._id === updatedInstruction._id ? updatedInstruction : ins
					),
				}));
				return updatedInstruction;
			} else {
				throw new Error('Ошибка обновления инструкции по ID');
			}
		} catch (error) {
			console.error('Ошибка обновления инструкции по ID:', error);
		}
	},

	deleteInstructionById: async (id) => {
		try {
			const response = await axios.delete(`ins/${id}`);

			if (response.status === 200) {
				set((state) => ({
					instructions: state.instructions.filter((ins) => ins._id !== id),
				}));
			} else {
				throw new Error('Ошибка удаления инструкции по ID');
			}
		} catch (error) {
			console.error('Ошибка удаления инструкции по ID:', error);
		}
	},
}));

export default useInsStore;
