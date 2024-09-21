import { useState, useEffect } from 'react';

import useCompStore from '../stores/compStore';

const useFetchAllCompStamps = () => {

    const [isAllCompStampsLoading, setIsAllCompStampsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { compStamps, getAllCompStamps } = useCompStore();




    useEffect(() => {
        const fetchAllCompStamps = async () => {
            try {
                setIsAllCompStampsLoading(true);
                await getAllCompStamps();

            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setIsAllCompStampsLoading(false);
            }
        };

        fetchAllCompStamps();

    }, [getAllCompStamps]);

    return { compStamps, isAllCompStampsLoading, error };
};

export default useFetchAllCompStamps;


