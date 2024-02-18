import { useState, useEffect } from 'react';
import axios from "../utils/axios";


const useFetchRemains = () => {

	const [remains, setRemains] = useState(null);
	const [isLoadingRemains, setIsLoadingRemains] = useState(false);
	const [errorRemains, setErrorRemains] = useState(null);

	useEffect(() => {
		const fetchRemains = async () => {
			try {
				setIsLoadingRemains(true);

				const remainsFromLSString = localStorage.getItem("remainsFromLS");

				if (!remainsFromLSString) {
					const link = `https://sharik.ua/product_rests/1302-0065/`;
					const response = await axios.get(`comps/linkpage/${encodeURIComponent(link)}`);
					const responseText = response?.data?.html;

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

					const currentTime = new Date().getTime();
					localStorage.setItem(
						"remainsFromLS",
						JSON.stringify({
							remains: data,
							saveTime: currentTime,
						})
					);

					setRemains(data);
				} else {
					const remainsFromLS = JSON.parse(remainsFromLSString);
					const currentTime = new Date().getTime();

					if (currentTime - remainsFromLS.saveTime < 5 * 60 * 1000) {
						setRemains(remainsFromLS.remains);
					} else {
						const link = `https://sharik.ua/product_rests/1302-0065/`;
						const response = await axios.get(`comps/linkpage/${encodeURIComponent(link)}`);
						const responseText = response?.data?.html;

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

						const currentTime = new Date().getTime();
						localStorage.setItem(
							"remainsFromLS",
							JSON.stringify({
								remains: data,
								saveTime: currentTime,
							})
						);

						setRemains(data);
					}
				}
			} catch (error) {
				setErrorRemains(error);
			} finally {
				setIsLoadingRemains(false);
			}
		};

		fetchRemains();
	}, []);

	return { remains, isLoadingRemains, errorRemains };
};


export default useFetchRemains;
