import React, { useEffect, useState } from 'react'
import { ButtonBlock, CardBlock, HeaderBlock, InputBlock, PageBTW, Spinner, TextBlock } from '../../components'
import ArtBage from './ArtBage';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useArtContext } from '../../ArtContext';
import { toast } from 'react-toastify';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import useFetchRemains from '../../hooks/useFetchRemains';

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

				<CardBlock
					className="p-1 flex items-center justify-start flex-wrap space-x-1 "
				>
					<ButtonBlock
						className="lime-b text-base hidden xl:flex"
					>
						Запит на зняття
					</ButtonBlock>

					<ButtonBlock
						className="orange-b text-base hidden xl:flex"
					>
						Встановлення зон
					</ButtonBlock>

				</CardBlock>



				<CardBlock
					className="flex flex-wrap justify-center"
				>



					<CardBlock

					>

						<form
							className=" flex flex-wrap  justify-end space-x-3"
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
								className=" bg-indigo-900 bg-opacity-5 border-indigo-600 focus:border-indigo-500 focus:shadow-lg  focus:shadow-indigo-600 p-3"
							/>

							<ButtonBlock
								className="indigo-b"
							>
								Пошук
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
						className="flex flex-wrap justify-between p-2 border  border-indigo-500 rounded bg-indigo-500/20"
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
							? artsDB?.slice(step * page - step, step * page).map((art) => <ArtBage art={art} remains={remains} />)
							: filteredArts?.slice(step * page - step, step * page).map((art) => <ArtBage art={art} remains={remains} />)}

					</CardBlock>

				}







			</CardBlock>
		</PageBTW>
	)
}
