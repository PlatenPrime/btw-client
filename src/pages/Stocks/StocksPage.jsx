import React, { useState } from 'react'
import CreateRowForm from './CreateRowForm'
import { ButtonBlock, CardBlock, HeaderBlock, PageBTW, TextBlock } from '../../components'
import { RowList } from './RowList'
import { useRowStore } from './stocksStore';
import ModalCreate from '../../components/UI/Modal/ModalCreate';

export default function StocksPage() {

	const createRow = useRowStore((state) => state.createRow);
	const [showModalCreateRow, setShowModalCreateRow] = useState(false)

	function closeModalCreateRow() {
		setShowModalCreateRow(false);
	}


	async function handleCreateRow(rowTitle) {

		try {
			await createRow(rowTitle);


		} catch (error) {
			console.error('Ошибка при создании паллеты:', error);
		} finally {
			setShowModalCreateRow(false)

		}

	}







	return (
		<PageBTW>

			<HeaderBlock className="bg-slate-500/50" >
				Запасы
			</HeaderBlock>

			<CardBlock
				className="flex justify-end p-2"
			>

				<ButtonBlock
					onClick={() => { setShowModalCreateRow(true) }}
					className="create-c flex items-center justify-center "
				>
					<TextBlock>Создать новый ряд</TextBlock>
				</ButtonBlock>

			</CardBlock>

			{showModalCreateRow && <ModalCreate
				title="Создание нового ряда"
				onConfirm={(rowTitle) => { handleCreateRow(rowTitle) }}
				onCancel={closeModalCreateRow}

			/>}


			<RowList />
		</PageBTW>
	)
}
