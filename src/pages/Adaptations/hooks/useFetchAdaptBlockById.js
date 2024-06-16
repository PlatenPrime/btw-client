import { useState, useEffect } from 'react';
import useAdaptBlocksStore from '../stores/adaptBlocksStore';
import useInsStore from '../../Instructions/stores/insStore';

const useFetchAdaptBlockById = (id) => {

    const [isAdaptBlockLoading, setIsAdaptBlockLoading] = useState(true);
    const [error, setError] = useState(null);

  
    const { adaptBlock, getAdaptBlockById } = useAdaptBlocksStore();
    const { instruction, getInstructionById } = useInsStore();

    useEffect(() => {
        const fetchAdaptBlockById= async () => {
            try {
                setIsAdaptBlockLoading(true);
              const block =  await getAdaptBlockById(id);

                if (block) {
                    await getInstructionById(block.insId);
                }
         
            } catch (error) {
                console.log(error);
                setError(error.message);
            } finally {
                setIsAdaptBlockLoading(false);
            }
        };
        fetchAdaptBlockById();

    }, [getAdaptBlockById, id]);

    return {  adaptBlock, instruction, isAdaptBlockLoading, error };
};

export default useFetchAdaptBlockById;