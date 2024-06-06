import { useState, useEffect } from 'react';

import useAuthStore from '../authStore';

const useFetchUsers = () => {
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);

    const { users, user, getUsers } = useAuthStore();


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoadingUsers(true);
                await getUsers();

            } catch (error) {
                console.log(error);
            } finally {
                setIsLoadingUsers(false);
            }
        };

        fetchUsers();
    }, [getUsers]);

    return {users, user, isLoadingUsers };
};

export default useFetchUsers;