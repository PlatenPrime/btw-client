import React, { useState } from 'react'
import { ButtonBlock, HeaderBlock, PageBTW, TextBlock, ButtonGroup, Spinner } from '../../components'

import { useRowStore } from './stores/rowsStore';
import ModalCreate from '../../components/UI/Modal/ModalCreate';
import { AddIcon } from '../../components/UI/Icons';

import ContainerBlock from '../../components/UI/blocks/ContainerBlock';

import useFetchAllRows from './hooks/useFetchAllRows';
import RowBage from './components/RowBage';


export default function RowsPage() {

	const { isAllRowsLoading } = useFetchAllRows()
	const { rows, createRow } = useRowStore()

	const [showModalCreateRow, setShowModalCreateRow] = useState(false)
	const [isRowCreating, setIsRowCreating] = useState(false)

	async function handleCreateRow(rowTitle) {
		try {
			setIsRowCreating(true)
			await createRow(rowTitle);
		} catch (error) {
			console.error('Ошибка при создании ряда:', error);
		} finally {
			setIsRowCreating(false)
			setShowModalCreateRow(false)
		}
	}



	return (
		<PageBTW
			className=""
			isLoading={isAllRowsLoading}
		>
			<HeaderBlock
				className="bg-orange-500  shadow-sm shadow-orange-500"
			>
				Ряди
			</HeaderBlock>

			<ButtonGroup
				className="flex justify-start p-2"
			>

				<ButtonGroup.Navigation></ButtonGroup.Navigation>


				<ButtonGroup.Actions>
					<ButtonBlock
						onClick={() => { setShowModalCreateRow(true) }}
						className="emerald-b flex items-center justify-center "
					>
						<AddIcon />Створити новий ряд
					</ButtonBlock>
				</ButtonGroup.Actions>
			</ButtonGroup>

			{showModalCreateRow && <ModalCreate
				title="Створення нового ряду"
				onConfirm={(rowTitle) => { handleCreateRow(rowTitle) }}
				onCancel={() => setShowModalCreateRow(false)}
				isCreating={isRowCreating}

			/>}

			<ContainerBlock
				className="flex flex-col gap-2"
			>
				{rows?.map((row) => <RowBage row={row} key={row._id} />)}
			</ContainerBlock>

		</PageBTW>
	)
}
