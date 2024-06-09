import { useState, useEffect } from 'react';

import useInsStore from '../stores/insStore';

const useFetchAllIns = () => {

    const [isAllInsLoading, setIsAllInsLoading] = useState(true);

    const { instructions, getAllInstructions } = useInsStore();


    useEffect(() => {
        const fetchAllIns = async () => {
            try {
                setIsAllInsLoading(true);
                await getAllInstructions();

            } catch (error) {
                console.log(error);
            } finally {
                setIsAllInsLoading(false);
            }
        };

        fetchAllIns();

    }, [getAllInstructions]);

    return { instructions, isAllInsLoading };
};

export default useFetchAllIns;