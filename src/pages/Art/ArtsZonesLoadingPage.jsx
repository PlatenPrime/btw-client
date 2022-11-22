import { Button, Label, Spinner, Textarea, Tooltip } from 'flowbite-react';
import React, { useState } from 'react';

import axios from '../../utils/axios';



const ArtsZonesLoadingPage = () => {

	const [artsZones, setArtsZones] = useState([]);
	const [isLoading, setIsLoading] = useState(false);


	console.log(artsZones)



	const handlerSubmit = async () => {

		try {
			setIsLoading(true);
			await axios.post(`arts/zones`, { artsZones });
			setIsLoading(false);
		} catch (error) {
			console.log(error)
		}
		await axios.post(`arts/zones`)



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
				<Textarea
					id="comment"
					placeholder="Leave a comment..."
					required={true}
					rows={4}
					onChange={(e) => setArtsZones(e.target.value)}
				/>
			</div>

			<div className='flex mt-10'>

				<Tooltip content="Обновить зоны артикулов">
					<Button
						onClick={handlerSubmit}
					>
						{isLoading && <Spinner aria-label="Default status example" />}
						Обновить
					</Button>
				</Tooltip>


				<Tooltip content="Удалить зоны артикулов">
					<Button
						color="failure"
						onClick={handlerRemove}
					>
						{isLoading && <Spinner aria-label="Default status example" />}
						Удалить
					</Button>
				</Tooltip>

			</div>




		</div>
	);
};

export default ArtsZonesLoadingPage;