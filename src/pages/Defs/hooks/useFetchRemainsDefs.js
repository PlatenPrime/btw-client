




import { useState, useEffect } from 'react';
import axios from '../../../utils/axios'


const useFetchRemainsDefs = () => {
    const [remainsDefs, setRemainsDefs] = useState(null);
    const [isRemainsDefsLoading, setIsRemainsDefsLoading] = useState(true);
    const [errorRemainsDefs, setErrorRemainsDefs] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsRemainsDefsLoading(true);

                const today = new Date().toISOString().split('T')[0];
                const cachedData = JSON.parse(localStorage.getItem('remainsDefs'));

                if (cachedData && cachedData.date === today) {
                    setRemainsDefs(cachedData.data);
                } else {
                    const response = await axios.get("defs/remains", {
                        headers: {
                            'Cache-Control': 'no-cache'
                        }
                    });

                    const newCache = {
                        date: today,
                        data: response?.data
                    };

                    localStorage.setItem('remainsDefs', JSON.stringify(newCache));
                    setRemainsDefs(response?.data);
                }
            } catch (error) {
                setErrorRemainsDefs(error);
            } finally {
                setIsRemainsDefsLoading(false);
            }
        };

        fetchData();
    }, []);




    return { remainsDefs, isRemainsDefsLoading, errorRemainsDefs };
};

export default useFetchRemainsDefs;