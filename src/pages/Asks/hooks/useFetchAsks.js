import { useEffect, useState } from 'react';


import useAsksStore from '../stores/asksStore';

const useFetchAsks = () => {

    const [isAsksLoading, setIsAsksLoading] = useState(false);
    const { asks, getAllAsks } = useAsksStore();

    useEffect(() => {
        const fetchAsks = async () => {
            try {
                setIsAsksLoading(true);
                await getAllAsks();

            } catch (error) {
                console.log(error);
            } finally {
                setIsAsksLoading(false);
            }
        };

        fetchAsks();

        return () => {
            // Cleanup function if needed
        };
    }, [getAllAsks]); // Empty dependency array to run effect only once

    return { asks, isAsksLoading };
};

export default useFetchAsks;
