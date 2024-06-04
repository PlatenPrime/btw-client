import { useEffect, useState } from 'react';


import  usePalletStore  from '../stores/palletsStore'; 
import usePosesStore from '../../Poses/stores/posesStore'



const useFetchPalletById = (id) => {

    const [isPalletLoading, setIsPalletLoading] = useState(false);

    const { getPalletById, pallet } = usePalletStore();
    const {getPalletPoses, poses} = usePosesStore()

    useEffect(() => {
        const fetchPallet = async () => {
            try {
                setIsPalletLoading(true);
                await getPalletById (id);
                await getPalletPoses(id)

            } catch (error) {
                console.log(error);
            } finally {
                setIsPalletLoading(false);
            }
        };

        fetchPallet();
        return () => {
            // Cleanup function if needed
        };

    }, [id, getPalletById, getPalletPoses]);

    return { isPalletLoading, pallet, poses  };
};

export default useFetchPalletById;
