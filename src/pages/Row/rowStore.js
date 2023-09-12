import { create } from 'zustand'

export const useRowStore = create((set) => ({
	row: 999,
	changeRow: () => set((state) => ({ row: state.row + 1 })),
	clearRow: () => set({ row: 0 }),
}))