import { useState, useEffect } from 'react';
import axios from '../utils/axios'


const useFetchLogs = () => {
	const [logsDB, setLogsDB] = useState(null);
	const [loadingLogsDB, setLoadingLogsDB] = useState(true);
	const [errorLogsDB, setErrorLogsDB] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("logs");
				console.log(response.data)
				setLogsDB(response.data);
			} catch (error) {
				setErrorLogsDB(error);
			} finally {
				setLoadingLogsDB(false);
			}
		};

		fetchData();
	}, []);

	return { logsDB, loadingLogsDB, errorLogsDB };
};

export default useFetchLogs;