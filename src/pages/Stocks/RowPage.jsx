import React, { useEffect, useRef, useState } from 'react'
import { useRowStore } from './stocksStore';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonBlock, CardBlock, HeaderBlock, ModalConfirm, PageBTW, TextBlock } from '../../components';
import { toast } from 'react-toastify';
import ModalEditOneValue from '../../components/UI/Modal/ModalEditOneValue';

export default function RowPage() {
	const getRowById = useRowStore((state) => state.getRowById);
	const getRowPallets = useRowStore((state) => state.getRowPallets);
	const updateRowById = useRowStore((state) => state.updateRowById);
	const deleteRowById = useRowStore((state) => state.deleteRowById);


	const params = useParams()
	const navigate = useNavigate()

	const [row, setRow] = useState(null)
	const [title, setTitle] = useState(row?.title)
	const [pallets, setPallets] = useState([])
	const [showModalDeleteRow, setShowModalDeleteRow] = useState(false);
	const [showModalUpdateRow, setShowModalUpdateRow] = useState(false);





	async function fetchRow(id) {
		const row = await getRowById(id);
		setRow(row)
	}

	async function fetchRowPallets(id) {
		const pallets = await getRowPallets(id)
		setPallets(pallets)
		console.log(pallets)
	}



	function closeModalDeleteRow() {
		setShowModalDeleteRow(false);
	}


	function closeModalUpdateRow() {
		setShowModalUpdateRow(false);
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


			{showModalDeleteRow && <ModalConfirm
				ask="Удалить этот ряд?"
				onConfirm={handleDeleteRowById}
				onCancel={closeModalDeleteRow}
			/>}

			{
				showModalUpdateRow && <ModalEditOneValue
					value={row.title}
					onConfirm={(value) => { handleUpdateRowById(value) }}
					onCancel={closeModalUpdateRow}
				/>
			}





			<CardBlock>
				{pallets?.map((pallet) => <TextBlock>{pallet.title}</TextBlock>)}
			</CardBlock>








		</PageBTW>
	)
}


