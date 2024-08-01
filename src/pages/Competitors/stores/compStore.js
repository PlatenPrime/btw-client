import { create } from 'zustand';
import axios from '../../../utils/axios';

const useCompStore = create((set) => ({
    comps: [],
    comp: null,
    compStamps: [],
    compStamp: null,
    compVariants: [],
    compVariant: null,

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


    updateCompById: async (id, compData) => {
        try {
            const response = await axios.put(`comps/${id}`, compData);
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
                throw new Error('Ошибка обновления Comp');
            }
        } catch (error) {
            console.error('Ошибка обновления Comp:', error);
        }
    },

    updateOrCreateComp: async (compData) => {
        try {
            const response = await axios.post('comps', compData);
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

    getUpdatedCompByArtikul: async (artikul) => {
        try {
            const response = await axios.get(`comps/updated/${artikul}`);
            if (response.status === 200) {
                const updatedComp = response.data;
                set((state) => ({
                    comps: state.comps.map((c) =>
                        c.artikul === artikul ? updatedComp : c
                    ),
                }));
                set({ comp: updatedComp });
                return updatedComp;
            } else {
                throw new Error('Ошибка получения обновленного Comp по артикулу');
            }
        } catch (error) {
            console.error('Ошибка получения обновленного Comp по артикулу:', error);
        }
    },

    getUpdatedAllComps: async () => {
        try {
            const response = await axios.get('comps/updated');
            if (response.status === 200) {
                const updatedComps = response.data;
                set({ comps: updatedComps });
                return updatedComps;
            } else {
                throw new Error('Ошибка получения всех обновленных Comps');
            }
        } catch (error) {
            console.error('Ошибка получения всех обновленных Comps:', error);
        }
    },


    getCompStampByArtikul: async (artikul) => {
        try {
            const response = await axios.get(`comps/compStamp/${artikul}`);
            if (response.status === 200) {
                const compStamp = response.data;
                set({ compStamp });
                return compStamp;
            } else {
                throw new Error('Ошибка получения CompStamp по артикулу');
            }
        } catch (error) {
            console.error('Ошибка получения CompStamp по артикулу:', error);
        }
    },

    getAllCompStamps: async () => {
        try {
            const response = await axios.get('compStamp');
            if (response.status === 200) {
                const data = response.data;
                set({ compStamps: data });
                return data;
            } else {
                throw new Error('Ошибка получения всех CompStamps');
            }
        } catch (error) {
            console.error('Ошибка получения всех CompStamps:', error);
        }
    } ,






    createCompVariant: async (variantData) => {
        try {
            const response = await axios.post('comps/variant', variantData);
            if (response.status === 201) {
                const newVariant = response.data;
                set((state) => ({ compVariants: [newVariant, ...state.compVariants] }));
                return newVariant;
            } else {
                throw new Error('Ошибка создания Comp Variant');
            }
        } catch (error) {
            console.error('Ошибка создания Comp Variant:', error);
        }
    },

    getAllCompVariants: async () => {
        try {
            const response = await axios.get('comps/variant');
            if (response.status === 200) {
                const data = response.data;
                set({ compVariants: data });
                return data;
            } else {
                throw new Error('Ошибка получения всех Comp Variants');
            }
        } catch (error) {
            console.error('Ошибка получения всех Comp Variants:', error);
        }
    },

    getCompVariantById: async (id) => {
        try {
            const response = await axios.get(`comps/variant/${id}`);
            if (response.status === 200) {
                const variant = response.data;
                set({ compVariant: variant });
                return variant;
            } else {
                throw new Error('Ошибка получения Comp Variant по ID');
            }
        } catch (error) {
            console.error('Ошибка получения Comp Variant по ID:', error);
        }
    },


    getUpdatedCompVariantByArtikul: async (artikul) => {
        try {
            const response = await axios.get(`comps/updatedvariant/${artikul}`);
            if (response.status === 200) {
                const updatedCompVariant = response.data;
                set((state) => ({
                    compVariants: state.compVariants.map((v) =>
                        v.artikul === artikul ? updatedCompVariant : v
                    ),
                }));
                set({ compVariant: updatedCompVariant });
                return updatedCompVariant;
            } else {
                throw new Error('Ошибка получения обновленного варианта по артикулу');
            }
        } catch (error) {
            console.error('Ошибка получения обновленного варианта по артикулу:', error);
        }
    },



    updateCompVariantById: async (id, variantData) => {
        try {
            const response = await axios.put(`comps/variant/${id}`, variantData);
            if (response.status === 200) {
                const updatedVariant = response.data;
                set((state) => ({
                    compVariants: state.compVariants.map((v) =>
                        v._id === updatedVariant._id ? updatedVariant : v
                    ),
                }));
                set({ compVariant: updatedVariant });
                return updatedVariant;
            } else {
                throw new Error('Ошибка обновления Comp Variant');
            }
        } catch (error) {
            console.error('Ошибка обновления Comp Variant:', error);
        }
    },

    deleteCompVariantById: async (id) => {
        try {
            const response = await axios.delete(`comps/variant/${id}`);
            if (response.status === 200) {
                set((state) => ({
                    compVariants: state.compVariants.filter((v) => v._id !== id),
                }));
            } else {
                throw new Error('Ошибка удаления Comp Variant по ID');
            }
        } catch (error) {
            console.error('Ошибка удаления Comp Variant по ID:', error);
        }
    },


















}));

export default useCompStore;
