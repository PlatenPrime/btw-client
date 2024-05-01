import React, { useEffect, useState } from 'react'
import { ButtonBlock, CardBlock, HeaderBlock, PageBTW, TextBlock, ButtonGroup, Spinner } from '../../components'
import { RowList } from './RowList'
import { useRowStore } from './stores/rowsStore';
import ModalCreate from '../../components/UI/Modal/ModalCreate';
import { AddIcon } from '../../components/UI/Icons';
import { Link } from 'react-router-dom';
import { exportToExcelPoses } from '../../utils/exportExcel';
import { SiMicrosoftexcel } from 'react-icons/si';
import usePosesStore from './stores/posesStore';
import useFetchArts from '../../hooks/useFetchArts';
import ContainerBlock from '../../components/UI/blocks/ContainerBlock';


export default function RowsPage() {

	const createRow = useRowStore((state) => state.createRow);
	const { getAllPoses, allPoses } = usePosesStore()
	const getAllRows = useRowStore((state) => state.getAllRows);

	const { artsDB, loadingArtsDB, errorArtsDB } = useFetchArts()


	const [isRowsLoading, setIsRowsLoading] = useState(false)

	const [showModalCreateRow, setShowModalCreateRow] = useState(false)
	const [isCreatingRow, setIsCreatingRow] = useState(false)





	useEffect(() => {


		const fetchAllPoses = async () => {
			try {


				const allPoses = await getAllPoses()
				console.log(allPoses);

			} catch (error) {
				console.log(error);

			}
		}

		fetchAllPoses()


	}, [])





	async function fetchRows() {
		try {
			setIsRowsLoading(true)
			await getAllRows();
		} catch (error) {
			console.log(error)
		} finally {
			setIsRowsLoading(false)
		}
	}



	useEffect(() => {
		// При монтировании компонента получите все Row
		fetchRows()
	}, []);










	function closeModalCreateRow() {
		setShowModalCreateRow(false);
	}


	async function handleCreateRow(rowTitle) {

		try {
			setIsCreatingRow(true)
			await createRow(rowTitle);


		} catch (error) {
			console.error('Ошибка при создании ряда:', error);
		} finally {
			setIsCreatingRow(false)
			setShowModalCreateRow(false)

		}

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




			{isRowsLoading ?


				<ContainerBlock
					className="w-full h-full flex justify-start items-center"
				>
					<Spinner color="rgb(249 115 22)" />
				</ContainerBlock>

				:

				<>



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
						onCancel={closeModalCreateRow}
						isCreating={isCreatingRow}

					/>}


					<ContainerBlock
						className=""
					>
						<RowList />
					</ContainerBlock>

				</>
			}


		</PageBTW>
	)
}
