import { useState, useEffect } from 'react';
import useArtikulStore from '../stores/artsStore';
import { getArtDataBtrade } from "../../../utils/getArtDataBtrade";

const useFetchArtikul = (id) => {
    const [isLoadingArtikul, setIsLoadingArtikul] = useState(true);
    const [artikul, setArtikul] = useState(null);
    const [ostatok, setOstatok] = useState(null);
    const [artPrice, setArtPrice] = useState(null);

    const { getArtikulById } = useArtikulStore();


    useEffect(() => {
        const fetchArtikul = async () => {
            try {
                setIsLoadingArtikul(true);
                const artikulData = await getArtikulById(id);
                const { quant: ostatokData, price } = await getArtDataBtrade(artikulData?.artikul);
                setArtikul(artikulData);
                setOstatok(ostatokData);
                setArtPrice(price);

            } catch (error) {
                console.log(error);
            } finally {
                setIsLoadingArtikul(false);
            }
        };

        fetchArtikul();
    }, [id, getArtikulById]);

    return { isLoadingArtikul, artikul, ostatok, artPrice };
};

export default useFetchArtikul;
