import { create } from 'zustand';
import axios from '../../../utils/axios';

const useIntsStore = create((set) => ({
    ints: [],
    int: null,

    createInt: async (intData) => {
        try {
            const response = await axios.post('ints', intData);

            if (response.status === 201) {
                const newInt = response.data;
                set((state) => ({ ints: [newInt, ...state.ints] }));
                return newInt;
            } else {
                throw new Error('Ошибка создания интеграции');
            }
        } catch (error) {
            console.error('Ошибка создания интеграции:', error);
        }
    },

    getAllInts: async () => {
        try {
            const response = await axios.get('ints');

            if (response.status === 200) {
                const ints = response.data;
                set({ ints });
                return ints;
            } else {
                throw new Error('Ошибка получения интеграций');
                
            }
        } catch (error) {
            console.error('Ошибка получения интеграций:', error);
        }
    },

    getIntById: async (id) => {
        try {
            const response = await axios.get(`ints/${id}`);

            if (response.status === 200) {
                const int = response.data;
                console.log("Get Int, Zustand", int);

                set({ int });
                return int;
            } else {
                throw new Error('Ошибка получения интеграции по ID');
            }
        } catch (error) {
            console.error('Ошибка получения интеграции по ID:', error);
        }
    },

    updateIntById: async (id, updateData) => {
        try {
            const response = await axios.put(`ints/${id}`, updateData);

            if (response.status === 200) {
                const updatedInt = response.data;

                set((state) => ({
                    int: updatedInt,
                    ints: state.ints.map((item) =>
                        item._id === updatedInt._id ? updatedInt : item
                    ),
                }));
                return updatedInt;
            } else {
                throw new Error('Ошибка обновления интеграции по ID');
            }
        } catch (error) {
            console.error('Ошибка обновления интеграции по ID:', error);
        }
    },

    deleteIntById: async (id) => {
        try {
            const response = await axios.delete(`ints/${id}`);

            if (response.status === 200) {
                set((state) => ({
                    ints: state.ints.filter((item) => item._id !== id),
                }));
            } else {
                throw new Error('Ошибка удаления интеграции по ID');
            }
        } catch (error) {
            console.error('Ошибка удаления интеграции по ID:', error);
        }
    },
}));

export default useIntsStore;
