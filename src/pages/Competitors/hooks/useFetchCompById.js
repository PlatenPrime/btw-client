import { useState, useEffect } from 'react';

import useCompStore from '../stores/compStore';

const useFetchCompById = (id) => {

    const [isCompLoading, setIsCompLoading] = useState(true);
    const [error, setError] = useState(null);

    const { comp, getCompById } = useCompStore();




    useEffect(() => {
        const fetchComp = async () => {
            try {
                setIsCompLoading(true);
                await getCompById(id);

            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setIsCompLoading(false);
            }
        };

        fetchComp();

    }, [getCompById, id]);

    return { comp, isCompLoading, error };
};

export default useFetchCompById;