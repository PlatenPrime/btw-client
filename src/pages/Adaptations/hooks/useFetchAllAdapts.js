import { useState, useEffect } from 'react';

import  useAdaptsStore  from '../stores/adaptsStore';

const useFetchAllAdapts = () => {

    const [isLoadingAllAdapts, setIsLoadingAllAdapts] = useState(true);

    const { adapts, getAllAdapts } = useAdaptsStore();


    useEffect(() => {
        const fetchAllAdapts = async () => {
            try {
                setIsLoadingAllAdapts(true);
                await getAllAdapts();

            } catch (error) {
                console.log(error);
            } finally {
                setIsLoadingAllAdapts(false);
            }
        };

        fetchAllAdapts();
    }, [getAllAdapts]);

    return { adapts, isLoadingAllAdapts };
};

export default useFetchAllAdapts;