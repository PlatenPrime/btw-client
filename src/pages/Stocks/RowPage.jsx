import React, { useEffect, useState } from 'react'
import { useRowStore } from './stocksStore';
import { useParams } from 'react-router-dom';
import { ButtonBlock, CardBlock, HeaderBlock, PageBTW, TextBlock } from '../../components';

export default function RowPage() {
	const getRowById = useRowStore((state) => state.getRowById);
	const getRowPallets = useRowStore((state) => state.getRowPallets);
	const updateRowById = useRowStore((state) => state.updateRowById);
	const deleteRowById = useRowStore((state) => state.deleteRowById);


	const params = useParams()

	const [row, setRow] = useState(null)
	const [pallets, setPallets] = useState([])
	const [newTitle, setNewTitle] = useState("")






	async function fetchRow(id) {
		const row = await getRowById(id);
		setRow(row)
	}

	async function fetchRowPallets(id) {
		const pallets = await getRowPallets(id)
		setPallets(pallets)
		console.log(pallets)
	}



	async function handleUpdateRowById() {

	}

	async function handleDeleteRowById() {

	}




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
				>
					Удалить ряд
				</ButtonBlock>

			</CardBlock>




			<CardBlock>
				{pallets?.map((pallet) => <TextBlock>{pallet.title}</TextBlock>)}
			</CardBlock>








		</PageBTW>
	)
}
