import React, { useEffect, useState } from 'react'
import { ButtonBlock, CardBlock, HeaderBlock, PageBTW, TextBlock, ButtonGroup } from '../../components'
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


	const { artsDB, loadingArtsDB, errorArtsDB } = useFetchArts()




	const [showModalCreateRow, setShowModalCreateRow] = useState(false)





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

				<ButtonBlock
					onClick={() => { setShowModalCreateRow(true) }}
					className="emerald-b flex items-center justify-center "
				>

					<TextBlock className="text-xl"><AddIcon /></TextBlock>
					<TextBlock>Створити новий ряд</TextBlock>
				</ButtonBlock>

			





			</ButtonGroup>

			{showModalCreateRow && <ModalCreate
				title="Створення нового ряду"
				onConfirm={(rowTitle) => { handleCreateRow(rowTitle) }}
				onCancel={closeModalCreateRow}

			/>}


			<ContainerBlock>
				<RowList />
			</ContainerBlock>



		</PageBTW>
	)
}
