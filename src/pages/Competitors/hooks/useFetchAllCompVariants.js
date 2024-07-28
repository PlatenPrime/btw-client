import { useState, useEffect } from 'react';

import useCompStore from '../stores/compStore';

const useFetchAllCompVariants = () => {

    const [isAllCompVariantsLoading, setIsAllCompVariantsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { compVariants, getAllCompVariants } = useCompStore();




    useEffect(() => {
        const fetchAllCompVariants = async () => {
            try {
                setIsAllCompVariantsLoading(true);
                await getAllCompVariants();

            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setIsAllCompVariantsLoading(false);
            }
        };

        fetchAllCompVariants();

    }, [getAllCompVariants]);

    return { compVariants, isAllCompVariantsLoading, error };
};

export default useFetchAllCompVariants;