import React, { useState } from 'react';
import { ButtonBlock, ButtonGroup, HeaderBlock, PageBTW, Spinner } from '../../components';

import { AddIcon } from '../../components/UI/Icons';
import ModalCreate from '../../components/UI/Modal/ModalCreate';
import { useRowStore } from './stores/rowsStore';

import ContainerBlock from '../../components/UI/blocks/ContainerBlock';

import RowBage from './components/RowBage';
import useFetchAllRows from './hooks/useFetchAllRows';


export default function RowsPage() {

	const { rows, isAllRowsLoading, error } = useFetchAllRows()
	const { createRow } = useRowStore()

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
			// isLoading={isAllRowsLoading}
			error={error}
		>
			<HeaderBlock
				className=" text-orange-300 font-bold "
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
						<AddIcon />Ряд
					</ButtonBlock>
				</ButtonGroup.Actions>
			</ButtonGroup>

			{showModalCreateRow && <ModalCreate
				title="Створення нового ряду"
				onConfirm={(rowTitle) => { handleCreateRow(rowTitle) }}
				onCancel={() => setShowModalCreateRow(false)}
				isCreating={isRowCreating}

			/>}


			{isAllRowsLoading ? <Spinner color="rgb(253 186 116)"/> : <ContainerBlock
				className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
			>
				{rows?.map((row) => <RowBage row={row} key={row._id} />)}
			</ContainerBlock>}


		</PageBTW>
	)
}
