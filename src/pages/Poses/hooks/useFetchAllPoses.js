import { useState, useEffect } from 'react';

import usePosesStore from '../stores/posesStore';

const useFetchAllPoses = () => {

    const [isAllPosesLoading, setIsAllPosesLoading] = useState(true);

    const {allPoses, getAllPoses } = usePosesStore();


    useEffect(() => {
        const fetchAllPoses = async () => {
            try {
                setIsAllPosesLoading(true);
                await getAllPoses();

            } catch (error) {
                console.log(error);
            } finally {
                setIsAllPosesLoading(false);
            }
        };
        fetchAllPoses();
    }, [getAllPoses]);

    return { allPoses, isAllPosesLoading };
};

export default useFetchAllPoses;