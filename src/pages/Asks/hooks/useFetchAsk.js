import { useEffect, useState } from 'react';


import useAsksStore from '../stores/asksStore';
import { getArtDataBtrade } from '../../../utils/getArtDataBtrade';

const useFetchAsk = (id) => {

    const [isAskLoading, setIsAskLoading] = useState(false);
    const [ostatok, setOstatok] = useState(null);
    const [artPrice, setArtPrice] = useState(null);
    const { getAskById } = useAsksStore();

    useEffect(() => {
        const fetchAsks = async () => {
            try {
                setIsAskLoading(true);
            const ask =    await getAskById(id);
            const { quant: ostatokData, price } = await getArtDataBtrade(ask?.artikul);
            setOstatok(ostatokData);
            setArtPrice(price);
            } catch (error) {
                console.log(error);
            } finally {
                setIsAskLoading(false);
            }
        };

        fetchAsks();

        return () => {
            // Cleanup function if needed
        };

    }, [id, getAskById]); 

    return { isAskLoading, ostatok, artPrice };
};

export default useFetchAsk;
