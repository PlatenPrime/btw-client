import React, { useEffect, useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, InputBlock, PageBTW, Spinner, TextBlock } from '../../components'
import { useArtContext } from '../../ArtContext';
import { toast } from 'react-toastify';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineSearch } from "react-icons/ai";
import { GoSearch } from "react-icons/go";
import useFetchRemains from '../../hooks/useFetchRemains';
import { SearchIcon } from '../../components/UI/Icons';
import { Link } from 'react-router-dom';
import ArtBage from './ArtBage';


import usePosesStore from "./stores/posesStore"
import StockBage from './StockBage';
import { exportToExcelPoses } from '../../utils/exportExcel';
import { SiMicrosoftexcel } from 'react-icons/si';








export default function StocksPage() {

	const { artsDB, loadingArtsDB, errorArtsDB } = useArtContext();


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



	return (
		<PageBTW
			className="space-y-4 "
		>

			<HeaderBlock
				className=" shadow-md shadow-emerald-500 "
			>
				<TextBlock className="">
					Запаси
				</TextBlock>



			</HeaderBlock>



			<ButtonGroup
			>


				<ButtonBlock
					onClick={() => exportToExcelPoses(allPoses, artsDB)}
					className=" green-b flex items-center space-x-1  "
				>
					< SiMicrosoftexcel className='text-xl' />
					<TextBlock>
						Експорт в Excel
					</TextBlock>
				</ButtonBlock>

			</ButtonGroup>

			<ContainerBlock
				className="space-y-4 "
			>






				<CardBlock
					className="flex  justify-start rounded-xl bg-slate-700 space-x-3 pl-4 "
				>


					<TextBlock
						className="text-2xl font-bold"
					><GoSearch />
					</TextBlock>
					<InputBlock
						onChange={(e) => {
							setSearchValue(e.target.value);
							handleFilterPoses(e.target.value)
						}}
						placeholder="Пошук по позиції"
						className="text-xl outline-none border-none p-3 px-8 bg-slate-700 focus:bg-slate-600 w-full
								 placeholder:font-light rounded-xl rounded-l-none
								"
					/>



				</CardBlock>







				{filteredStocks?.length === 0 || filteredStocks?.length === allPoses?.length ?
					<CardBlock
						className="flex flex-wrap justify-between p-2  rounded-xl bg-slate-700"
					>

						<TextBlock>
							Всього: {allPoses?.length > 0 && allPoses?.length}
						</TextBlock>



						{allPoses.length > 0 ?
							<TextBlock
								className=""
							>
								{step * page - step + 1} - {step * page < allPoses?.length ? step * page : allPoses?.length}
							</TextBlock>

							:
							null
						}









						<CardBlock
							className="space-x-3 flex flex-wrap "
						>

							<ButtonBlock onClick={() => setPage(1)} className="emerald-b border-none bg-emerald-500/10 " disabled={page === 1}>
								<TextBlock className="text-lg lg:text-2xl">
									<AiOutlineDoubleLeft />
								</TextBlock>
							</ButtonBlock>

							<ButtonBlock onClick={() => setPage((prev) => prev - 1)} className="emerald-b border-none bg-emerald-500/10" disabled={page === 1}>

								<TextBlock className="text-lg lg:text-2xl">
									<AiOutlineArrowLeft />
								</TextBlock>
							</ButtonBlock>

							<TextBlock>
								Сторінка: {page}
							</TextBlock>

							<ButtonBlock onClick={() => setPage((prev) => prev + 1)} className="emerald-b border-none bg-emerald-500/10" disabled={allPoses?.length / step / page < 1}>

								<TextBlock className="text-lg lg:text-2xl">
									<AiOutlineArrowRight />
								</TextBlock>
							</ButtonBlock>

							<ButtonBlock onClick={() => setPage(Math.ceil(allPoses?.length / step))} className="emerald-b border-none bg-emerald-500/10 " disabled={allPoses?.length / step / page < 1}>

								<TextBlock className="text-lg lg:text-2xl">
									<AiOutlineDoubleRight />
								</TextBlock>
							</ButtonBlock>



						</CardBlock>

					</CardBlock>

					:

					<CardBlock
						className="flex flex-wrap justify-between p-2 "
					>




						<TextBlock>
							Знайдено: {filteredStocks?.length}
						</TextBlock>



						<TextBlock
							className="text-xl"

						>
							{step * page - step + 1} - {step * page < filteredStocks?.length ? step * page : filteredStocks?.length}
						</TextBlock>



						<CardBlock
							className="space-x-3 flex flex-wrap"
						>

							<ButtonBlock onClick={() => setPage(1)} className="sky-b border-none bg-emerald-500/10 " disabled={page === 1}>
								<TextBlock className="text-lg lg:text-2xl">
									<AiOutlineDoubleLeft />
								</TextBlock>
							</ButtonBlock>

							<ButtonBlock onClick={() => setPage((prev) => prev - 1)} className="emerald-b border-none bg-emerald-500/10 " disabled={page === 1}>
								<TextBlock className="text-lg lg:text-2xl">
									<AiOutlineArrowLeft />
								</TextBlock>
							</ButtonBlock>

							<TextBlock>
								Сторінка: {page}
							</TextBlock>


							<ButtonBlock onClick={() => setPage((prev) => prev + 1)} className="emerald-b border-none bg-emerald-500/10 " disabled={filteredStocks?.length / step / page < 1}>
								<TextBlock className="text-lg lg:text-2xl">
									<AiOutlineArrowRight />
								</TextBlock>
							</ButtonBlock>

							<ButtonBlock onClick={() => setPage(Math.ceil(filteredStocks?.length / step))} className="emerald-b border-none bg-emerald-500/10 " disabled={filteredStocks?.length / step / page < 1}>
								<TextBlock className="text-lg lg:text-2xl">
									<AiOutlineDoubleRight />
								</TextBlock>

							</ButtonBlock>

						</CardBlock>

					</CardBlock>


				}







				{isLoadingPoses ?
					<Spinner color="emerald" />
					:
					<CardBlock className="space-y-2">
						{filteredStocks?.length === 0
							? allPoses?.slice(step * page - step, step * page).map((pos) => <StockBage key={pos._id} pos={pos} nameukr={artsDB?.find(artikul => artikul.artikul === pos.artikul)?.nameukr} />)
							: filteredStocks?.slice(step * page - step, step * page).map((pos) => <StockBage key={pos._id} pos={pos} nameukr={artsDB?.find(artikul => artikul.artikul === pos.artikul)?.nameukr} />)}

					</CardBlock>

				}







			</ContainerBlock>





		</PageBTW>
	)
}
