import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import usePalletStore from './stores/palletsStore';
import usePosesStore from './stores/posesStore';
import { useRowStore } from './stores/rowsStore';
import { ButtonBlock, CardBlock, HeaderBlock, PageBTW, Spinner, TextBlock, Breadcrumbs, ContainerBlock } from '../../components';
import { toast } from 'react-toastify';
import PositionBage from './PositionBage';

import { ModalDeletePallet, ModalRenamePallet, ModalCreatePos, ModalDeletePos, ModalEditPos, ModalClearPallet, ModalMovePalletContent, ModalChangePalletCom } from './PalletPageModals/index.js';

import { RenameIcon, MoveIcon, DeleteIcon, ClearIcon, AddIcon, BackIcon } from '../../components/UI/Icons/';
import ButtonGroup from '../../components/UI/ButtonGroup.jsx';
import useFetchArts from '../../hooks/useFetchArts.js';





export default function PalletPage() {

	const { id } = useParams();
	const navigate = useNavigate()

	const { artsDB, loadingArtsDB, errorArtsDB } = useFetchArts();



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
	const [newCom, setNewCom] = useState("");


	const [isPosesLoading, setIsPosesLoading] = useState(false);


	const [selectedPos, setSelectedPos] = useState(null)
	const [selectedRowId, setSelectedRowId] = useState(null)
	const [selectedRowPallets, setSelectedRowPallets] = useState(null)
	const [selectedPalletId, setSelectedPalletId] = useState(null)
	const [selectedPallet, setSelectedPallet] = useState(null)

	const [updatePosQuantValue, setUpdatePosQuantValue] = useState(0)
	const [updatePosBoxesValue, setUpdatePosBoxesValue] = useState(0)
	const [updatePosDateValue, setUpdatePosDateValue] = useState("")
	const [updatePosSkladValue, setUpdatePosSkladValue] = useState("")
	const [updatePosComValue, setUpdatePosComValue] = useState("")





	const [newPos, setNewPos] = useState({
		artikul: '',
		quant: '',
		boxes: '',
		date: '',
		sklad: "pogrebi",
		com: ""
	});


	// MODALS

	const [showModalDeletePallet, setShowModalDeletePallet] = useState(false);
	const [showModalRenamePallet, setShowModalRenamePallet] = useState(false);
	const [showModalChangePalletCom, setShowModalChangePalletCom] = useState(false);
	const [showModalCreatePos, setShowModalCreatePos] = useState(false);
	const [showModalDeletePos, setShowModalDeletePos] = useState(false);
	const [showModalEditPos, setShowModalEditPos] = useState(false);
	const [showModalClearPallet, setShowModalClearPallet] = useState(false);
	const [showModalMovePalletContent, setShowModalMovePalletContent] = useState(false);


	const [isDeletingPallet, setIsDeletingPallet] = useState(false);
	const [isRenamingPallet, setIsRenamingPallet] = useState(false);
	const [isChangingPalletCom, setIsChangingPalletCom] = useState(false);
	const [isCreatingPos, setIsCreatingPos] = useState(false);
	const [isDeletingPos, setIsDeletingPos] = useState(false);
	const [isEditingPos, setIsEditingPos] = useState(false);
	const [isClearingPallet, setIsClearingPallet] = useState(false);
	const [isMovingPalletContent, setIsMovingPalletContent] = useState(false);







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
			setTitle(fetchedPallet?.title)
			setNewCom(fetchedPallet?.com)
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
			setIsDeletingPallet(true)
			await deletePalletById(pallet._id)
			toast.success(`Паллета ${pallet.title} удалена`)

		} catch (error) {
			console.error('Ошибка при удалении Pallet:', error);
		} finally {
			setIsDeletingPallet(false);
			setShowModalDeletePallet(false)
			navigate(`/rows/${pallet.row}`)
		}

	}










	async function handleRenamePalletById(newTitle) {
		try {
			setIsRenamingPallet(true);
			const updateData = { ...pallet, title: newTitle }
			await updatePalletById(pallet._id, updateData);
			setTitle(newTitle)

		} catch (error) {
			console.error('Ошибка при изменении  названия паллеты:', error);
		} finally {
			setIsRenamingPallet(false);
			setShowModalRenamePallet(false)
		}
	}



	async function handleChangePalletComentById(newCom) {
		try {
			setIsChangingPalletCom(true);
			const updateData = { ...pallet, com: newCom }
			await updatePalletById(pallet._id, updateData);
			setNewCom(newCom)

		} catch (error) {
			console.error('Ошибка при изменении  комментария паллеты:', error);
		} finally {
			setIsChangingPalletCom(false);
			setShowModalChangePalletCom(false)
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
			setIsCreatingPos(true);
			const existingPos = posesInStore.find(pos => pos.artikul === newPos.artikul);

			if (existingPos && existingPos.sklad === newPos.sklad && existingPos.date === newPos.date && existingPos.com === newPos.com) {

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
			setIsCreatingPos(false);
			setShowModalCreatePos(false)
			setNewPos({

				artikul: '',
				quant: '',
				boxes: '',
				date: '',
				sklad: "pogrebi",
				com: ""
			});
		}
	};


	async function handleDeletePosById(id) {
		try {
			setIsDeletingPos(true);
			const resDeletePos = await deletePosById(id)
			console.log(resDeletePos)

		} catch (error) {
			console.log(error)
		} finally {
			setIsDeletingPos(false);
			setShowModalDeletePos(false)
		}
	}


	async function handleUpdatePosById(id) {
		try {
			setIsEditingPos(true);

			const updatedData = {
				quant: updatePosQuantValue,
				boxes: updatePosBoxesValue,
				date: updatePosDateValue,
				sklad: updatePosSkladValue,
				com: updatePosComValue,
			}


			const resUpdatePos = await updatePosById(id, updatedData)

		} catch (error) {

		} finally {
			setIsEditingPos(false);
			setShowModalEditPos(false)
		}
	}


	async function handleClearPalletById(id) {
		try {
			setIsClearingPallet(true);

			const resClear = await clearPalletById(id)
			console.log(resClear)
			clearPosesStore()

		} catch (error) {
			console.log(error)
		} finally {
			setIsClearingPallet(false);
			setShowModalClearPallet(false)
		}
	}



	async function handleMovePalletContent(currentPalletId, targetPalletId) {

		try {
			setIsMovingPalletContent(true);
			const message = await movePalletContent(currentPalletId, targetPalletId);
			console.log(message); // Выводим сообщение об успешном перемещении
			clearPosesStore()
			// Дополнительные действия или обновление интерфейса, если необходимо
		} catch (error) {
			console.error('Ошибка при перемещении содержимого Pallet:', error);
			// Обработка ошибки, если что-то пошло не так
		} finally {
			setIsMovingPalletContent(false);
			setShowModalMovePalletContent(false)
		}


	}


	// BREADCRUMBS


	const breadcrumbPaths = [

		{ text: `Ряд ${row?.title ? row?.title : ""}`, link: `/rows/${pallet?.row}` },

	];



	return (
		<PageBTW
			className="px-1"
		>

			<HeaderBlock
				className="bg-teal-500 shadow-2xl shadow-teal-500 "

			>


				<CardBlock
					className="w-full grid grid-cols-1 sm:grid-cols-3"
				>

					<Link
						to={`/rows/${pallet?.row}`}
						className="flex items-center justify-start text-xl "
					>

						<TextBlock
							className=" rounded p-1 bg-orange-500/20 bg-teal-500 hover:bg-orange-500"
						>
							<BackIcon />
							{`Ряд ${row?.title ? row?.title : ""}`}
						</TextBlock>
					</Link>


					<TextBlock>{title}</TextBlock>



				</CardBlock>


			</HeaderBlock>


			{isPosesLoading ?
				<ContainerBlock
					className="w-full h-full flex justify-start items-center"
				>
					<Spinner color="rgb(20 184 166)" />
				</ContainerBlock>
				:



				<>


					<ButtonGroup>



						<ButtonBlock
							className="lime-b flex"
							onClick={() => { setShowModalRenamePallet(true); }}
						>
							<TextBlock className="text-2xl"><RenameIcon /></TextBlock>
							<TextBlock>Перейменувати</TextBlock>

						</ButtonBlock>


						<ButtonBlock
							className="yellow-b flex"
							onClick={() => { setShowModalChangePalletCom(true); }}
						>
							<TextBlock className="text-2xl"><RenameIcon /></TextBlock>
							<TextBlock>Коментарій</TextBlock>

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





					<ModalDeletePallet
						show={showModalDeletePallet}
						onDelete={handleDeletePalletById}
						onCancel={() => { setShowModalDeletePallet(false) }}
						isDeletingPallet={isDeletingPallet}

					/>

					<ModalRenamePallet
						show={showModalRenamePallet}
						value={title}
						onConfirm={(title) => { handleRenamePalletById(title) }}
						onCancel={() => { setShowModalRenamePallet(false) }}
						isRenamingPallet={isRenamingPallet}
					/>

					<ModalChangePalletCom
						show={showModalChangePalletCom}
						value={newCom}
						onConfirm={(newCom) => { handleChangePalletComentById(newCom) }}
						onCancel={() => { setShowModalChangePalletCom(false) }}
						isChangingPalletCom={isChangingPalletCom}
					/>







					<ModalCreatePos
						show={showModalCreatePos}
						newPos={newPos}
						artsDB={artsDB}
						handleInputPosChange={handleInputPosChange}
						handleCreatePos={handleCreatePos}
						onCancel={() => { setShowModalCreatePos(false) }}
						isCreatingPos={isCreatingPos}
					/>


					<ModalDeletePos
						show={showModalDeletePos}
						onCancel={() => { setShowModalDeletePos(false) }}
						onDelete={() => handleDeletePosById(selectedPos._id)}
						selectedPos={selectedPos}
						isDeletingPos={isDeletingPos}
					/>


					<ModalEditPos
						show={showModalEditPos}
						selectedPos={selectedPos}
						updatePosQuantValue={updatePosQuantValue}
						setUpdatePosQuantValue={setUpdatePosQuantValue}
						updatePosBoxesValue={updatePosBoxesValue}
						setUpdatePosBoxesValue={setUpdatePosBoxesValue}
						updatePosDateValue={updatePosDateValue}
						setUpdatePosDateValue={setUpdatePosDateValue}

						updatePosSkladValue={updatePosSkladValue}
						setUpdatePosSkladValue={setUpdatePosSkladValue}
						updatePosComValue={updatePosComValue}
						setUpdatePosComValue={setUpdatePosComValue}


						handleUpdatePosById={handleUpdatePosById}
						onCancel={() => { setShowModalEditPos(false) }}
						isEditingPos={isEditingPos}

					/>


					<ModalClearPallet
						show={showModalClearPallet}
						ask={`Очистити палету ${pallet?.title}?`}
						onConfirm={() => { handleClearPalletById(id) }}
						onCancel={() => { setShowModalClearPallet(false) }}
						isClearingPallet={isClearingPallet}
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
						isMovingPalletContent={isMovingPalletContent}

					/>










					<ContainerBlock
						className="p-2 space-y-2 "
					>


						<CardBlock
							className="flex items-center justify-center"
						>

							<TextBlock
								className="text-teal-100 text-center text-3xl justify-start p-1"
							>
								{newCom}
							</TextBlock>

						</CardBlock>


						<CardBlock
							className="grid lg:grid-cols-3"
						>

							<TextBlock
								className="text-teal-100 text-xl justify-start p-1"
							>
								Позицій: {posesInStore?.length}
							</TextBlock>

							<ButtonBlock
								className="teal-b bg-teal-500/10 shadow-lg p-4 flex  border-dashed "
								onClick={() => { setShowModalCreatePos(true); }}
							>
								<TextBlock className="text-xl"><AddIcon /></TextBlock>
								<TextBlock className="">Додати позицію</TextBlock>

							</ButtonBlock>

							<TextBlock
								className="text-amber-100 text-xl justify-self-end p-1"
							>
								Коробок всього: {posesInStore?.reduce((a, b) => a + b?.boxes, 0)}
							</TextBlock>



						</CardBlock>




						<CardBlock
							className="flex justify-center items-center "
						>

						</CardBlock>


						{posesInStore?.length === 0 ? (
							<TextBlock
								className="text-teal-100 italic"
							>
								На цій палеті позицій немає
							</TextBlock>
						) : (
							<ul className=' space-y-2'>


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
												setUpdatePosBoxesValue(pos?.boxes)
												setUpdatePosQuantValue(pos?.quant)
												setUpdatePosDateValue(pos?.date)
												setUpdatePosSkladValue(pos?.sklad)
												setUpdatePosComValue(pos?.com)
											}}
											artsDB={artsDB}

										/>
									);
								})}
							</ul>
						)}


					</ContainerBlock>

				</>
			}
		</PageBTW>
	)
}
