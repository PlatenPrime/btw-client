import React, { useEffect, useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, InputSearch, PageBTW, TextBlock } from '../../components'
import { toast } from 'react-toastify';
import PosBage from './PosBage';
import { exportToExcelPoses } from '../../utils/exportExcel';
import { SiMicrosoftexcel } from 'react-icons/si';
import { useDebouncedCallback } from 'use-debounce'
import useFetchArts from '../../hooks/useFetchArts';
import PaginationBlock from '../../components/UI/blocks/PaginationBlock';
import useFetchAllPoses from './hooks/useFetchAllPoses';

export default function StocksPage() {

	const step = 10

	const { artsDB, loadingArtsDB, errorArtsDB } = useFetchArts();
	const { allPoses, isAllPosesLoading } = useFetchAllPoses()
	const [filteredStocks, setFilteredStocks] = useState(allPoses);
	const [page, setPage] = useState(1);

	const handleSearch = useDebouncedCallback((term) => {
		const filtered = allPoses?.filter((pos) =>
			pos.artikul.toLowerCase().includes(term.toLowerCase().trim())
		);
		if (filtered.length === 0) {
			toast.info("По запиту нічого не знайдено")
		}
		setFilteredStocks(filtered);
		setPage(1)

	}, 500);

	useEffect(() => {
		setFilteredStocks(allPoses)
	}, [allPoses])

	return (
		<PageBTW
			className="space-y-4 px-1 "
			isLoading={isAllPosesLoading || loadingArtsDB}
		>
			<HeaderBlock
				className=" shadow-2xl bg-emerald-500 shadow-emerald-500 "
			>
				<TextBlock className="">
					Позиції
				</TextBlock>
			</HeaderBlock>

			<ButtonGroup
			>
				<ButtonGroup.Actions>
					<ButtonBlock
						onClick={() => exportToExcelPoses(allPoses, artsDB)}
						className=" green-b flex items-center space-x-1  "
					>
						< SiMicrosoftexcel className='text-xl' />
						<TextBlock>
							Експорт в Excel
						</TextBlock>
					</ButtonBlock>
				</ButtonGroup.Actions>
			</ButtonGroup>

			<ContainerBlock
				className="space-y-4 "
			>
				<InputSearch
					handleSearch={handleSearch}
					placeholder="Пошук по позиції"
				/>

				<PaginationBlock
					allItems={allPoses}
					filteredItems={filteredStocks}
					page={page}
					step={step}
					setPage={setPage}
				/>

				<CardBlock className="space-y-2">
					{filteredStocks?.length === 0 ? (
						<TextBlock className="text-red-500">Нічого не знайдено</TextBlock>
					) : (
						(filteredStocks?.length === allPoses.length ? allPoses : filteredStocks)
							.slice(step * page - step, step * page)
							.map((pos) => (
								<PosBage
									key={pos._id}
									pos={pos}
									nameukr={artsDB?.find(artikul => artikul.artikul === pos.artikul)?.nameukr}
								/>
							))
					)}
				</CardBlock>
			</ContainerBlock>
		</PageBTW>
	)
}
