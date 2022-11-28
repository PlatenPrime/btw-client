import React, { useEffect, useRef, useState } from 'react';
import axios from "../../utils/axios"

const ArtFindPage = () => {

	const artInput = useRef("");


	const [dan, setDan] = useState("")




	useEffect(() => {
		console.log(dan)
	}, [dan])



	const fetchArt = async () => {

		try {

			const title = artInput.current.value;
		

			const data = await axios.get(`arts/title`, { title });

			console.log(data)
			setDan(data)
		} catch (error) {
			console.log(error)
		}

	}

	const handlerSubmit = () => {
		fetchArt();
	}





	return (


		<div>

			<input type="text" ref={artInput} />
			<button className='bg-blue-600 m-5 p-2 text-white rounded-sm' onClick={handlerSubmit} >Найти артикул</button>


		</div>
	);
};

export default ArtFindPage;