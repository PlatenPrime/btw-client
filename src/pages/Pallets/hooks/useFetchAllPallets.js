import { useState, useEffect } from 'react';

import usePalletStore from '../../Stocks/stores/palletsStore';

const useFetchAllPallets = () => {
    const [isLoadingPallets, setIsLoadingAllPallets] = useState(true);

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

    return { isLoadingPallets };
};

export default useFetchAllPallets;