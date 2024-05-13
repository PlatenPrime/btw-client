import React, { useState } from 'react'
import { ButtonBlock, HeaderBlock, PageBTW, TextBlock, ButtonGroup, Spinner } from '../../components'

import { useRowStore } from './stores/rowsStore';
import ModalCreate from '../../components/UI/Modal/ModalCreate';
import { AddIcon } from '../../components/UI/Icons';

import ContainerBlock from '../../components/UI/blocks/ContainerBlock';

import useFetchAllRows from './hooks/useFetchAllRows';
import RowBage from './components/RowBage';


export default function RowsPage() {

	const { isLoadingAllRows } = useFetchAllRows()
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

	if (isLoadingAllRows) {
		return (
			<PageBTW>
				<HeaderBlock
					className="text-transparent"
				>
					Ряди
				</HeaderBlock>
				<ContainerBlock
					className="w-full h-full flex justify-center items-center"
				>
					<Spinner color="rgb(249 115 22 )" />
				</ContainerBlock>

			</PageBTW>
		)
	}

	return (
		<PageBTW
			className="px-1"
		>
			<HeaderBlock
				className="bg-orange-500  shadow-2xl shadow-orange-500"
			>
				Ряди
			</HeaderBlock>

			<ButtonGroup
				className="flex justify-start p-2"
			>
				<ButtonGroup.Actions>
					<ButtonBlock
						onClick={() => { setShowModalCreateRow(true) }}
						className="emerald-b flex items-center justify-center "
					>
						<TextBlock className="text-xl"><AddIcon /></TextBlock>
						<TextBlock>Створити новий ряд</TextBlock>
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
				className="space-y-4"
			>
				{rows?.map((row) => <RowBage row={row} key={row._id} />)}
			</ContainerBlock>

		</PageBTW>
	)
}
