import { useEffect, useState } from 'react';


import {useRowStore} from '../stores/rowsStore';


const useFetchRow = (id) => {

    const [isRowLoading, setIsRowLoading] = useState(false);
    const [error, setError] = useState(null);
    const {row, getRowById } = useRowStore();

    useEffect(() => {
        const fetchRow = async () => {
            try {
                setIsRowLoading(true);
                await getRowById(id);

            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setIsRowLoading(false);
            }
        };

        fetchRow();
       

    }, [id, getRowById]);

    return {row, error, isRowLoading };
};

export default useFetchRow;
