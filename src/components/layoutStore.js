import { create } from 'zustand';

const useLayoutStore = create((set) => ({
    showMobileSidebar: false,

    setShowMobileSidebar: (value) => set({ showMobileSidebar: value }),

    toggleMobileSidebar: () => set((state) => ({ showMobileSidebar: !state.showMobileSidebar })),


}));

export default useLayoutStore;
