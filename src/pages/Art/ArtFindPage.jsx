import React, { useEffect, useRef, useState } from 'react';
import axios from "../../utils/axios"

const ArtFindPage = () => {

	const artInput = useRef("");

	const [article, setArticle] = useState("")

	useEffect(() => {

		console.log(article)

	}, [article])




	const fetchArt = async () => {

		try {

			const title = artInput;
			const { art } = await axios.get(`arts/title`, { title });
			setArticle(art)
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
			<button onClick={handlerSubmit} >Найти артикул</button>

		</div>
	);
};

export default ArtFindPage;