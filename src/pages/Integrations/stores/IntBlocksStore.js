import { create } from 'zustand';
import axios from '../../../utils/axios';

const useIntBlocksStore = create((set) => ({
    intsBlocks: [],
    intBlocks: [],
    intBlock: null,


    createIntBlock: async (intBlockData) => {
        try {
            const response = await axios.post('intblocks', intBlockData);

            if (response.status === 201) {
                const newIntBlock = response.data;
                set((state) => ({ intsBlocks: [...state.intsBlocks, newIntBlock] }));
                return newIntBlock;
            } else {
                throw new Error('Ошибка создания блока интеграции');
            }
        } catch (error) {
            console.error('Ошибка создания блока интеграции:', error);
        }
    },

    getAllIntBlocks: async () => {
        try {
            const response = await axios.get('intblocks');

            if (response.status === 200) {
                const intsBlocks = response.data;
                set({ intsBlocks });
                return intsBlocks;
            } else {
                throw new Error('Ошибка получения всех блоков интеграций');
            }
        } catch (error) {
            console.error('Ошибка получения всех блоков интеграций:', error);
        }
    },



    getIntBlocksByIntId: async (intId) => {
        try {
            const response = await axios.get(`intblocks/int/${intId}`);

            if (response.status === 200) {
                const intBlocks = response.data;
                set({ intBlocks });
                return intBlocks;
            } else {
                throw new Error('Ошибка получения блоков интеграций по ID интеграции');
            }
        } catch (error) {
            console.error('Ошибка получения блоков интеграций по ID интеграции:', error);
        }
    },




    getIntBlockById: async (id) => {
        try {
            const response = await axios.get(`intblocks/${id}`);

            if (response.status === 200) {
                const intBlock = response.data;
                set({ intBlock });
                return intBlock;
            } else {
                throw new Error('Ошибка получения блока интеграции по ID');
            }
        } catch (error) {
            console.error('Ошибка получения блока интеграции по ID:', error);
        }
    },

    updateIntBlockById: async (id, updateData) => {
        try {
            const response = await axios.put(`intblocks/${id}`, updateData);

            if (response.status === 200) {
                const updatedIntBlock = response.data;
                set((state) => ({
                    intBlock: updatedIntBlock,
                    intsBlocks: state.intsBlocks.map((block) =>
                        block._id === updatedIntBlock._id ? updatedIntBlock : block
                    ),
                }));
                return updatedIntBlock;
            } else {
                throw new Error('Ошибка обновления блока интеграции по ID');
            }
        } catch (error) {
            console.error('Ошибка обновления блока интеграции по ID:', error);
        }
    },

    deleteIntBlockById: async (id) => {
        try {
            const response = await axios.delete(`intblocks/${id}`);

            if (response.status === 200) {
                set((state) => ({
                    intsBlocks: state.intsBlocks.filter((block) => block._id !== id),
                }));
            } else {
                throw new Error('Ошибка удаления блока интеграции по ID');
            }
        } catch (error) {
            console.error('Ошибка удаления блока интеграции по ID:', error);
        }
    },
}));

export default useIntBlocksStore;
