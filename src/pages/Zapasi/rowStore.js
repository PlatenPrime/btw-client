import { create } from 'zustand';
import axios from "../../utils/axios"

export const useRowStore = create((set) => ({
	rows: [],
	setRows: (newRows) => set({ rows: newRows }),
	getRows: async () => {
		try {
			const res = await axios.get("rows")
			set({rows: res.data})

		} catch (error) {
			console.log(error)
		}
	}

}));
