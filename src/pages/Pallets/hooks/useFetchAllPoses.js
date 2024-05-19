import { useState, useEffect } from 'react';

import usePosesStore from '../../Stocks/stores/posesStore';

const useFetchAllPoses = () => {

    const [isAllPosesLoading, setIsAllPosesLoading] = useState(true);

    const { getAllPoses } = usePosesStore();


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

    return { isAllPosesLoading };
};

export default useFetchAllPoses;