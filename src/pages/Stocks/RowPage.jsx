import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom';

import { ButtonBlock, CardBlock, HeaderBlock, ModalConfirm, ModalCreate, ModalEditOneValue, PageBTW, TextBlock, Spinner } from '../../components';
import { toast } from 'react-toastify';

import PalletBage from './PalletBage';

import { useRowStore } from './stocksStore';
import usePalletStore from './palletsStore';



export default function RowPage() {
	const getRowById = useRowStore((state) => state.getRowById);
	const getRowPallets = usePalletStore((state) => state.getRowPallets);
	const palletsStore = usePalletStore((state) => state.pallets);
	const updateRowById = useRowStore((state) => state.updateRowById);
	const deleteRowById = useRowStore((state) => state.deleteRowById);
	const createPallet = usePalletStore((state) => state.createPallet);



	const params = useParams()
	const navigate = useNavigate()

	const [row, setRow] = useState(null)
	const [title, setTitle] = useState(row?.title)
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



	async function handleCreatePallet(palletTitle) {

		try {
			await createPallet(palletTitle, row._id);


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
		<PageBTW>
			<HeaderBlock
				className="bg-orange-500/20 border border-orange-500"
			>
				{title}
			</HeaderBlock>

			<CardBlock
				className="flex flex-wrap justify-end p-2 space-x-2"
			>
				<ButtonBlock
					className="create-c"
					onClick={() => { setShowModalCreatePallet(true); }}
				>
					Создать паллету
				</ButtonBlock>
				<ButtonBlock
					className="edit-c"
					onClick={() => { setShowModalUpdateRow(true); }}
				>
					Переименовать
				</ButtonBlock>
				<ButtonBlock
					className="delete-c"
					onClick={() => { setShowModalDeleteRow(true); }}
				>
					Удалить ряд
				</ButtonBlock>





			</CardBlock>


			{showModalCreatePallet && <ModalCreate
				title="Создание новой паллеты"
				onConfirm={(palletTitle) => { handleCreatePallet(palletTitle) }}
				onCancel={closeModalCreatePallet}

			/>}


			{
				showModalUpdateRow && <ModalEditOneValue
					value={row.title}
					onConfirm={(value) => { handleUpdateRowById(value) }}
					onCancel={closeModalUpdateRow}
				/>
			}


			{showModalDeleteRow && <ModalConfirm
				ask="Удалить этот ряд?"
				onConfirm={handleDeleteRowById}
				onCancel={closeModalDeleteRow}
			/>}







			<CardBlock
				className="space-y-4 bg-sky-500/5 p-2 "
			>
				<TextBlock
					className="text-3xl  "
				>
					Паллеты
				</TextBlock>

				{isRowPalletsLoading
					?
					<Spinner />
					:
					palletsStore.length === 0
						?
						<TextBlock
							className="text-2xl"
						>В этом ряду нет паллет </TextBlock>
						:
						<CardBlock
							className="flex flex-wrap gap-2 justify-start "
						>

							{palletsStore?.map((pallet) => <PalletBage
								title={pallet.title}
								id={pallet._id}
							/>)}
						</CardBlock>}




			</CardBlock>






		</PageBTW>
	)
}


