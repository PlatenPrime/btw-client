import { create } from 'zustand';
import axios from '../../../utils/axios';

const useAdaptBlocksStore = create((set) => ({
    adaptsBlocks: [],
    oneAdaptBlocks: [],
    adaptBlock: null,


    createAdaptBlock: async (adaptBlockData) => {
        try {
            const response = await axios.post('adaptblocks', adaptBlockData);

            if (response.status === 201) {
                const newAdaptBlock = response.data;
                set((state) => ({ adaptsBlocks: [...state.adaptsBlocks, newAdaptBlock] }));
                return newAdaptBlock;
            } else {
                throw new Error('Ошибка создания блока адаптации');
            }
        } catch (error) {
            console.error('Ошибка создания блока адаптации:', error);
        }
    },

    getAllAdaptBlocks: async () => {
        try {
            const response = await axios.get('adaptblocks');

            if (response.status === 200) {
                const adaptsBlocks = response.data;
                set({ adaptsBlocks });
                return adaptsBlocks;
            } else {
                throw new Error('Ошибка получения всех блоков адаптаций');
            }
        } catch (error) {
            console.error('Ошибка получения всех блоков адаптаций:', error);
        }
    },



    getAdaptBlocksByAdaptId: async (adaptId) => {
        try {
            const response = await axios.get(`adaptblocks/adapt/${adaptId}`);

            if (response.status === 200) {
                const oneAdaptBlocks = response.data;
                set({ oneAdaptBlocks });
                return oneAdaptBlocks;
            } else {
                throw new Error('Ошибка получения блоков адаптаций по ID адаптации');
            }
        } catch (error) {
            console.error('Ошибка получения блоков адаптаций по ID адаптации:', error);
        }
    },




    getAdaptBlockById: async (id) => {
        try {
            const response = await axios.get(`adaptblocks/${id}`);

            if (response.status === 200) {
                const adaptBlock = response.data;
                set({ adaptBlock });
                return adaptBlock;
            } else {
                throw new Error('Ошибка получения блока адаптации по ID');
            }
        } catch (error) {
            console.error('Ошибка получения блока адаптации по ID:', error);
        }
    },

    updateAdaptBlockById: async (id, updateData) => {
        try {
            const response = await axios.put(`adaptblocks/${id}`, updateData);

            if (response.status === 200) {
                const updatedAdaptBlock = response.data;
                set((state) => ({
                    adaptBlock: updatedAdaptBlock,
                    adaptsBlocks: state.adaptsBlocks.map((block) =>
                        block._id === updatedAdaptBlock._id ? updatedAdaptBlock : block
                    ),
                }));
                return updatedAdaptBlock;
            } else {
                throw new Error('Ошибка обновления блока интеграции по ID');
            }
        } catch (error) {
            console.error('Ошибка обновления блока интеграции по ID:', error);
        }
    },

    deleteAdaptBlockById: async (id) => {
        try {
            const response = await axios.delete(`adaptblocks/${id}`);

            if (response.status === 200) {
                set((state) => ({
                    adaptsBlocks: state.adaptsBlocks.filter((block) => block._id !== id),
                }));
            } else {
                throw new Error('Ошибка удаления блока интеграции по ID');
            }
        } catch (error) {
            console.error('Ошибка удаления блока интеграции по ID:', error);
        }
    },
}));

export default useAdaptBlocksStore;
