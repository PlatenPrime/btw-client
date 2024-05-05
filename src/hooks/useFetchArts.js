import { useState, useEffect } from 'react';
import axios from '../utils/axios';

const useFetchArts = () => {
	const [artsDB, setArtsDB] = useState(null);
	const [loadingArtsDB, setLoadingArtsDB] = useState(true);
	const [errorArtsDB, setErrorArtsDB] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoadingArtsDB(true);

				const artsFromLSString = localStorage.getItem("artsFromLS");

				if (!artsFromLSString) {
					const response = await axios.get("arts");
					const arts = response.data.arts;
					if (!arts) throw new Error('arts not got');

					const currentTime = new Date().getTime();
					localStorage.setItem(
						"artsFromLS",
						JSON.stringify({
							artsDB: arts,
							saveTime: currentTime,
						})
					);

					setArtsDB(arts);

				} else {
					const artsFromLS = JSON.parse(artsFromLSString);
					const currentTime = new Date().getTime();


					if (currentTime - artsFromLS.saveTime < 5 * 60 * 1000) {
						setArtsDB(artsFromLS.artsDB);
					} else {

						const response = await axios.get("arts");
						const arts = response.data.arts;
						if (!arts) throw new Error('arts not got');
						const currentTime = new Date().getTime();
						localStorage.setItem(
							"artsFromLS",
							JSON.stringify({
								artsDB: arts,
								saveTime: currentTime,
							})
						);

						setArtsDB(arts);
					}
				}


			} catch (error) {
				setErrorArtsDB(error);
			} finally {
				setLoadingArtsDB(false);
			}
		};

		fetchData();
	}, []);

	return { artsDB, loadingArtsDB, errorArtsDB };
};

export default useFetchArts;
