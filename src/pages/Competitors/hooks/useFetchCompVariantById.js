import { useState, useEffect } from 'react';

import useCompStore from '../stores/compStore';

const useFetchCompVariantById = (id) => {

    const [isCompVariantLoading, setIsCompVariantLoading] = useState(true);
    const [error, setError] = useState(null);

    const { compVariant, compStamp, getCompVariantById, getCompStampByArtikul } = useCompStore();




    useEffect(() => {
        const fetchCompVariant = async () => {
            try {
                setIsCompVariantLoading(true);
                const compVariant = await getCompVariantById(id);
                if (compVariant?.connect) {
                    await getCompStampByArtikul(compVariant.connect)
                } else if (compVariant) {
                    await getCompStampByArtikul(compVariant.artikul)
                }

            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setIsCompVariantLoading(false);

            }
        };

        fetchCompVariant();

    }, [getCompVariantById, id, getCompStampByArtikul]);

    return { compVariant, compStamp, isCompVariantLoading, error };
};

export default useFetchCompVariantById;