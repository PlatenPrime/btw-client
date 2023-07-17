

import { useState, useEffect } from 'react';
import axios from '../utils/axios'

const useFetchArts = (url) => {
  const [artsDB, setArtsDB] = useState([]);
  const [loadingArtsDB, setLoadingArtsDB] = useState(true);
  const [errorArtsDB, setErrorArtsDB] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setArtsDB(response.data.arts);
	
      } catch (error) {
        setErrorArtsDB(error);
      } finally {
        setLoadingArtsDB(false);
      }
    };

    fetchData();
  }, [url]);

  return { artsDB, loadingArtsDB, errorArtsDB };
};

export default useFetchArts;