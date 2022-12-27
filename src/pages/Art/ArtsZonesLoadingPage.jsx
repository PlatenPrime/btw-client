import { Button, Label, Spinner, Textarea, Tooltip } from 'flowbite-react';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateButton from '../../components/UI/Buttons/CreateButton';
import DeleteButton from '../../components/UI/Buttons/DeleteButton';
import SaveButton from '../../components/UI/Buttons/SaveButton';
import ConfirmButton from '../../components/UI/Buttons/ConfirmButton';
import ControlBTW from '../../components/UI/Control/ControlBTW';
import ControlMobileBTW from '../../components/UI/Control/ControlMobileBTW';
import HeaderMainBTW from '../../components/UI/Header/HeaderMainBTW';
import TitleHeaderMain from '../../components/UI/Header/TitleHeaderMain';
import MainBTW from '../../components/UI/MainBTW';
import PageBTW from '../../components/UI/Page/PageBTW';
import { checkIsAuth } from '../../redux/features/auth/authSlice';

import axios from '../../utils/axios';
import { excelToJSON } from '../../utils/excel';



const ArtsZonesLoadingPage = () => {

	const navigate = useNavigate()
	const isAuth = useSelector(checkIsAuth)







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
		<PageBTW>

			<MainBTW>

				<HeaderMainBTW>
					<TitleHeaderMain>
						Установка зон
					</TitleHeaderMain>
				</HeaderMainBTW>



				<form>
					<label htmlFor="upload">Upload File</label>
					<input
						type="file"
						name="upload"
						id="upload"
						onChange={excelToJSON}
					/>
				</form>




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




			</MainBTW>



			<ControlMobileBTW>

				<SaveButton

					onClick={handlerSave}

				>
					{isLoading && <Spinner aria-label="Default status example" />}
					Сохранить
				</SaveButton>




				<ConfirmButton
					onClick={handlerUpload}
					className='bg-green-300 p-2'
					disabled={!arts}
				>
					{isLoading && <Spinner aria-label="Default status example" />}
					Выгрузить артикулы
				</ConfirmButton>




				<DeleteButton
					className='bg-red-300 p-2'
					onClick={handlerRemove}
				>
					{isLoading && <Spinner aria-label="Default status example" />}
					Удалить
				</DeleteButton>

			</ControlMobileBTW>


			<ControlBTW>



				<SaveButton

					onClick={handlerSave}

				>
					{isLoading && <Spinner aria-label="Default status example" />}
					Сохранить
				</SaveButton>




				<ConfirmButton
					onClick={handlerUpload}
					className='bg-green-300 p-2'
					disabled={!arts}
				>
					{isLoading && <Spinner aria-label="Default status example" />}
					Выгрузить артикулы
				</ConfirmButton>




				<DeleteButton
					className='bg-red-300 p-2'
					onClick={handlerRemove}
				>
					{isLoading && <Spinner aria-label="Default status example" />}
					Удалить
				</DeleteButton>



			</ControlBTW>




		</PageBTW>
	);
};

export default ArtsZonesLoadingPage;