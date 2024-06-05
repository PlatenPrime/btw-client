import React, { useEffect, useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, InputBlock, InputSearch, PageBTW, Spinner, TextBlock } from '../../components'
import { toast } from 'react-toastify';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineSearch } from "react-icons/ai";
import { GoSearch } from "react-icons/go";



import usePosesStore from "./stores/posesStore"
import PosBage from './PosBage';
import { exportToExcelPoses } from '../../utils/exportExcel';
import { SiMicrosoftexcel } from 'react-icons/si';
import { useDebouncedCallback } from 'use-debounce'
import useFetchArts from '../../hooks/useFetchArts';
import PaginationBlock from '../Arts/components/PaginationBlock';








export default function StocksPage() {

	const { artsDB, loadingArtsDB, errorArtsDB } = useFetchArts();

	const { allPoses, getAllPoses } = usePosesStore()




	// CONSTANTS

	const step = 10




	// STATES


	const [searchValue, setSearchValue] = useState("")
	const [filteredStocks, setFilteredStocks] = useState([]);
	const [page, setPage] = useState(1);

	const [isLoadingPoses, setIsLoadingPoses] = useState(false)


	// EFFECTS 

	useEffect(() => {


		const fetchPoses = async () => {
			try {
				setIsLoadingPoses(true)

				await getAllPoses()


			} catch (error) {
				console.log(error);

			} finally {
				setIsLoadingPoses(false)
			}
		}

		fetchPoses()

	}, [])

	// HANDLERS

	function handleFilterPoses(searchValue) {
		const filtered = allPoses?.filter((pos) =>
			pos.artikul.toLowerCase().includes(searchValue.toLowerCase().trim())
		);


		if (filtered.length === 0) {
			toast.info("По запиту нічого не знайдено")
		}

		setFilteredStocks(filtered);
		setPage(1)
	}



	const handleSearch = useDebouncedCallback((term) => {

		setSearchValue(term);
		handleFilterPoses(term)

	}, 500);



	useEffect(() => {
		setFilteredStocks(allPoses)

	}, [allPoses])



	return (
		<PageBTW
			className="space-y-4 px-1 "
			isLoading={isLoadingPoses}
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


				{isLoadingPoses ?
					<Spinner color="emerald" />
					:
					<CardBlock className="space-y-2">
						{filteredStocks?.length === 0
							?
							<TextBlock>Нічого не знайдено</TextBlock>
							:
							filteredStocks?.length === allPoses.length
								? allPoses?.slice(step * page - step, step * page).map((pos) => <PosBage key={pos._id} pos={pos} nameukr={artsDB?.find(artikul => artikul.artikul === pos.artikul)?.nameukr} />)
								: filteredStocks?.slice(step * page - step, step * page).map((pos) => <PosBage key={pos._id} pos={pos} nameukr={artsDB?.find(artikul => artikul.artikul === pos.artikul)?.nameukr} />)}

					</CardBlock>
				}
			</ContainerBlock>

		</PageBTW>
	)
}
