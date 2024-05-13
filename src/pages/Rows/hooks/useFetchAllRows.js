import { useState, useEffect } from 'react';

import {useRowStore} from '../stores/rowsStore';

const useFetchAllRows = () => {
    const [isLoadingAllRows, setIsLoadingAllRows] = useState(true);

    const { getAllRows } = useRowStore();


    useEffect(() => {
        const fetchAllRows = async () => {
            try {
                setIsLoadingAllRows(true);
                await getAllRows();

            } catch (error) {
                console.log(error);
            } finally {
                setIsLoadingAllRows(false);
            }
        };

        fetchAllRows();
    }, [getAllRows]);

    return { isLoadingAllRows };
};

export default useFetchAllRows;