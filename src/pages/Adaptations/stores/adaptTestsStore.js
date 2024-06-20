import { create } from 'zustand';
import axios from '../../../utils/axios';

const useTestsStore = create((set) => ({
    tests: [],
    test: null,

    createTest: async (testData) => {
        try {
            const response = await axios.post('tests', testData);
            if (response.status === 201) {
                const newTest = response.data;
                set((state) => ({ tests: [newTest, ...state.tests] }));
                return newTest;
            } else {
                throw new Error('Ошибка создания теста');
            }
        } catch (error) {
            console.error('Ошибка создания теста:', error);
        }
    },

    getAllTests: async () => {
        try {
            const response = await axios.get('tests');
            if (response.status === 200) {
                const tests = response.data;
                set({ tests });
                return tests;
            } else {
                throw new Error('Ошибка получения тестов');
            }
        } catch (error) {
            console.error('Ошибка получения тестов:', error);
        }
    },

    getTestById: async (id) => {
        try {
            const response = await axios.get(`tests/${id}`);
            if (response.status === 200) {
                const test = response.data;
                set({ test });
                return test;
            } else {
                throw new Error('Ошибка получения теста по ID');
            }
        } catch (error) {
            console.error('Ошибка получения теста по ID:', error);
        }
    },

    updateTestById: async (id, updateData) => {
        try {
            const response = await axios.put(`tests/${id}`, updateData);
            if (response.status === 200) {
                const updatedTest = response.data;
                set((state) => ({
                    test: updatedTest,
                    tests: state.tests.map((item) =>
                        item._id === updatedTest._id ? updatedTest : item
                    ),
                }));
                return updatedTest;
            } else {
                throw new Error('Ошибка обновления теста по ID');
            }
        } catch (error) {
            console.error('Ошибка обновления теста по ID:', error);
        }
    },

    deleteTestById: async (id) => {
        try {
            const response = await axios.delete(`tests/${id}`);
            if (response.status === 200) {
                set((state) => ({
                    tests: state.tests.filter((item) => item._id !== id),
                }));
            } else {
                throw new Error('Ошибка удаления теста по ID');
            }
        } catch (error) {
            console.error('Ошибка удаления теста по ID:', error);
        }
    },

    deleteAllTests: async () => {
        try {
            const response = await axios.delete('tests');
            if (response.status === 200) {
                set({ tests: [] });
            } else {
                throw new Error('Ошибка удаления всех тестов');
            }
        } catch (error) {
            console.error('Ошибка удаления всех тестов:', error);
        }
    },
}));

export default useTestsStore;
