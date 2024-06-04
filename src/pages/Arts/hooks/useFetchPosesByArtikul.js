import { useState, useEffect } from 'react';
import usePosesStore from '../../Poses/stores/posesStore';

const useFetchPosesByArtikul = (artikul) => {
    const [isLoadingPoses, setIsLoadingPoses] = useState(true);




    const { getPosesByArtikul } = usePosesStore();

    useEffect(() => {
        const fetchPosesByArtikul = async () => {
            try {
                setIsLoadingPoses(true);
                const posesData = await getPosesByArtikul(artikul?.artikul);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoadingPoses(false);
            }
        };

        fetchPosesByArtikul();
    }, [artikul, getPosesByArtikul]);

    return { isLoadingPoses };
};

export default useFetchPosesByArtikul;
