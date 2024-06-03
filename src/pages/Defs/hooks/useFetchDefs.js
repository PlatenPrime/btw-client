


import { useState, useEffect } from 'react';
import axios from '../../../utils/axios'
import { formatDateToUkrainian } from '../../../utils/groupByDate';


const useFetchDefs = () => {
    const [defs, setDefs] = useState(null);
    const [isDefsLoading, setIsDefsLoading] = useState(true);
    const [errorDefs, setErrorDefs] = useState(null);
    const [time, setTime] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsDefsLoading(true);
                const response = await axios.get("defs/latest");
                console.log(response.data)
                setDefs(response?.data[0]?.items);
                if (response?.data[0]?.createdAt) {
                    setTime(   formatDateToUkrainian(response?.data[0]?.createdAt));
                }
            } catch (error) {
                setErrorDefs(error);
            } finally {
                setIsDefsLoading(false);
            }
        };

        fetchData();
    }, []);


    

    return { defs, time, isDefsLoading, errorDefs };
};

export default useFetchDefs;