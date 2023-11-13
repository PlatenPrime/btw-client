import React, { useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, HeaderBlock, InputBlock, PageBTW, TextBlock } from '../../components'
import { Link } from 'react-router-dom'
import axios from '../../utils/axios';
import { toast } from 'react-toastify';
import { useArtContext } from '../../ArtContext';
import { excelToJSONArts } from '../../utils/importExcel';











export default function ArtsUpdatingPage() {




	const { artsDB } = useArtContext();
	const [arts, setArts] = useState(null);
	const [artTest, setArtTest] = useState(null);
	const [currentArt, setCurrentArt] = useState(0);
	const [isUpdating, setIsUpdating] = useState(false)



	console.log(arts?.length)


	const handleChangeExcelInput = async (e) => {


		try {
			const json = await excelToJSONArts(e);
			setArts(json)
			// Здесь можно выполнять действия с полученными данными
			console.log(json);
		} catch (error) {
			// Обработка ошибок, если что-то пошло не так
			console.error(error);
		}

	}








	async function createOrUpdateArt(art) {

		try {

			// await axios.post(`arts/update`, { ...art });

		} catch (error) {
			console.log(error)
		}
	}



	async function handleUploadingArts() {


		if (!arts) return


		let interval = setInterval(() => {
			setCurrentArt(currentArt => {
				if (currentArt < arts?.length) {
					setIsUpdating(true)
					setArtTest(arts[currentArt])
					createOrUpdateArt(arts[currentArt])
					return currentArt + 1;
				} else {
					setIsUpdating(false)
					clearInterval(interval);
					return currentArt;
				}
			});
		}, 10);


	}






	return (
		<PageBTW
			className="space-y-4"
		>

			<HeaderBlock
				className="border border-emerald-500 shadow-md shadow-emerald-500 "
			>
				<TextBlock className="">
					Оновлення артикулів
				</TextBlock>
			</HeaderBlock>


			<CardBlock
				className="p-1 space-y-2 min-h-screen"
			>

				<ButtonGroup>
					<ButtonBlock
						className="sky-b "
					>
						<Link
							to="/arts"
						>
							Артикули
						</Link>
					</ButtonBlock>
				</ButtonGroup>

				<CardBlock>


					<CardBlock className=" flex justify-center items-center ">

						<InputBlock
							className="p-2"
							type="file"
							name="upload"
							id="upload"
							onChange={handleChangeExcelInput}
						/>

					</CardBlock>

					<CardBlock>
						<ButtonBlock
							className="green-b"
							disabled={!arts}
							onClick={handleUploadingArts}
						>
							Вивантажити дані
						</ButtonBlock>
					</CardBlock>


					<CardBlock>
						<TextBlock>Тестові значення</TextBlock>
						<TextBlock>Номер: {currentArt}</TextBlock>
						<TextBlock>Назва: {artTest?.name}</TextBlock>
						<TextBlock>Артикул: {artTest?.title}</TextBlock>
						<TextBlock>Зона: {artTest?.zone}</TextBlock>
					</CardBlock>





				</CardBlock>


			</CardBlock>
		</PageBTW>
	)
}
