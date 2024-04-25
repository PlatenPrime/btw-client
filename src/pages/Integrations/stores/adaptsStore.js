import { create } from 'zustand';
import axios from '../../../utils/axios';

const useAdaptsStore = create((set) => ({
    adapts: [],
    adapt: null,

    createAdapt: async (adaptData) => {
        try {
            const response = await axios.post('adapts', adaptData);

            if (response.status === 201) {
                const newAdapt = response.data;
                set((state) => ({ adapts: [newAdapt, ...state.adapts] }));
                return newAdapt;
            } else {
                throw new Error('Ошибка создания адаптации');
            }
        } catch (error) {
            console.error('Ошибка создания адаптации:', error);
        }
    },

    getAllAdapts: async () => {
        try {
            const response = await axios.get('adapts');

            if (response.status === 200) {
                const adapts = response.data;
                set({ adapts });
                return adapts;
            } else {
                throw new Error('Ошибка получения адаптаций');

            }
        } catch (error) {
            console.error('Ошибка получения адаптаций:', error);
        }
    },

    getAdaptById: async (id) => {
        try {
            const response = await axios.get(`adapts/${id}`);

            if (response.status === 200) {
                const adapt = response.data;
                
                set({ adapt });
                return adapt;
            } else {
                throw new Error('Ошибка получения адаптации по ID');
            }
        } catch (error) {
            console.error('Ошибка получения адаптации по ID:', error);
        }
    },

    updateAdaptById: async (id, updateData) => {
        try {
            const response = await axios.put(`adapts/${id}`, updateData);

            if (response.status === 200) {
                const updatedAdapt = response.data;

                set((state) => ({
                    adapt: updatedAdapt,
                    adapts: state.adapts.map((item) =>
                        item._id === updatedAdapt._id ? updatedAdapt : item
                    ),
                }));
                return updatedAdapt;
            } else {
                throw new Error('Ошибка обновления адаптации по ID');
            }
        } catch (error) {
            console.error('Ошибка обновления адаптации по ID:', error);
        }
    },

    deleteAdaptById: async (id) => {
        try {
            const response = await axios.delete(`adapts/${id}`);

            if (response.status === 200) {
                set((state) => ({
                    adapts: state.adapts.filter((item) => item._id !== id),
                }));
            } else {
                throw new Error('Ошибка удаления адаптации по ID');
            }
        } catch (error) {
            console.error('Ошибка удаления адаптации по ID:', error);
        }
    },
}));

export default useAdaptsStore;
