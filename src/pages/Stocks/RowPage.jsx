import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom';

import { ButtonBlock, CardBlock, HeaderBlock, ModalConfirm, ModalCreate, ModalEditOneValue, PageBTW, TextBlock, Spinner, ButtonGroup, ModalWrapper, InputBlock, ContainerBlock, ModalDelete } from '../../components';
import { AddIcon, CancelIcon, DeleteIcon, OkIcon, RenameIcon } from '../../components/UI/Icons/';

import { toast } from 'react-toastify';

import PalletBage from './PalletBage';

import { useRowStore } from './stores/rowsStore';
import usePalletStore from './stores/palletsStore';
import usePosesStore from './stores/posesStore';




export default function RowPage() {
	const getRowById = useRowStore((state) => state.getRowById);
	const getRowPallets = usePalletStore((state) => state.getRowPallets);
	const palletsStore = usePalletStore((state) => state.pallets);
	const updateRowById = useRowStore((state) => state.updateRowById);
	const deleteRowById = useRowStore((state) => state.deleteRowById);
	const createPallet = usePalletStore((state) => state.createPallet);



	const { allPoses, getAllPoses } = usePosesStore()



	const params = useParams()
	const navigate = useNavigate()

	const [row, setRow] = useState(null)
	const [title, setTitle] = useState(row?.title)
	const [newPalletTitle, setNewPalletTitle] = useState("")
	const [newPalletCom, setNewPalletCom] = useState("")



	const [showModalDeleteRow, setShowModalDeleteRow] = useState(false);
	const [showModalUpdateRow, setShowModalUpdateRow] = useState(false);
	const [showModalCreatePallet, setShowModalCreatePallet] = useState(false);
	const [isRowPalletsLoading, setIsRowPalletsLoading] = useState(false)




	async function fetchRow(id) {

		try {
			const row = await getRowById(id);
			setRow(row)
			setTitle(row.title)
		} catch (error) {
			console.error('Ошибка при получении ряда:', error);
		}
	}


	async function fetchRowPallets(id) {

		try {
			setIsRowPalletsLoading(true)
			await getRowPallets(id)
			await getAllPoses()

		} catch (error) {
			console.log(error)
		} finally {
			setIsRowPalletsLoading(false)
		}

	}









	useEffect(() => {
		fetchRow(params.id)
		fetchRowPallets(params.id)
	}, [params.id]);








	function closeModalDeleteRow() {
		setShowModalDeleteRow(false);
	}


	function closeModalUpdateRow() {
		setShowModalUpdateRow(false);
	}

	function closeModalCreatePallet() {
		setShowModalCreatePallet(false);
	}



	async function handleCreatePallet() {

		try {


			await createPallet(newPalletTitle, row._id, newPalletCom);


		} catch (error) {
			console.error('Ошибка при создании паллеты:', error);
		} finally {
			setShowModalCreatePallet(false)

		}

	}



	async function handleUpdateRowById(newTitle) {

		try {
			await updateRowById(row._id, newTitle);
			setTitle(newTitle)

		} catch (error) {
			console.error('Ошибка при изменении ряда:', error);
		} finally {
			setShowModalUpdateRow(false)

		}

	}

	async function handleDeleteRowById() {
		try {

			await deleteRowById(row._id);
			toast.success(`Ряд ${row.title} удален`)
		} catch (error) {
			console.error('Ошибка при удалении Row:', error);
		} finally {
			setShowModalDeleteRow(false)

			navigate("/stocks")
		}
	};











	return (
		<PageBTW
			className="px-1"
		>
			<HeaderBlock
				className=" bg-amber-500 shadow-2xl shadow-amber-500"
			>
				{title}
			</HeaderBlock>



			<ButtonGroup

			>
				<ButtonBlock
					className="emerald-b flex"
					onClick={() => { setShowModalCreatePallet(true); }}
				>
					<TextBlock className="text-2xl"><AddIcon /></TextBlock>
					<TextBlock className="">Створити палету</TextBlock>

				</ButtonBlock>
				<ButtonBlock
					className="lime-b flex"
					onClick={() => { setShowModalUpdateRow(true); }}
				>
					<TextBlock className="text-2xl"><RenameIcon /></TextBlock>
					<TextBlock className="">Перейменувати</TextBlock>

				</ButtonBlock>
				<ButtonBlock
					className="red-b flex items-center"
					onClick={() => { setShowModalDeleteRow(true); }}
				>
					<TextBlock className="text-2xl"><DeleteIcon /></TextBlock>
					<TextBlock className="">Видалити ряд</TextBlock>


				</ButtonBlock>

			</ButtonGroup>




			{showModalCreatePallet && <ModalWrapper
				title="Створення нової палети"
				onCancel={closeModalCreatePallet}
			>

				<CardBlock
					className="space-y-3"
				>



					<CardBlock
						className="grid grid-cols-2"
					>

						<TextBlock>
							Назва палети
						</TextBlock>
						<InputBlock
							value={newPalletTitle}
							name="newPalletTitle"
							type="text"
							placeholder="XX-XX-X-X"
							onChange={(e) => setNewPalletTitle(e.target.value)}
						/>
					</CardBlock>


					<CardBlock
						className="grid grid-cols-2"
					>

						<TextBlock>
							Коментарій
						</TextBlock>
						<InputBlock
							value={newPalletCom}
							name="newPalletCom"
							type="text"
							placeholder="....."
							onChange={(e) => setNewPalletCom(e.target.value)}
						/>
					</CardBlock>


				</CardBlock>

				<CardBlock
					className="grid grid-cols-2 gap-4"
				>

					<ButtonBlock
						className="red-b flex justify-center items-center"
						onClick={closeModalCreatePallet}
					>
						<TextBlock className="text-2xl"><CancelIcon /></TextBlock>
						<TextBlock className=""> Скасувати</TextBlock>

					</ButtonBlock>


					<ButtonBlock
						className="green-b flex justify-center items-center"
						onClick={handleCreatePallet}
					>
						<TextBlock className="text-2xl"><OkIcon /></TextBlock>
						<TextBlock className=""> 	Створити</TextBlock>
					</ButtonBlock>


				</CardBlock>


			</ModalWrapper>}











			{
				showModalUpdateRow && <ModalEditOneValue
					value={row.title}
					onConfirm={(value) => { handleUpdateRowById(value) }}
					onCancel={closeModalUpdateRow}
				/>
			}


			{
				showModalDeleteRow && <ModalDelete
					ask="Видалити цей ряд?"
					onDelete={handleDeleteRowById}
					onCancel={closeModalDeleteRow}
				/>
			}







			<ContainerBlock
				className="space-y-4  "
			>
				<TextBlock
					className="text-3xl text-amber-300 "
				>
					Палети
				</TextBlock>

				{isRowPalletsLoading
					?
					<Spinner />
					:
					palletsStore.length === 0
						?
						<TextBlock
							className="text-2xl"
						>Цей ряд не містить палети </TextBlock>
						:
						<CardBlock
							className="space-y-2 "
						>

							{palletsStore?.map((pallet) => <PalletBage
								pallet={pallet}
								key={pallet._id}
								poses={allPoses?.filter((pos) => pos.pallet === pallet._id)}
							/>
							)}
						</CardBlock>}




			</ContainerBlock>






		</PageBTW >
	)
}


