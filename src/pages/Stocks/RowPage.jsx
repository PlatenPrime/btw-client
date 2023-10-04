import React, { useEffect, useRef, useState } from 'react'
import { useRowStore } from './stocksStore';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonBlock, CardBlock, HeaderBlock, PageBTW, TextBlock } from '../../components';
import { toast } from 'react-toastify';

export default function RowPage() {
	const getRowById = useRowStore((state) => state.getRowById);
	const getRowPallets = useRowStore((state) => state.getRowPallets);
	const updateRowById = useRowStore((state) => state.updateRowById);
	const deleteRowById = useRowStore((state) => state.deleteRowById);


	const params = useParams()
	const navigate = useNavigate()

	const [row, setRow] = useState(null)
	const [pallets, setPallets] = useState([])
	const [newTitle, setNewTitle] = useState("")
	const [showModalDeleteRow, setShowModalDeleteRow] = useState(false);





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

	async function handleUpdateRowById() {

	}

	async function handleDeleteRowById() {
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
				{row?.title}
			</HeaderBlock>

			<CardBlock>
				<ButtonBlock
					className="edit-c"
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


			{showModalDeleteRow && <Modal
				ask="Удалить этот ряд?"
				onConfirm={handleDeleteRowById}
				onCancel={closeModalDeleteRow} />}




			<CardBlock>
				{pallets?.map((pallet) => <TextBlock>{pallet.title}</TextBlock>)}
			</CardBlock>








		</PageBTW>
	)
}





function Modal(props) {

	const modalRef = useRef();

	const handleModalClick = (e) => {
		// Проверяем, был ли клик по внешней области модального окна
		if (modalRef.current && !modalRef.current.contains(e.target)) {
			props.onCancel();
		}
	};


	return (
		<div
			className="fixed bg-sky-500/10 inset-0 z-50 flex items-center justify-center backdrop-blur backdrop-filter bg-opacity-60"
			onClick={handleModalClick}
		>

			<div className="relative  bg-sky-500/20 border border-sky-500 min-w-fit  max-w-2xl p-6 rounded-lg shadow-lg"
				ref={modalRef}
			>


				<p className="text-lg font-semibold mb-4">{props.ask}</p>
				<div className="flex justify-evenly">
					<ButtonBlock
						onClick={props.onConfirm}
						className="success-c px-4"
					>
						Да
					</ButtonBlock>
					<ButtonBlock
						onClick={props.onCancel}
						className="cancel-c px-4"
					>
						Нет
					</ButtonBlock>
				</div>
			</div>
		</div>

	);
}