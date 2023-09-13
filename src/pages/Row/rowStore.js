import { create } from 'zustand'
import axios from "../../utils/axios"
import { persist } from 'zustand/middleware'

export const useRowStore = create((set) => ({
	row: 999,
	changeRow: () => set((state) => ({ row: state.row + 1 })),
	clearRow: () => set({ row: 0 }),
	getRows: async () => {
		try {
			const res = await axios.get("rows")
			console.log(res.data)

		} catch (error) {
			console.log(error)
		}
	}

})


)