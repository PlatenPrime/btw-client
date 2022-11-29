import { Button, Label, Spinner, Textarea, Tooltip } from 'flowbite-react';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkIsAuth } from '../../redux/features/auth/authSlice';

import axios from '../../utils/axios';



const ArtsZonesLoadingPage = () => {

	const navigate = useNavigate()
	const isAuth = useSelector(checkIsAuth)


	/* useLayoutEffect(() => {

		if (!isAuth) navigate('/login')
	}, [isAuth, navigate])

 */





	const [arts, setArts] = useState("")
	const [count, setCount] = useState(0)
	const [isLoading, setIsLoading] = useState(false);


	const artsInput = useRef("");


	const handlerSave = () => {

		setArts(JSON.parse(artsInput.current.value))

	}





	const handlerUpload = () => {

		arts.forEach(el => {

			const title = el.title;
			const zone = el.zone;
			const name = el.name;

			createArts(title, zone, name)

			setCount(prev => prev += 1)

		})

	}




	const createArts = async (title, zone, name) => {

		try {

			await axios.post(`arts`, { title, zone, name });

		} catch (error) {

			console.log(error)

		}

	}








	const handlerRemove = async () => {
		try {

			setIsLoading(true);
			await axios.delete(`arts/zones`);
			setIsLoading(false);

		} catch (error) {
			console.log(error)
		}
	}















	return (
		<div className='flex flex-col justify-center items-center min-w-full'>

			<h1>Здесь будут загружаться зоны</h1>

			<div id="textarea">
				<div className="mb-2 block">
					<Label
						htmlFor="comment"
						value="Поле для вставки JSON списка"
					/>
				</div>
				<textarea
					className='w-full'
					id="comment"
					placeholder="Leave a comment..."
					required={true}
					rows={4}
					ref={artsInput}
				/>
			</div>

			<div className='flex flex-col m-5 space-x-2 space-y-2 items-center'>



				<button
					className='bg-blue-300 p-2'
					onClick={handlerSave}

				>
					{isLoading && <Spinner aria-label="Default status example" />}
					Сохранить
				</button>




				<button
					onClick={handlerUpload}
					className='bg-green-300 p-2'
					disabled={!arts}
				>
					{isLoading && <Spinner aria-label="Default status example" />}
					Выгрузить артикулы
				</button>




				<button
					className='bg-red-300 p-2'
					onClick={handlerRemove}
				>
					{isLoading && <Spinner aria-label="Default status example" />}
					Удалить
				</button>


			</div>

			<h1>{count}</h1>
			<h1>{arts.length}</h1>


		</div>
	);
};

export default ArtsZonesLoadingPage;