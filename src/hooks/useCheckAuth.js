import { useNavigate } from 'react-router-dom';
import useAuthStore from '../pages/Auth/authStore';
import React, { useEffect } from 'react';



const useCheckAuth = () => {

	const navigate = useNavigate()

	const { getMe, setUser } = useAuthStore();


	useEffect(() => {


		const checkAuth = async () => {
			try {

				const user = JSON.parse(localStorage.getItem('user'))



				if (!user) {
					navigate('/login')
				}

				setUser(user)

				await getMe();

			} catch (error) {
				// Если произошла ошибка или пользователь не аутентифицирован,
				// перенаправляем на страницу входа
				navigate('/login');
			}
		};
		checkAuth();


	}, [getMe, navigate]);

}



export default useCheckAuth;