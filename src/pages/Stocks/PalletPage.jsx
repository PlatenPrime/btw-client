import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import usePalletStore from './stores/palletsStore';
import usePosesStore from './stores/posesStore';
import { useRowStore } from './stores/rowsStore';
import { ButtonBlock, CardBlock, HeaderBlock, PageBTW, Spinner, TextBlock, Breadcrumbs } from '../../components';
import { toast } from 'react-toastify';
import PositionBage from './PositionBage';

import { ModalDeletePallet, ModalRenamePallet, ModalCreatePos, ModalDeletePos, ModalEditPos, ModalClearPallet, ModalMovePalletContent } from './PalletPageModals/index.js';
import { useArtContext } from '../../ArtContext';
import { RenameIcon, MoveIcon, DeleteIcon, ClearIcon, AddIcon, BackIcon } from '../../components/UI/Icons/';
import ButtonGroup from '../../components/UI/ButtonGroup.jsx';





export default function PalletPage() {

	const { id } = useParams();
	const navigate = useNavigate()

	const { artsDB, loadingArtsDB, errorArtsDB } = useArtContext();



	// ROW STORE

	const getRowById = useRowStore((state) => state.getRowById);
	const getAllRows = useRowStore((state) => state.getAllRows);
	const rows = useRowStore((state) => state.rows)

	// PALLET STORE

	const getPalletById = usePalletStore((state) => state.getPalletById);
	const deletePalletById = usePalletStore((state) => state.deletePalletById);
	const updatePalletById = usePalletStore((state) => state.updatePalletById);
	const clearPalletById = usePalletStore((state) => state.clearPalletById);
	const movePalletContent = usePalletStore((state) => state.movePalletContent);
	const getRowPallets = usePalletStore((state) => state.getRowPallets);

	// POS STORE

	const clearPosesStore = usePosesStore((state) => state.clearPosesStore);
	const createPos = usePosesStore((state) => state.createPos);
	const deletePosById = usePosesStore((state) => state.deletePosById);
	const getPalletPoses = usePosesStore((state) => state.getPalletPoses);
	const posesInStore = usePosesStore((state) => state.poses);
	const updatePosById = usePosesStore((state) => state.updatePosById);


	// STATES


	const [pallet, setPallet] = useState(null);
	const [row, setRow] = useState(null);
	const [title, setTitle] = useState("");

	const [isPosesLoading, setIsPosesLoading] = useState(false);


	const [selectedPos, setSelectedPos] = useState(null)
	const [selectedRowId, setSelectedRowId] = useState(null)
	const [selectedRowPallets, setSelectedRowPallets] = useState(null)
	const [selectedPalletId, setSelectedPalletId] = useState(null)
	const [selectedPallet, setSelectedPallet] = useState(null)

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

	const [showModalDeletePallet, setShowModalDeletePallet] = useState(false);
	const [showModalRenamePallet, setShowModalRenamePallet] = useState(false);
	const [showModalCreatePos, setShowModalCreatePos] = useState(false);
	const [showModalDeletePos, setShowModalDeletePos] = useState(false);
	const [showModalEditPos, setShowModalEditPos] = useState(false);
	const [showModalClearPallet, setShowModalClearPallet] = useState(false);
	const [showModalMovePalletContent, setShowModalMovePalletContent] = useState(false);


	// EFFECTS

	async function fetchPallet(id) {
		try {
			const fetchedPallet = await getPalletById(id);
			console.log(fetchedPallet)

			if (fetchedPallet) {
				const fetchedRow = await getRowById(fetchedPallet?.row)
				setRow(fetchedRow)
			}

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


		const fetchAllRows = async () => {
			try {
				const rows = await getAllRows()
				setSelectedRowId(rows[0]._id)
			} catch (error) {
				console.log(error)
			}
		}

		fetchAllRows()

	}, [])


	useEffect(() => {

		const fetchRowPallets = async () => {
			try {
				const pallets = await getRowPallets(selectedRowId)
				console.log(pallets)
				setSelectedRowPallets(pallets)
			} catch (error) {
				console.log(error)
			} finally {

			}
		}


		fetchRowPallets()

	}, [selectedRowId])



	useEffect(() => {
		fetchPallet(id);
		fetchPoses(id);
	}, [id]);



	useEffect(() => {

		const fetchSelectedPallet = async () => {
			try {
				const selectedPallet = await getPalletById(selectedPalletId)
				console.log(selectedPallet)
				setSelectedPallet(selectedPallet)
			} catch (error) {
				console.log(error)
			}
		}

		fetchSelectedPallet()

	}, [selectedPalletId])


	// HANDLERS

	async function handleDeletePalletById() {
		try {
			await deletePalletById(pallet._id)
			toast.success(`Паллета ${pallet.title} удалена`)

		} catch (error) {
			console.error('Ошибка при удалении Pallet:', error);
		} finally {
			setShowModalDeletePallet(false)
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



	async function handleMovePalletContent(currentPalletId, targetPalletId) {

		try {
			const message = await movePalletContent(currentPalletId, targetPalletId);
			console.log(message); // Выводим сообщение об успешном перемещении
			clearPosesStore()
			// Дополнительные действия или обновление интерфейса, если необходимо
		} catch (error) {
			console.error('Ошибка при перемещении содержимого Pallet:', error);
			// Обработка ошибки, если что-то пошло не так
		} finally {
			setShowModalMovePalletContent(false)
		}


	}


	// BREADCRUMBS


	const breadcrumbPaths = [

		{ text: `Ряд ${row?.title ? row?.title : ""}`, link: `/rows/${pallet?.row}` },

	];



	return (
		<PageBTW>

			<HeaderBlock
				className="border border-amber-500 shadow-md shadow-amber-500 "

			>


				<CardBlock
					className="w-full grid grid-cols-1 sm:grid-cols-3"
				>

					<Link
						to={`/rows/${pallet?.row}`}
						className="flex items-center justify-start text-xl "
					>

						<TextBlock
							className="hover:bg-amber-500/25 rounded p-1 border"
						>
							<BackIcon />
							{`Ряд ${row?.title ? row?.title : ""}`}
						</TextBlock>
					</Link>


					<TextBlock>{title}</TextBlock>



				</CardBlock>


			</HeaderBlock>







			<ButtonGroup>



				<ButtonBlock
					className="lime-b flex"
					onClick={() => { setShowModalRenamePallet(true); }}
				>
					<TextBlock className="text-2xl"><RenameIcon /></TextBlock>
					<TextBlock>Перейменувати</TextBlock>

				</ButtonBlock>

				<ButtonBlock
					className="blue-b flex"
					onClick={() => { setShowModalMovePalletContent(true); }}
				>
					<TextBlock className="text-2xl"><MoveIcon /></TextBlock>
					<TextBlock>Переставити</TextBlock>


				</ButtonBlock>

				<ButtonBlock
					onClick={() => { setShowModalClearPallet(true) }}
					className=" rose-b flex justify-center items-center"
				>
					<TextBlock className="text-2xl"><ClearIcon /></TextBlock>
					<TextBlock className="">Очистити</TextBlock>

				</ButtonBlock>


				<ButtonBlock
					className="red-b flex"
					onClick={() => { setShowModalDeletePallet(true) }}
				>
					<TextBlock className="text-2xl"><DeleteIcon /></TextBlock>
					<TextBlock className="">Видалити</TextBlock>
				</ButtonBlock>
			</ButtonGroup>



			<CardBlock>


				<ModalDeletePallet
					show={showModalDeletePallet}
					onDelete={handleDeletePalletById}
					onCancel={() => { setShowModalDeletePallet(false) }}
				/>

				<ModalRenamePallet
					show={showModalRenamePallet}
					value={title}
					onConfirm={(title) => { handleRenamePalletById(title) }}
					onCancel={() => { setShowModalRenamePallet(false) }}

				/>


				<ModalCreatePos
					show={showModalCreatePos}
					newPos={newPos}
					artsDB={artsDB}
					handleInputPosChange={handleInputPosChange}
					handleCreatePos={handleCreatePos}
					onCancel={() => { setShowModalCreatePos(false) }}
				/>


				<ModalDeletePos
					show={showModalDeletePos}
					onCancel={() => { setShowModalDeletePos(false) }}
					onDelete={() => handleDeletePosById(selectedPos._id)}
					selectedPos={selectedPos}
				/>


				<ModalEditPos
					show={showModalEditPos}
					selectedPos={selectedPos}
					newPosQuantValue={newPosQuantValue}
					setNewPosQuantValue={setNewPosQuantValue}
					newPosBoxesValue={newPosBoxesValue}
					setNewPosBoxesValue={setNewPosBoxesValue}
					newPosDateValue={newPosDateValue}
					setNewPosDateValue={setNewPosDateValue}
					handleUpdatePosById={handleUpdatePosById}
					onCancel={() => { setShowModalEditPos(false) }}

				/>


				<ModalClearPallet
					show={showModalClearPallet}
					ask={`Очистити палету ${pallet?.title}?`}
					onConfirm={() => { handleClearPalletById(id) }}
					onCancel={() => { setShowModalClearPallet(false) }}

				/>



				<ModalMovePalletContent
					show={showModalMovePalletContent}
					id={id}
					pallet={pallet}
					rows={rows}
					selectedRowPallets={selectedRowPallets}
					selectedRowId={selectedRowId}
					selectedPalletId={selectedPalletId}
					selectedPallet={selectedPallet}
					handleMovePalletContent={handleMovePalletContent}
					setSelectedRowId={setSelectedRowId}
					setSelectedPalletId={setSelectedPalletId}
					onCancel={() => { setShowModalMovePalletContent(false) }}

				/>



			</CardBlock>






			<CardBlock
				className="p-2 space-y-2 "
			>


				<CardBlock>

					<TextBlock
						className="text-teal-500 text-3xl justify-start p-1"
					>
						Позицій: {posesInStore?.length}
					</TextBlock>

				</CardBlock>

				<CardBlock>

					<TextBlock
						className="text-amber-500 text-xl justify-start p-1"
					>
						Коробок всього: {posesInStore?.reduce((a, b) => a + b.boxes, 0)}
					</TextBlock>

				</CardBlock>



				<CardBlock
					className="flex justify-center items-center "
				>
					<ButtonBlock
						className="teal-b  p-4 flex  border-dashed w-full"
						onClick={() => { setShowModalCreatePos(true); }}
					>
						<TextBlock className="text-2xl"><AddIcon /></TextBlock>
						<TextBlock className="">Додати позицію</TextBlock>

					</ButtonBlock>
				</CardBlock>


				{isPosesLoading ? (
					<Spinner />
				) : posesInStore?.length === 0 ? (
					<p></p>
				) : (
					<ul className=' space-y-4'>


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
										setNewPosDateValue(pos.date)
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
