import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CardBTW from '../../components/UI/CardBTW';
import PhotoArtBTW from '../../components/UI/PhotoArtBTW';
import { checkIsAuth } from '../../redux/features/auth/authSlice';
import axios from "../../utils/axios";

const ArtFindPage = () => {

	const navigate = useNavigate()
	const isAuth = useSelector(checkIsAuth)


	/* useLayoutEffect(() => {

		if (!isAuth) navigate('/login')
	}, [isAuth, navigate]) */

	const [arts, setArts] = useState("");


	const artInput = useRef("");

	const [artItem, setArtItem] = useState('')
	const [artCardDisplay, setArtCartDisplay] = useState(false)

	const photo = `https://sharik.ua/images/elements_big/${artItem.title}_m1.jpg`;



	const fetchArts = async () => {
		try {

			const { data } = await axios.get(`arts`);
			setArts(data.arts)


		} catch (error) {
			console.log(error)
		}
	}


	useEffect(() => {
		fetchArts()
	}, [])


	useEffect(() => {
		console.log("Загружены такие артикулы: ", arts)
	}, [arts])



	const handlerArtFind = () => {

		const art = arts.find(item => item.title == artInput.current.value)

		setArtItem(art)
		setArtCartDisplay(true)

	}




	return (


		<div

		>

			<input type="text" ref={artInput} />
			<button className='bg-blue-600 m-5 p-2 text-white rounded-sm' onClick={handlerArtFind} >Найти артикул</button>



			<div
				onClick={() => navigate(`/arts/${artItem._id}`)}
			>
				{artCardDisplay &&
					<CardBTW
					>
						<h1>{artItem.title}</h1>
						<h1>{artItem.name}</h1>
						<h1>{artItem.zone}</h1>
						<PhotoArtBTW title={artItem.title} />

					</CardBTW >
				}
			</div>

		</div >
	);
};

export default ArtFindPage;