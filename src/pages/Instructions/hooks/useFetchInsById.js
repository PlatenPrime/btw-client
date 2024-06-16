import { useState, useEffect } from 'react';

import useInsStore from '../stores/insStore';
import useAuthStore from '../../Auth/authStore';

const useFetchInsById = (id) => {

    const [isInsLoading, setIsInsLoading] = useState(true);
    const [author, setAuthor] = useState(null);
    const [error, setError] = useState(null);

    const { instruction, getInstructionById } = useInsStore();
    const { getUserById } = useAuthStore();



    useEffect(() => {
        const fetchInsById = async () => {
            try {
                setIsInsLoading(true);
                const fetchedInstruction = await getInstructionById(id);
                if (fetchedInstruction?.author) {
                    const fetchedAuthor = await getUserById(fetchedInstruction?.author);
                    setAuthor(fetchedAuthor);
                }

                console.log(fetchedInstruction);
                console.log(fetchedInstruction?.author);

                
                
                

            } catch (error) {
                console.log(error);
                setError(error.message);
            } finally {
                setIsInsLoading(false);
            }
        };

        fetchInsById();

    }, [getInstructionById, getUserById, id]);

    return { instruction, isInsLoading, error, author };
};

export default useFetchInsById;