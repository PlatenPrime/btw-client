import React, { useState } from 'react'
import { ButtonBlock, CardBlock, HeaderBlock, PageBTW, TextBlock } from '../../components'
import { RowList } from './RowList'
import { useRowStore } from './stores/rowsStore';
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
			console.error('Ошибка при создании ряда:', error);
		} finally {
			setShowModalCreateRow(false)

		}

	}







	return (
		<PageBTW>

			<HeaderBlock className="bg-slate-500/20  border-slate-500" >
				Запаси
			</HeaderBlock>


			<CardBlock
			className = "min-h-screen"
			>

				<CardBlock
					className="flex justify-start p-2"
				>

					<ButtonBlock
						onClick={() => { setShowModalCreateRow(true) }}
						className="emerald-b flex items-center justify-center "
					>
						<TextBlock>Створити новий ряд</TextBlock>
					</ButtonBlock>

				</CardBlock>

				{showModalCreateRow && <ModalCreate
					title="Создание нового ряда"
					onConfirm={(rowTitle) => { handleCreateRow(rowTitle) }}
					onCancel={closeModalCreateRow}

				/>}


				<RowList />
			</CardBlock>

		</PageBTW>
	)
}
