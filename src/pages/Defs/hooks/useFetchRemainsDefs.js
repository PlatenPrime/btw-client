




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
                const response = await axios.get("defs/remains");
                console.log(response.data)
                setRemainsDefs(response?.data);

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