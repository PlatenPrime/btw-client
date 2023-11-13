import React, { useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, HeaderBlock, InputBlock, PageBTW, Spinner, TextBlock } from '../../components'
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

	function handleFilterArts() {
		const filtered = artsDB.filter((art) =>
			art.artikul.toLowerCase().includes(searchValue.toLowerCase().trim()) ||
			art.nameukr.toLowerCase().includes(searchValue.toLowerCase().trim()) ||
			art.namerus.toLowerCase().includes(searchValue.toLowerCase().trim())
		);

		if (searchValue.length === 0) {
			toast.error("Нічого не забув?")
		}

		if (filtered.length === 0) {
			toast.info("По запиту нічого не знайдено")
		}

		setFilteredArts(filtered);
		setPage(1)
	}



	return (
		<PageBTW
			className="space-y-4"
		>

			<HeaderBlock
				className="border border-sky-500 shadow-md shadow-sky-500 "
			>
				<TextBlock className="">
					Артикули
				</TextBlock>



			</HeaderBlock>

			<CardBlock
				className="p-1 space-y-2 min-h-screen"
			>

				<ButtonGroup
				>


					<ButtonBlock
						className="emerald-b "
					>
						<Link
							to="/arts/updating"
						>
							Оновлення артикулів
						</Link>
					</ButtonBlock>

				</ButtonGroup>



				<CardBlock
					className="flex flex-wrap justify-center"
				>



					<CardBlock

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

								}}
								placeholder="Введи артикул або назву..."
								className="text-3xl bg-sky-900 bg-opacity-5 border-sky-600 focus:border-sky-500 focus:shadow-lg  focus:shadow-sky-600 p-3
								placeholder:text-sky-300/50 placeholder:font-light
								"
							/>

							<ButtonBlock
								className="sky-b text-sky-500 text-4xl px-6 hover:bg-sky-500/10 "

							>

								<SearchIcon />
							</ButtonBlock>
						</form>

					</CardBlock>

				</CardBlock>







				{filteredArts?.length === 0 || filteredArts?.length === artsDB?.length ?
					<CardBlock
						className="flex flex-wrap justify-between p-2 border  border-sky-500 rounded"
					>

						<TextBlock>
							Всього: {artsDB?.length}
						</TextBlock>

						<TextBlock
							className="text-xl"
						>
							{step * page - step + 1} - {step * page < artsDB?.length ? step * page : artsDB?.length}
						</TextBlock>








						<CardBlock
							className="space-x-3 flex flex-wrap"
						>

							<ButtonBlock onClick={() => setPage(1)} className="sky-b " disabled={page === 1}>
								<AiOutlineDoubleLeft />
							</ButtonBlock>

							<ButtonBlock onClick={() => setPage((prev) => prev - 1)} className="sky-b" disabled={page === 1}>
								<AiOutlineArrowLeft />
							</ButtonBlock>

							<TextBlock>
								Сторінка: {page}
							</TextBlock>

							<ButtonBlock onClick={() => setPage((prev) => prev + 1)} className="sky-b" disabled={artsDB?.length / step / page < 1}>
								<AiOutlineArrowRight />

							</ButtonBlock>

							<ButtonBlock onClick={() => setPage(Math.ceil(artsDB?.length / step))} className="sky-b" disabled={artsDB?.length / step / page < 1}>
								<AiOutlineDoubleRight />

							</ButtonBlock>



						</CardBlock>

					</CardBlock>

					:

					<CardBlock
						className="flex flex-wrap justify-between p-2 border  border-sky-500 rounded bg-sky-500/20"
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

							<ButtonBlock onClick={() => setPage(1)} className="indigo-b " disabled={page === 1}>
								<AiOutlineDoubleLeft />
							</ButtonBlock>

							<ButtonBlock onClick={() => setPage((prev) => prev - 1)} className="indigo-b" disabled={page === 1}>
								<AiOutlineArrowLeft />
							</ButtonBlock>

							<TextBlock>
								Сторінка: {page}
							</TextBlock>


							<ButtonBlock onClick={() => setPage((prev) => prev + 1)} className="indigo-b" disabled={filteredArts?.length / step / page < 1}>
								<AiOutlineArrowRight />
							</ButtonBlock>

							<ButtonBlock onClick={() => setPage(Math.ceil(filteredArts?.length / step))} className="indigo-b" disabled={filteredArts?.length / step / page < 1}>
								<AiOutlineDoubleRight />

							</ButtonBlock>

						</CardBlock>

					</CardBlock>


				}







				{loadingArtsDB ?
					<Spinner color="lightblue" />
					:
					<CardBlock className="space-y-1">
						{filteredArts?.length === 0
							? artsDB?.slice(step * page - step, step * page).map((art) => <ArtBage key={art._id} art={art} remains={remains} />)
							: filteredArts?.slice(step * page - step, step * page).map((art) => <ArtBage key={art._id} art={art} remains={remains} />)}

					</CardBlock>

				}







			</CardBlock>
		</PageBTW>
	)
}
