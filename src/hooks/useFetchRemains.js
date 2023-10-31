import { useState, useEffect } from 'react';


const useFetchRemains = () => {
	const [remains, setRemains] = useState(null);




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


			} catch (error) {
				console.error('Ошибка:', error)
			} finally {

			}
		};

		fetchData()





	}, [])







	return { remains };
};

export default useFetchRemains;
