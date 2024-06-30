import { useState, useEffect } from 'react';

import useCompStore from '../stores/compStore';

const useFetchAllComps = () => {

    const [isAllCompsLoading, setIsAllCompsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { comps, getAllComps } = useCompStore();




    useEffect(() => {
        const fetchAllComps = async () => {
            try {
                setIsAllCompsLoading(true);
                await getAllComps();

            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setIsAllCompsLoading(false);
            }
        };

        fetchAllComps();

    }, [getAllComps]);

    return { comps, isAllCompsLoading, error };
};

export default useFetchAllComps;