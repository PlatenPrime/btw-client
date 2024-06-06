import { useState, useEffect } from 'react';

import useInsStore from '../stores/insStore';

const useFetchAllIns = () => {

    const [isAllInsLoading, setIsAllInsFoldersLoading] = useState(true);

    const { instructions, getAllInstructions } = useInsStore();


    useEffect(() => {
        const fetchAllInsFolders = async () => {
            try {
                setIsAllInsFoldersLoading(true);
                await getAllInstructions();

            } catch (error) {
                console.log(error);
            } finally {
                setIsAllInsFoldersLoading(false);
            }
        };

        fetchAllInsFolders();

    }, [getAllInstructions]);

    return { instructions, isAllInsLoading };
};

export default useFetchAllIns;