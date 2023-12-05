import { useNavigate } from 'react-router-dom';
import useAuthStore from '../pages/Auth/authStore';
import React, { useEffect } from 'react';



const useCheckAuth = () => {

	const navigate = useNavigate()

	const { getMe, user } = useAuthStore();


	useEffect(() => {


		const checkAuth = async () => {
			try {

				if (!user) {
					navigate('/login')
				}

				await getMe();

			} catch (error) {
				// Если произошла ошибка или пользователь не аутентифицирован,
				// перенаправляем на страницу входа
				navigate('/login');
			}
		};
		checkAuth();


	}, [getMe, navigate, user]);

}



export default useCheckAuth;