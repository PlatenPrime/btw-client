import { useState, useEffect } from 'react';


const useFetchRemains = () => {
	const [remains, setRemains] = useState(null);
	const [loadingRemains, setLoadingRemains] = useState(true);
	const [errorRemains, setErrorRemains] = useState(null);



	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("https://corsproxy.io/?https://sharik.ua/product_rests/1302-0065/");

				const responseText = await response.text();
				const lines = responseText.split('<pre>');
				const data = {};

				lines.forEach((line) => {
					const parts = line.split('=');
					if (parts.length === 2) {
						const key = parts[0].trim();
						const value = parseInt(parts[1], 10);
						data[key] = value;
					}
				});

				setRemains(data)
				// Сохраняем полученные данные в localStorage
				localStorage.setItem('remainsData', JSON.stringify(data))

			} catch (error) {
				setErrorRemains(error)
			} finally {
				setLoadingRemains(false)
			}
		};



		const updateData = () => {
			// Периодически обновляем данные из сервера, например, каждые 5 минут
			fetchData();
		};

		// Попытка получить данные из localStorage при загрузке
		const cachedData = localStorage.getItem('remainsData');
		if (cachedData) {
			setRemains(JSON.parse(cachedData));
			setLoadingRemains(false); // Устанавливаем loading в false, так как есть данные
		} else {
			fetchData();
		}

		// Запускаем периодическое обновление данных
		const updateInterval = setInterval(updateData, 300000); // 300000 миллисекунд (5 минут)

		return () => {
			// Очищаем интервал при размонтировании компонента
			clearInterval(updateInterval);
			// Очищаем данные из localStorage при размонтировании
			localStorage.removeItem('remainsData');
		};




	}, [])







	return { remains, loadingRemains, errorRemains };
};

export default useFetchRemains;
