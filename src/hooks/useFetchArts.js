import { useState, useEffect } from 'react';
import axios from '../utils/axios';

const useFetchArts = () => {
	const [artsDB, setArtsDB] = useState(null);
	const [loadingArtsDB, setLoadingArtsDB] = useState(true);
	const [errorArtsDB, setErrorArtsDB] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("arts");
				const newData = response.data.arts;
				setArtsDB(newData);
				// Сохраняем полученные данные в localStorage
				localStorage.setItem('artsData', JSON.stringify(newData));
			} catch (error) {
				setErrorArtsDB(error);
			} finally {
				setLoadingArtsDB(false);
			}
		};

		const updateData = () => {
			// Периодически обновляем данные из сервера, например, каждые 5 минут
			fetchData();
		};

		// Попытка получить данные из localStorage при загрузке
		const cachedData = localStorage.getItem('artsData');
		if (cachedData) {
			setArtsDB(JSON.parse(cachedData));
			setLoadingArtsDB(false); // Устанавливаем loading в false, так как есть данные
		} else {
			fetchData();
		}

		// Запускаем периодическое обновление данных
		const updateInterval = setInterval(updateData, 300000); // 300000 миллисекунд (5 минут)

		return () => {
			// Очищаем интервал при размонтировании компонента
			clearInterval(updateInterval);
			// Очищаем данные из localStorage при размонтировании
			localStorage.removeItem('artsData');
		};
	}, []);

	return { artsDB, loadingArtsDB, errorArtsDB };
};

export default useFetchArts;
