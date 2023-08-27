

import { useState, useEffect } from 'react';
import axios from '../utils/axios'


const useFetchArts = () => {
	const [artsDB, setArtsDB] = useState(null);
	const [loadingArtsDB, setLoadingArtsDB] = useState(true);
	const [errorArtsDB, setErrorArtsDB] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("arts");
				setArtsDB(response.data.arts);
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