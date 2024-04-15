import { create } from 'zustand';
import axios from '../../utils/axios';

const useInsFolderStore = create((set) => ({
  insFolder: null,
  insFolders: [],

  createInsFolder: async (insFolderData) => {
    try {
      const response = await axios.post('insfolders', insFolderData);

      if (response.status === 201) {
        const newInsFolder = response.data;
        set((state) => ({ insFolders: [newInsFolder, ...state.insFolders] }));
        return newInsFolder;
      } else {
        throw new Error('Ошибка создания папки инструкций');
      }
    } catch (error) {
      console.error('Ошибка создания папки инструкций:', error);
    }
  },

  getAllInsFolders: async () => {
    try {
      const response = await axios.get('insfolders');

      if (response.status === 200) {
        const data = response.data;
        set({ insFolders: data.insFolders });
        return data.insFolders;
      } else {
        throw new Error('Ошибка получения папок инструкций');
      }
    } catch (error) {
      console.error('Ошибка получения папок инструкций:', error);
    }
  },

  getInsFolderById: async (id) => {
    try {
      const response = await axios.get(`insfolders/${id}`);

      if (response.status === 200) {
        const insFolder = response.data;
        return insFolder;
      } else {
        throw new Error('Ошибка получения папки инструкций по ID');
      }
    } catch (error) {
      console.error('Ошибка получения папки инструкций по ID:', error);
    }
  },

  updateInsFolderById: async (id, updateData) => {
    try {
      const response = await axios.put(`insfolders/${id}`, updateData);

      if (response.status === 200) {
        const updatedInsFolder = response.data;
        set((state) => ({
          insFolders: state.insFolders.map((folder) =>
            folder._id === updatedInsFolder._id ? updatedInsFolder : folder
          ),
        }));
        return updatedInsFolder;
      } else {
        throw new Error('Ошибка обновления папки инструкций по ID');
      }
    } catch (error) {
      console.error('Ошибка обновления папки инструкций по ID:', error);
    }
  },

  deleteInsFolderById: async (id) => {
    try {
      const response = await axios.delete(`insfolders/${id}`);

      if (response.status === 200) {
        set((state) => ({
          insFolders: state.insFolders.filter((folder) => folder._id !== id),
        }));
      } else {
        throw new Error('Ошибка удаления папки инструкций по ID');
      }
    } catch (error) {
      console.error('Ошибка удаления папки инструкций по ID:', error);
    }
  },
}));

export default useInsFolderStore;
