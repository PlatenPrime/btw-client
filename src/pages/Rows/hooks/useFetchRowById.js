import { useEffect, useState } from 'react';


import {useRowStore} from '../stores/rowsStore';


const useFetchRow = (id) => {

    const [isRowLoading, setIsRowLoading] = useState(false);
    const { getRowById } = useRowStore();

    useEffect(() => {
        const fetchRow = async () => {
            try {
                setIsRowLoading(true);
                await getRowById(id);

            } catch (error) {
                console.log(error);
            } finally {
                setIsRowLoading(false);
            }
        };

        fetchRow();
        return () => {
            // Cleanup function if needed
        };

    }, [id, getRowById]);

    return { isRowLoading };
};

export default useFetchRow;
