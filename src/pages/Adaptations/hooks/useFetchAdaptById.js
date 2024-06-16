import { useState, useEffect } from 'react';
import useAdaptsStore from '../stores/adaptsStore';
import useAdaptBlocksStore from '../stores/adaptBlocksStore';

const useFetchAdaptById = (id) => {

    const [isAdaptLoading, setIsAdaptLoading] = useState(true);
    const [error, setError] = useState(null);

    const { adapt, getAdaptById } = useAdaptsStore();
    const { oneAdaptBlocks, getAdaptBlocksByAdaptId } = useAdaptBlocksStore();

    useEffect(() => {
        const fetchAdaptById = async () => {
            try {
                setIsAdaptLoading(true);
                await getAdaptById(id);
                await getAdaptBlocksByAdaptId(id);
            } catch (error) {
                console.log(error);
                setError(error.message);
            } finally {
                setIsAdaptLoading(false);
            }
        };
        fetchAdaptById();

    }, [getAdaptById, getAdaptBlocksByAdaptId, id]);

    return { adapt, oneAdaptBlocks, isAdaptLoading, error };
};

export default useFetchAdaptById;