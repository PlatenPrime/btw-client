import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import usePalletStore from './palletsStore';
import usePosesStore from './posesStore';
import { ButtonBlock, CardBlock, HeaderBlock, ModalConfirm, ModalEditOneValue, PageBTW, Spinner, TextBlock, ModalWrapper, InputBlock, ImageArt, Breadcrumbs } from '../../components';
import { toast } from 'react-toastify';
import PositionBage from './PositionBage';
import useFetchArts from '../../hooks/useFetchArts';



export default function PalletPage() {

	const { id } = useParams();
	const navigate = useNavigate()

	const { artsDB, loadingArtsDB, errorArtsDB } = useFetchArts()


	// ROW STORE




	// PALLET STORE

	const getPalletById = usePalletStore((state) => state.getPalletById);
	const deletePalletById = usePalletStore((state) => state.deletePalletById);
	const updatePalletById = usePalletStore((state) => state.updatePalletById);
	const clearPalletById = usePalletStore((state) => state.clearPalletById);
	const movePalletContent = usePalletStore((state) => state.movePalletContent);

	// POS STORE

	const clearPosesStore = usePosesStore((state) => state.clearPosesStore);
	const createPos = usePosesStore((state) => state.createPos);
	const deletePosById = usePosesStore((state) => state.deletePosById);
	const getPalletPoses = usePosesStore((state) => state.getPalletPoses);
	const posesInStore = usePosesStore((state) => state.poses);
	const updatePosById = usePosesStore((state) => state.updatePosById);


	// STATES


	const [pallet, setPallet] = useState(null);
	const [title, setTitle] = useState("");
	const [isPosesLoading, setIsPosesLoading] = useState(false);


	const [selectedPos, setSelectedPos] = useState(null)

	const [newPosQuantValue, setNewPosQuantValue] = useState(0)
	const [newPosBoxesValue, setNewPosBoxesValue] = useState(0)
	const [newPosDateValue, setNewPosDateValue] = useState("")

	const [newPos, setNewPos] = useState({
		artikul: '',
		quant: '',
		boxes: '',
		date: ''
	});


	// MODALS

	const [showModalPalletDelete, setShowModalPalletDelete] = useState(false)
	const [showModalRenamePallet, setShowModalRenamePallet] = useState(false);
	const [showModalCreatePos, setShowModalCreatePos] = useState(false);
	const [showModalDeletePos, setShowModalDeletePos] = useState(false);
	const [showModalEditPos, setShowModalEditPos] = useState(false);
	const [showModalClearPallet, setShowModalClearPallet] = useState(false);


	// HANDLERS

	async function fetchPallet(id) {
		try {
			const fetchedPallet = await getPalletById(id);
			console.log(fetchedPallet)
			setPallet(fetchedPallet);
			setTitle(fetchedPallet.title)
		} catch (error) {
			console.error('Ошибка при получении паллеты:', error);
		}
	}


	async function fetchPoses(id) {

		try {
			setIsPosesLoading(true);
			await getPalletPoses(id);
		} catch (error) {
			console.log(error)
		} finally {
			setIsPosesLoading(false);
		}

	}



	useEffect(() => {
		fetchPallet(id);
		fetchPoses(id);
	}, [id]);




	async function handleDeletePalletById() {
		try {
			await deletePalletById(pallet._id)
			toast.success(`Паллета ${pallet.title} удалена`)

		} catch (error) {
			console.error('Ошибка при удалении Pallet:', error);
		} finally {
			setShowModalPalletDelete(false)
			navigate(`/rows/${pallet.row}`)
		}

	}


	async function handleRenamePalletById(newTitle) {
		try {
			const updateData = { ...pallet, title: newTitle }
			await updatePalletById(pallet._id, updateData);
			setTitle(newTitle)

		} catch (error) {
			console.error('Ошибка при изменении  названия паллеты:', error);
		} finally {
			setShowModalRenamePallet(false)
		}
	}




	const handleInputPosChange = (event) => {
		const { name, value } = event.target;
		setNewPos({ ...newPos, [name]: value });
		console.log(newPos)
	};




	// Обработчик отправки формы
	const handleCreatePos = async () => {

		try {

			const existingPos = posesInStore.find(pos => pos.artikul === newPos.artikul);

			if (existingPos) {

				const updatedData = {
					quant: +existingPos.quant + +newPos.quant,
					boxes: +existingPos.boxes + +newPos.boxes
				}

				await updatePosById(existingPos._id, updatedData)

			} else {
				await createPos(pallet._id, newPos)
			}



		} catch (error) {
			console.log(error)
		} finally {
			setShowModalCreatePos(false)
			setNewPos({

				artikul: '',
				quant: '',
				boxes: '',
				date: ''
			});
		}
	};


	async function handleDeletePosById(id) {
		try {
			const resDeletePos = await deletePosById(id)
			console.log(resDeletePos)

		} catch (error) {
			console.log(error)
		} finally {
			setShowModalDeletePos(false)
		}
	}


	async function handleUpdatePosById(id) {
		try {

			const updatedData = {
				quant: newPosQuantValue,
				boxes: newPosBoxesValue,
				date: newPosDateValue
			}


			const resUpdatePos = await updatePosById(id, updatedData)

		} catch (error) {

		} finally {
			setShowModalEditPos(false)
		}
	}


	async function handleClearPalletById(id) {
		try {

			const resClear = await clearPalletById(id)
			console.log(resClear)
			clearPosesStore()

		} catch (error) {
			console.log(error)
		} finally {
			setShowModalClearPallet(false)
		}
	}



	// BREADCRUMBS


	const breadcrumbPaths = [

		{ text: 'Запаси', link: '/stocks' },
		{ text: `Ряд`, link: `/rows/${pallet?.row}` },
		{ text: `Палета ${title}` },
	];



	return (
		<PageBTW>

			<HeaderBlock
				className="bg-sky-500/20 border border-sky-500"
			>
				{title}
			</HeaderBlock>



			<Breadcrumbs paths={breadcrumbPaths} />



			<CardBlock
				className="flex justify-end flex-wrap p-2 space-x-2 "
			>

				<ButtonBlock
					className="
					border border-green-500 
					bg-transparent hover:bg-green-500
					text-gray-100 hover:text-white
					 hover:shadow-lg hover:shadow-green-500
					"
					onClick={() => { setShowModalCreatePos(true); }}
				>
					Додати позицію
				</ButtonBlock>



				<ButtonBlock
					className="edit-c"
					onClick={() => { setShowModalRenamePallet(true); }}
				>
					Перейменувати
				</ButtonBlock>

				<ButtonBlock
					onClick={() => { setShowModalClearPallet(true) }}
					className=" confirm-c"
				>
					Очистити
				</ButtonBlock>


				<ButtonBlock
					className="delete-c"
					onClick={() => { setShowModalPalletDelete(true) }}
				>
					Видалити
				</ButtonBlock>
			</CardBlock>


			<CardBlock>

				{showModalPalletDelete && <ModalConfirm
					ask="Удалить эту паллету?"
					onConfirm={handleDeletePalletById}
					onCancel={() => { setShowModalPalletDelete(false) }}
				/>}

				{showModalRenamePallet && <ModalEditOneValue

					value={title}
					onConfirm={(title) => { handleRenamePalletById(title) }}
					onCancel={() => { setShowModalRenamePallet(false) }}

				/>}


				{
					showModalCreatePos && <ModalWrapper
						title="Додавання позиції"
						onCancel={() => { setShowModalCreatePos(false) }}
					>


						<CardBlock
							className="flex space-x-2"
						>
							<ImageArt
								size={100}
								artikul={newPos.artikul.length === 9 ? newPos.artikul : "1102-3092"}
							/>

							<TextBlock
								className="text-xl"
							>
								{artsDB.find((art) => art.artikul === newPos.artikul)?.nameukr}
							</TextBlock>

						</CardBlock>

						<CardBlock

							className='space-y-2'
						>

							<CardBlock
								className="flex justify-between items-center space-x-4"
							>
								<label htmlFor="artikul">Артикул:</label>
								<InputBlock
									type="text"
									id="artikul"
									name="artikul"
									autoComplete="off"
									value={newPos.artikul}
									onChange={handleInputPosChange}
								/>
							</CardBlock>
							<CardBlock
								className="flex justify-between items-center space-x-4"
							>
								<label htmlFor="quant">Кількість артикулу:</label>
								<InputBlock
									type="number"
									id="quant"
									name="quant"
									autoComplete="off"
									value={newPos.quant}
									onChange={handleInputPosChange}
								/>
							</CardBlock>
							<CardBlock
								className="flex justify-between items-center space-x-4"
							>
								<label htmlFor="box">Кількість коробок:</label>
								<InputBlock
									type="number"
									id="boxes"
									name="boxes"
									autoComplete="off"
									value={newPos.boxes}
									onChange={handleInputPosChange}
								/>
							</CardBlock>
							<CardBlock
								className="flex justify-between items-center space-x-4"
							>
								<label htmlFor="date">Дата:</label>
								<InputBlock
									type="text"
									id="date"
									name="date"
									autoComplete="off"
									value={newPos.date}
									onChange={handleInputPosChange}
								/>
							</CardBlock>
							<CardBlock
								className="flex justify-between "
							>
								<ButtonBlock
									type="button"
									className="cancel-c"
									onClick={() => {
										setNewPos({});
										setShowModalCreatePos(false);
									}}>
									Скасувати
								</ButtonBlock>

								<ButtonBlock
									type="submit"
									className="create-c"
									onClick={handleCreatePos}
								>
									Створити
								</ButtonBlock>


							</CardBlock>
						</CardBlock>


					</ModalWrapper>
				}


				{showModalDeletePos && <ModalConfirm
					ask="Видалити цю позицію?"
					onCancel={() => { setShowModalDeletePos(false) }}
					onConfirm={() => handleDeletePosById(selectedPos._id)}
				/>}


				{showModalEditPos && <ModalWrapper
					title={`Редагування позиції ${selectedPos.artikul} `}
					onCancel={() => { setShowModalEditPos(false) }}

				>


					<CardBlock
						className="space-y-4 "

					>


						<CardBlock
							className="flex justify-between space-x-2"
						>

							<TextBlock>
								Кількість:
							</TextBlock>

							<InputBlock
								name="newPosQuantValue"
								value={newPosQuantValue}

								onChange={(e) => { setNewPosQuantValue(e.target.value) }}
							/>

						</CardBlock>


						<CardBlock
							className="flex justify-between space-x-2"
						>

							<TextBlock>
								Коробки:
							</TextBlock>

							<InputBlock
								name="newPosBoxesValue"
								value={newPosBoxesValue}

								onChange={(e) => { setNewPosBoxesValue(e.target.value) }}
							/>

						</CardBlock>


						<CardBlock
							className="flex justify-between space-x-2"
						>

							<TextBlock>
								Дата:
							</TextBlock>

							<InputBlock
								name="newPosDataValue"
								value={newPosDateValue}
								placeholder="12-2000..."
								onChange={(e) => { setNewPosDateValue(e.target.value) }}
							/>

						</CardBlock>








						<CardBlock
							className="flex justify-between"
						>
							<ButtonBlock
								className="cancel-c"
								onClick={() => { setShowModalEditPos(false) }}
							>
								Скасувати
							</ButtonBlock>
							<ButtonBlock
								className="success-c"
								onClick={() => { handleUpdatePosById(selectedPos._id) }}
							>
								Підтвердити
							</ButtonBlock>


						</CardBlock>

					</CardBlock>


				</ModalWrapper>}


				{showModalClearPallet && <ModalConfirm
					ask={`Очистити палету ${pallet?.title}?`}
					onConfirm={() => { handleClearPalletById(id) }}
					onCancel={() => { setShowModalClearPallet(false) }}

				/>}



			</CardBlock>






			<CardBlock
				className=""
			>


				<CardBlock>

					<TextBlock
						className="text-green-500 text-3xl"
					>
						Позиції: {posesInStore.length}
					</TextBlock>




				</CardBlock>

				{isPosesLoading ? (
					<Spinner />
				) : posesInStore?.length === 0 ? (
					<p></p>
				) : (
					<ul className='p-2 space-y-4'>


						{posesInStore?.map((pos) => {

							return (
								<PositionBage
									pos={pos}
									onDelete={() => {
										setShowModalDeletePos(true)
										setSelectedPos(pos)
									}}
									onEdit={() => {
										setShowModalEditPos(true)
										setSelectedPos(pos)
										setNewPosBoxesValue(pos.boxes)
										setNewPosQuantValue(pos.quant)
									}}
									artsDB={artsDB}

								/>
							);
						})}
					</ul>
				)}


			</CardBlock>



		</PageBTW>
	)
}
