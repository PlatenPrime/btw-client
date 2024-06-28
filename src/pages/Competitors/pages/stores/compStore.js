import { create } from 'zustand';
import axios from '../../../utils/axios';

const useCompStore = create((set) => ({
    comps: [],
    comp: null,

    createComp: async (compData) => {
        try {
            const response = await axios.post('comps', compData);
            if (response.status === 201) {
                const newComp = response.data;
                set((state) => ({ comps: [newComp, ...state.comps] }));
                return newComp;
            } else {
                throw new Error('Ошибка создания Comp');
            }
        } catch (error) {
            console.error('Ошибка создания Comp:', error);
        }
    },

    updateOrCreateComp: async (compData) => {
        try {
            const response = await axios.put('comps', compData);
            if (response.status === 200) {
                const updatedComp = response.data;
                set((state) => ({
                    comps: state.comps.map((c) =>
                        c._id === updatedComp._id ? updatedComp : c
                    ),
                }));
                set({ comp: updatedComp });
                return updatedComp;
            } else {
                throw new Error('Ошибка обновления или создания Comp');
            }
        } catch (error) {
            console.error('Ошибка обновления или создания Comp:', error);
        }
    },

    getCompById: async (id) => {
        try {
            const response = await axios.get(`comps/${id}`);
            if (response.status === 200) {
                const comp = response.data;
                set({ comp });
                return comp;
            } else {
                throw new Error('Ошибка получения Comp по ID');
            }
        } catch (error) {
            console.error('Ошибка получения Comp по ID:', error);
        }
    },

    getCompByArtikul: async (artikul) => {
        try {
            const response = await axios.get(`comps/artikul/${artikul}`);
            if (response.status === 200) {
                const comp = response.data;
                set({ comp });
                return comp;
            } else {
                throw new Error('Ошибка получения Comp по артикулу');
            }
        } catch (error) {
            console.error('Ошибка получения Comp по артикулу:', error);
        }
    },

    getAllComps: async () => {
        try {
            const response = await axios.get('comps');
            if (response.status === 200) {
                const data = response.data;
                set({ comps: data });
                return data;
            } else {
                throw new Error('Ошибка получения всех Comps');
            }
        } catch (error) {
            console.error('Ошибка получения всех Comps:', error);
        }
    },

    deleteCompById: async (id) => {
        try {
            const response = await axios.delete(`comps/${id}`);
            if (response.status === 200) {
                set((state) => ({
                    comps: state.comps.filter((c) => c._id !== id),
                }));
            } else {
                throw new Error('Ошибка удаления Comp по ID');
            }
        } catch (error) {
            console.error('Ошибка удаления Comp по ID:', error);
        }
    },

    deleteAllComps: async () => {
        try {
            const response = await axios.delete('comps');
            if (response.status === 200) {
                set({ comps: [] });
            } else {
                throw new Error('Ошибка удаления всех Comps');
            }
        } catch (error) {
            console.error('Ошибка удаления всех Comps:', error);
        }
    },
}));

export default useCompStore;
