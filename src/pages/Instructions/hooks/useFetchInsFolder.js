import { useState, useEffect } from 'react';

import useInsFoldersStore from '../stores/insFoldersStore';
import useInsStore from '../stores/insStore';

const useFetchInsFolder = (id) => {

    const [isInsFolderLoading, setIsInsFolderLoading] = useState(true);

    const { insFolder, getInsFolderById } = useInsFoldersStore();
    const { folderInstructions, getFolderInstructions } = useInsStore();


    useEffect(() => {
        const fetchInsFolder = async () => {
            try {
                setIsInsFolderLoading(true);
                await getInsFolderById(id);
                await getFolderInstructions(id);


            } catch (error) {
                console.log(error);
            } finally {
                setIsInsFolderLoading(false);
            }
        };

        fetchInsFolder();

    }, [getInsFolderById, getFolderInstructions, id]);

    return { insFolder, folderInstructions, isInsFolderLoading };
};

export default useFetchInsFolder;