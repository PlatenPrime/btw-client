import { useState, useEffect } from 'react';
import axios from '../utils/axios'


const useFetchComps = () => {
	const [compsDB, setCompsDB] = useState(null);
	const [loadingCompsDB, setLoadingCompsDB] = useState(true);
	const [errorCompsDB, setErrorCompsDB] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("comps");
				setCompsDB(response.data);
			} catch (error) {
				setErrorCompsDB(error);
			} finally {
				setLoadingCompsDB(false);
			}
		};

		fetchData();
	}, []);

	return { compsDB, loadingCompsDB, errorCompsDB };
};

export default useFetchComps;