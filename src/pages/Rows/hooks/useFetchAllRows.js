import { useState, useEffect } from 'react';

import {useRowStore} from '../stores/rowsStore';

const useFetchAllRows = () => {
    const [isAllRowsLoading, setIsAllRowsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { rows, getAllRows } = useRowStore();


    useEffect(() => {
        const fetchAllRows = async () => {
            try {
                setIsAllRowsLoading(true);
                await getAllRows();

            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setIsAllRowsLoading(false);
            }
        };

        fetchAllRows();
    }, [getAllRows]);

    return {rows,  isAllRowsLoading, error };
};

export default useFetchAllRows;