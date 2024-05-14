import { useState, useEffect } from 'react';

import usePalletStore from '../stores/palletsStore';

const useFetchAllPallets = () => {
    const [isLoadingAllPallets, setIsLoadingAllPallets] = useState(true);

    const { getAllPallets } = usePalletStore();


    useEffect(() => {
        const fetchAllPallets = async () => {
            try {
                setIsLoadingAllPallets(true);
                await getAllPallets();

            } catch (error) {
                console.log(error);
            } finally {
                setIsLoadingAllPallets(false);
            }
        };

        fetchAllPallets();
    }, [getAllPallets]);

    return { isLoadingAllPallets };
};

export default useFetchAllPallets;