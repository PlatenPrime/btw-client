import React, { useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, InputBlock, PageBTW, Spinner, TextBlock } from '../../components'
import ArtBage from './ArtBage';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useArtContext } from '../../ArtContext';
import { toast } from 'react-toastify';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineSearch } from "react-icons/ai";
import useFetchRemains from '../../hooks/useFetchRemains';
import { SearchIcon } from '../../components/UI/Icons';
import { Link } from 'react-router-dom';

export default function ArtsPage() {

	const { artsDB, loadingArtsDB, errorArtsDB } = useArtContext();
	const { remains } = useFetchRemains()
	console.log(remains)

	// CONSTANTS

	const step = 10




	// STATES


	const [searchValue, setSearchValue] = useState("")
	const [filteredArts, setFilteredArts] = useState([]);
	const [page, setPage] = useState(1);


	// EFFECTS 



	// HANDLERS

	function handleFilterArts(searchValue) {
		const filtered = artsDB.filter((art) =>
			art.artikul.toLowerCase().includes(searchValue.toLowerCase().trim()) ||
			art.nameukr.toLowerCase().includes(searchValue.toLowerCase().trim()) ||
			art.namerus.toLowerCase().includes(searchValue.toLowerCase().trim())
		);


		if (filtered.length === 0) {
			toast.info("По запиту нічого не знайдено")
		}

		setFilteredArts(filtered);
		setPage(1)
	}



	return (
		<PageBTW
			className="space-y-4 "
		>

			<HeaderBlock
				className=" shadow-md shadow-sky-500 "
			>
				<TextBlock className="">
					Артикули
				</TextBlock>



			</HeaderBlock>



			<ButtonGroup
			>


				<ButtonBlock
					className="emerald-b "
				>
					<Link
						to="/arts/updating"
					>
						Оновлення даних
					</Link>
				</ButtonBlock>

			</ButtonGroup>

			<ContainerBlock
				className="space-y-4"
			>

				<CardBlock
					className="flex flex-wrap justify-center  "
				>



					<form
						className=" flex flex-col sm:flex-row justify-center space-y-2  sm:space-y-0 sm:space-x-3"
						onSubmit={(e) => {
							e.preventDefault()
							handleFilterArts()
						}}
					>

						<InputBlock
							onChange={(e) => {
								setSearchValue(e.target.value);
								handleFilterArts(e.target.value)
							}}
							placeholder="Введи артикул або назву..."
							className="text-xl outline-none border-none p-3 px-8
								 placeholder:font-light
								"
						/>


					</form>



				</CardBlock>







				{filteredArts?.length === 0 || filteredArts?.length === artsDB?.length ?
					<CardBlock
						className="flex flex-wrap justify-between p-2  rounded"
					>

						<TextBlock>
							Всього: {artsDB?.length}
						</TextBlock>



						{artsDB ?
							<TextBlock
								className=""
							>
								{step * page - step + 1} - {step * page < artsDB?.length ? step * page : artsDB?.length}
							</TextBlock>

							:
							null
						}









						<CardBlock
							className="space-x-3 flex flex-wrap "
						>

							<ButtonBlock onClick={() => setPage(1)} className="sky-b border-none bg-sky-500/10 " disabled={page === 1}>
								<TextBlock className="text-lg lg:text-2xl">
									<AiOutlineDoubleLeft />
								</TextBlock>
							</ButtonBlock>

							<ButtonBlock onClick={() => setPage((prev) => prev - 1)} className="sky-b border-none bg-sky-500/10" disabled={page === 1}>

								<TextBlock className="text-lg lg:text-2xl">
									<AiOutlineArrowLeft />
								</TextBlock>
							</ButtonBlock>

							<TextBlock>
								Сторінка: {page}
							</TextBlock>

							<ButtonBlock onClick={() => setPage((prev) => prev + 1)} className="sky-b border-none bg-sky-500/10" disabled={artsDB?.length / step / page < 1}>

								<TextBlock className="text-lg lg:text-2xl">
									<AiOutlineArrowRight />
								</TextBlock>
							</ButtonBlock>

							<ButtonBlock onClick={() => setPage(Math.ceil(artsDB?.length / step))} className="sky-b border-none bg-sky-500/10 " disabled={artsDB?.length / step / page < 1}>

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
							Знайдено: {filteredArts?.length}
						</TextBlock>



						<TextBlock
							className="text-xl"

						>
							{step * page - step + 1} - {step * page < filteredArts?.length ? step * page : filteredArts?.length}
						</TextBlock>



						<CardBlock
							className="space-x-3 flex flex-wrap"
						>

							<ButtonBlock onClick={() => setPage(1)} className="sky-b border-none bg-sky-500/10 " disabled={page === 1}>
								<TextBlock className="text-lg lg:text-2xl">
									<AiOutlineDoubleLeft />
								</TextBlock>
							</ButtonBlock>

							<ButtonBlock onClick={() => setPage((prev) => prev - 1)} className="sky-b border-none bg-sky-500/10 " disabled={page === 1}>
								<TextBlock className="text-lg lg:text-2xl">
									<AiOutlineArrowLeft />
								</TextBlock>
							</ButtonBlock>

							<TextBlock>
								Сторінка: {page}
							</TextBlock>


							<ButtonBlock onClick={() => setPage((prev) => prev + 1)} className="sky-b border-none bg-sky-500/10 " disabled={filteredArts?.length / step / page < 1}>
								<TextBlock className="text-lg lg:text-2xl">
									<AiOutlineArrowRight />
								</TextBlock>
							</ButtonBlock>

							<ButtonBlock onClick={() => setPage(Math.ceil(filteredArts?.length / step))} className="sky-b border-none bg-sky-500/10 " disabled={filteredArts?.length / step / page < 1}>
								<TextBlock className="text-lg lg:text-2xl">
									<AiOutlineDoubleRight />
								</TextBlock>

							</ButtonBlock>

						</CardBlock>

					</CardBlock>


				}







				{loadingArtsDB ?
					<Spinner color="lightblue" />
					:
					<CardBlock className="space-y-2">
						{filteredArts?.length === 0
							? artsDB?.slice(step * page - step, step * page).map((art) => <ArtBage key={art._id} art={art} remains={remains} />)
							: filteredArts?.slice(step * page - step, step * page).map((art) => <ArtBage key={art._id} art={art} remains={remains} />)}

					</CardBlock>

				}







			</ContainerBlock>





		</PageBTW>
	)
}
