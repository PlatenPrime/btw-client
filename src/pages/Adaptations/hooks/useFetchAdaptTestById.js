import { useState, useEffect } from 'react';
import useAdaptTestsStore from '../stores/adaptTestsStore';
import useAdaptsStore from '../stores/adaptsStore';


const useFetchAdaptTestById = (id) => {

    const [isAdaptTestLoading, setIsAdaptTestLoading] = useState(true);
    const [error, setError] = useState(null);


    const { test, getTestById } = useAdaptTestsStore();
    const {adapt, getAdaptById} = useAdaptsStore();


    useEffect(() => {
        const fetchAdaptTestById = async () => {
            try {
                setIsAdaptTestLoading(true);
             const test =   await getTestById(id);

             if(test) {
                 getAdaptById(test.adaptId)
             }

            } catch (error) {
                console.log(error);
                setError(error.message);
            } finally {
                setIsAdaptTestLoading(false);
            }
        };
        fetchAdaptTestById();

    }, [getTestById, id]);

    return { test, adapt, isAdaptTestLoading, error,  };
};

export default useFetchAdaptTestById;