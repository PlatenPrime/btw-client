import { useState, useEffect } from 'react';

import useCompStore from '../stores/compStore';

const useFetchCompById = (id) => {

    const [isCompLoading, setIsCompLoading] = useState(true);
    const [error, setError] = useState(null);

    const { comp, compStamp, getCompById, getCompStampByArtikul } = useCompStore();




    useEffect(() => {
        const fetchComp = async () => {
            try {
                setIsCompLoading(true);
                const comp = await getCompById(id);
                if (comp) {
                    await getCompStampByArtikul(comp.artikul)
                }

            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setIsCompLoading(false);
                console.log(comp);
                console.log(compStamp);
            }
        };

        fetchComp();

    }, [getCompById, id, getCompStampByArtikul]);

    return { comp, compStamp, isCompLoading, error };
};

export default useFetchCompById;