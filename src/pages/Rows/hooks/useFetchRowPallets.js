import { useState, useEffect } from 'react';

import usePalletStore from '../../Pallets/stores/palletsStore';

const useFetchRowPallets = (id) => {

    const [isRowPalletsLoading, setIsRowPalletsLoading] = useState(true);

    const { getRowPallets } = usePalletStore();


    useEffect(() => {
        const fetchAllPallets = async () => {
            try {
                setIsRowPalletsLoading(true);
                await getRowPallets(id);

            } catch (error) {
                console.log(error);
            } finally {
                setIsRowPalletsLoading(false);
            }
        };

        fetchAllPallets();
    }, [getRowPallets, id]);

    return { isRowPalletsLoading };
};

export default useFetchRowPallets;