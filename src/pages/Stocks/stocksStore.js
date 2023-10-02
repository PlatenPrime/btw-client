import { create } from 'zustand';
import axios from "../../utils/axios"

export const useRowStore = create((set) => ({
	rows: [],

	// Функция для создания нового Row
	createRow: async (title) => {
		try {
			const response = await axios.post('rows', { title });
			set((state) => ({
				rows: [...state.rows, response.data],
			}));
		} catch (error) {
			throw error;
		}
	},

	// Функция для получения всех Row
	getAllRows: async () => {
		try {
			const response = await axios.get('rows');
			set({ rows: response.data.rows });
		} catch (error) {
			throw error;
		}
	},

	// Функция для получения Row по ID
	getRowById: async (id) => {
		try {
			const response = await axios.get(`rows/${id}`);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	// Функция для удаления Row по ID
	deleteRowById: async (id) => {
		try {
			await axios.delete(`rows/${id}`);
			set((state) => ({
				rows: state.rows.filter((row) => row._id !== id),
			}));
		} catch (error) {
			throw error;
		}
	},

	// Функция для обновления Row по ID
	updateRowById: async (id, title) => {
		try {
			const response = await axios.put(`rows/${id}`, { title });
			set((state) => ({
				rows: state.rows.map((row) =>
					row._id === id ? { ...row, title: response.data.title } : row
				),
			}));
		} catch (error) {
			throw error;
		}
	},

	// Функция для получения Pallets для конкретного Row по ID
	getRowPallets: async (id) => {
		try {
			const response = await axios.get(`rows/pallets/${id}`);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
}));
