import {create }from 'zustand';
import axios from '../../utils/axios';

const useBoxStore = create((set) => ({
  boxes: [],

  createBox: async (palletId, boxData) => {
    try {
      const response = await axios.post('boxes', { palletId, ...boxData });
      set((state) => ({
        boxes: [...state.boxes, response.data],
      }));
      return response.data;
    } catch (error) {
      console.error('Ошибка при создании коробки:', error);
      throw error;
    }
  },

  getAllBoxes: async () => {
    try {
      const response = await axios.get('boxes');
      set({ boxes: response.data.boxes });
    } catch (error) {
      console.error('Ошибка при получении всех коробок:', error);
    }
  },

  getBoxById: async (id) => {
    try {
      const response = await axios.get(`boxes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении коробки по ID:', error);
      throw error;
    }
  },

  updateBoxById: async (id, updatedData) => {
    try {
      const response = await axios.put(`boxes/${id}`, updatedData);
      set((state) => ({
        boxes: state.boxes.map((box) => (box._id === id ? response.data : box)),
      }));
      return response.data;
    } catch (error) {
      console.error('Ошибка при обновлении коробки:', error);
      throw error;
    }
  },

  deleteBoxById: async (id) => {
    try {
      const response = await axios.delete(`boxes/${id}`);
      set((state) => ({
        boxes: state.boxes.filter((box) => box._id !== id),
      }));
      return response.data;
    } catch (error) {
      console.error('Ошибка при удалении коробки:', error);
      throw error;
    }
  },
}));

export default useBoxStore;
