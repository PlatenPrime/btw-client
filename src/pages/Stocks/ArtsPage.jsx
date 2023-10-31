import React, { useEffect, useState } from 'react'
import { ButtonBlock, CardBlock, HeaderBlock, InputBlock, PageBTW, Spinner, TextBlock } from '../../components'
import ArtBage from './ArtBage';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useArtContext } from '../../ArtContext';
import { toast } from 'react-toastify';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function ArtsPage() {

	const { artsDB, loadingArtsDB, errorArtsDB } = useArtContext();

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
				className="border border-sky-500 shadow-md shadow-sky-500"
			>
				Артикули
			</HeaderBlock>

			<CardBlock
				className="p-1 space-y-2 min-h-screen"
			>





				<CardBlock
					className="flex flex-wrap justify-between"
				>

					<CardBlock
						className="p-1 flex items-center flex-wrap space-x-1 "
					>
						<ButtonBlock
							className="lime-b"
						>
							Запит на зняття
						</ButtonBlock>

						<ButtonBlock
							className="orange-b"
						>
							Встановлення зон
						</ButtonBlock>

					</CardBlock>

					<CardBlock

					>

						<form
							className=" flex flex-wrap items-center justify-end space-x-3"
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
								className=" bg-indigo-900 bg-opacity-20 border-indigo-600/50 focus:border-indigo-600"
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

							<ButtonBlock onClick={() => setPage((prev) => prev - 1)} className="sky-b" disabled={page === 1}>
								<AiOutlineArrowLeft />

							</ButtonBlock>

							<TextBlock>
								Сторінка: {page}
							</TextBlock>

							<ButtonBlock onClick={() => setPage((prev) => prev + 1)} className="sky-b" disabled={artsDB?.length / step < 1}>
								<AiOutlineArrowRight />

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

							<ButtonBlock onClick={() => setPage((prev) => prev - 1)} className="indigo-b" disabled={page === 1}>
								<AiOutlineArrowLeft />
							</ButtonBlock>

							<TextBlock>
								Сторінка: {page}
							</TextBlock>


							<ButtonBlock onClick={() => setPage((prev) => prev + 1)} className="indigo-b" disabled={filteredArts?.length / step / page < 1}>
								<AiOutlineArrowRight />
							</ButtonBlock>

						</CardBlock>

					</CardBlock>


				}







				{loadingArtsDB ?
					<Spinner color="lightblue" />
					:
					<CardBlock className="space-y-1">
						{filteredArts?.length === 0
							? artsDB?.slice(step * page - step, step * page).map((art) => <ArtBage art={art} />)
							: filteredArts?.slice(step * page - step, step * page).map((art) => <ArtBage art={art} />)}

					</CardBlock>

				}







			</CardBlock>
		</PageBTW>
	)
}
