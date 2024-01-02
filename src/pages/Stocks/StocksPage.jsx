import React, { useEffect, useState } from 'react'
import { ButtonBlock, CardBlock, HeaderBlock, PageBTW, TextBlock, ButtonGroup } from '../../components'
import { RowList } from './RowList'
import { useRowStore } from './stores/rowsStore';
import ModalCreate from '../../components/UI/Modal/ModalCreate';
import { AddIcon } from '../../components/UI/Icons/';
import { Link } from 'react-router-dom';
import { exportToExcelPoses } from '../../utils/exportExcel';
import { SiMicrosoftexcel } from 'react-icons/si';
import usePosesStore from './stores/posesStore';
import useFetchArts from '../../hooks/useFetchArts';


export default function StocksPage() {

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
		<PageBTW>

			<HeaderBlock
				className="border border-slate-500 bg-slate-500/10 shadow-2xl shadow-slate-500/50"
			>
				Запаси
			</HeaderBlock>


			<CardBlock
				className="min-h-screen"
			>

				<ButtonGroup
					className="flex justify-start p-2"
				>

					<ButtonBlock
						onClick={() => { setShowModalCreateRow(true) }}
						className="emerald-b flex items-center justify-center "
					>

						<TextBlock className="text-2xl"><AddIcon /></TextBlock>
						<TextBlock>Створити новий ряд</TextBlock>
					</ButtonBlock>

					<ButtonBlock
						onClick={() => exportToExcelPoses(allPoses, artsDB)}
						className=" green-b flex items-center space-x-1  "
					>
						< SiMicrosoftexcel className='text-2xl' />
						<TextBlock>
							Експорт в Excel
						</TextBlock>
					</ButtonBlock>





				</ButtonGroup>

				{showModalCreateRow && <ModalCreate
					title="Створення нового ряду"
					onConfirm={(rowTitle) => { handleCreateRow(rowTitle) }}
					onCancel={closeModalCreateRow}

				/>}


				<RowList />
			</CardBlock>

		</PageBTW>
	)
}
