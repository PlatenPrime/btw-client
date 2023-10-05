import React, { useEffect, useRef, useState } from 'react'
import { useRowStore } from './stocksStore';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonBlock, CardBlock, HeaderBlock, ModalConfirm, PageBTW, TextBlock } from '../../components';
import { toast } from 'react-toastify';
import ModalEditOneValue from '../../components/UI/Modal/ModalEditOneValue';
import PalletBage from './PalletBage';
import usePalletStore from './palletsStore';
import ModalCreate from '../../components/UI/Modal/ModalCreate';

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




	async function fetchRow(id) {
		const row = await getRowById(id);
		setRow(row)
		setTitle(row.title)
	}

	async function fetchRowPallets(id) {
		const pallets = await getRowPallets(id)
		
	}



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

	async function handleDeleteRowById(value) {
		try {

			// await deleteRowById(row._id);
			toast.success("Ряд удален")
		} catch (error) {
			console.error('Ошибка при удалении Row:', error);
		} finally {
			setShowModalDeleteRow(false)

			navigate("/stocks")
		}
	};





	useEffect(() => {
		fetchRow(params.id)
		fetchRowPallets(params.id)
	}, [params.id]);







	return (
		<PageBTW>
			<HeaderBlock
				className="bg-orange-500/50"
			>
				{title}
			</HeaderBlock>

			<CardBlock>
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
					Редактировать название ряда
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
				className="space-y-4 bg-sky-500/5 p-2"
			>
				<TextBlock
					className="text-3xl  "
				>
					Паллеты
				</TextBlock>

				<CardBlock
					className="flex flex-wrap gap-2"
				>

					{palletsStore?.map((pallet) => <PalletBage
						title={pallet.title}
						id={pallet._id}
					/>)}
				</CardBlock>

			</CardBlock>






		</PageBTW>
	)
}


