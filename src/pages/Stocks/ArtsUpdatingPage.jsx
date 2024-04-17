import React, { useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, HeaderBlock, InputBlock, PageBTW, TextBlock } from '../../components'
import { Link } from 'react-router-dom'
import axios from '../../utils/axios';
import { excelToJSONArts } from '../../utils/importExcel';
import { BackIcon } from "../../components/UI/Icons"
import useFetchArts from '../../hooks/useFetchArts';











export default function ArtsUpdatingPage() {




	const { artsDB } = useFetchArts();
	const [arts, setArts] = useState(null);
	const [artTest, setArtTest] = useState(null);
	const [currentArt, setCurrentArt] = useState(0);
	const [progress, setProgress] = useState(0)
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

			await axios.post(`arts/update`, { ...art });


		} catch (error) {
			console.log(error)
		}
	}



	async function handleUploadingArts() {


		try {

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
			}, 50);

		} catch (error) {
			console.log(error)
		} finally {
			localStorage.removeItem('artsData');
		}




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
				className="p-1  min-h-screen space-y-4"
			>

				<ButtonGroup>
					<ButtonBlock
						className="sky-b "
					>
						<Link
							to="/arts"
							className='flex'
						>
							<BackIcon />
							Артикули
						</Link>
					</ButtonBlock>
				</ButtonGroup>

				<CardBlock>


					<CardBlock className=" flex flex-col justify-center items-center space-y-2  p-6 border border-green-500 rounded bg-green-500/10 ">

						{arts && <TextBlock>
							Файл містить {arts?.length} артикулів для оновлення
						</TextBlock>}


						<CardBlock
							className="flex space-x-2"
						>

							<InputBlock
								className="p-2"
								type="file"
								name="upload"
								id="upload"
								onChange={handleChangeExcelInput}
							/>

							<ButtonBlock
								className="green-b"
								disabled={!arts}
								onClick={handleUploadingArts}
							>

								Вивантажити дані
							</ButtonBlock>
						</CardBlock>


					</CardBlock>



					{isUpdating &&
						<CardBlock>


							<div className="relative pt-1 px-4">


								<div className="flex px-4 mb-2 items-center justify-between">


									<span className="text-sm font-semibold inline-block text-green-100">
										{((currentArt / arts?.length) * 100).toFixed(2)}%
									</span>
									<span>{arts[currentArt]?.nameukr}</span>

									<span>{currentArt} / {arts?.length}</span>



								</div>


								<div className="flex h-2 mb-4 overflow-hidden text-xs bg-violet-200">
									<div
										style={{ width: `${(currentArt / arts?.length) * 100}%` }}
										className="flex flex-col justify-center text-center text-white bg-green-500 shadow-none whitespace-nowrap"
									></div>
								</div>
							</div>

						</CardBlock>

					}


				</CardBlock>


			</CardBlock>
		</PageBTW>
	)
}
