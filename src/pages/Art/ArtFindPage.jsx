import React, { useEffect, useRef, useState } from 'react';
import axios from "../../utils/axios"

const ArtFindPage = () => {

	const artInput = useRef("");




	const [arts, setArts] = useState("")




	useEffect(() => {
		console.log(arts)
	}, [arts])



	const fetchArts = async () => {

		try {



			const { data } = await axios.get('arts');

			console.log(data)
			setArts(data.arts)
		} catch (error) {
			console.log(error)
		}

	}








	const handlerSubmit = () => {
		fetchArts();
	}




	return (


		<div>

			<input type="text" ref={artInput} />
			<button className='bg-blue-600 m-5 p-2 text-white rounded-sm' onClick={handlerSubmit} >Найти артикул</button>




		</div>
	);
};

export default ArtFindPage;