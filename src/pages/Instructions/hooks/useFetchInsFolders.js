import { useState, useEffect } from 'react';

import useInsFoldersStore from '../stores/insFoldersStore';

const useFetchAllInsFolders = () => {

    const [isAllInsFoldersLoading, setIsAllInsFoldersLoading] = useState(true);

    const { insFolders, getAllInsFolders } = useInsFoldersStore();


    useEffect(() => {
        const fetchAllInsFolders = async () => {
            try {
                setIsAllInsFoldersLoading(true);
                await getAllInsFolders();

            } catch (error) {
                console.log(error);
            } finally {
                setIsAllInsFoldersLoading(false);
            }
        };

        fetchAllInsFolders();

    }, [getAllInsFolders]);

    return { insFolders, isAllInsFoldersLoading };
};

export default useFetchAllInsFolders;