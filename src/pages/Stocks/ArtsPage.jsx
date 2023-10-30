import React, { useEffect, useState } from 'react'
import { ButtonBlock, CardBlock, HeaderBlock, InputBlock, PageBTW, Spinner, TextBlock } from '../../components'
import useArtikulStore from './stores/artsStore';
import ArtBage from './ArtBage';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useArtContext } from '../../ArtContext';

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
			art.artikul.toLowerCase().includes(searchValue.toLowerCase()) ||
			art.nameukr.toLowerCase().includes(searchValue.toLowerCase()) ||
			art.namerus.toLowerCase().includes(searchValue.toLowerCase())
		);
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
				className="p-1 space-y-2"
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
						className="mx-auto flex items-center justify-center space-x-3"
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
						/>

						<ButtonBlock
							className="indigo-b"
						>
							Пошук
						</ButtonBlock>
					</form>

				</CardBlock>



				<CardBlock
					className="flex justify-between"
				>

					{filteredArts.length > 0 && <TextBlock>
						Знайдено: {filteredArts?.length}
					</TextBlock>}

					<TextBlock>
						Сторінка: {page}
					</TextBlock>


					<TextBlock>
						Артикули: {step * page - step + 1} - {step * page < filteredArts.length ? step * page : filteredArts.length}
					</TextBlock>



					<CardBlock
						className="space-x-1"
					>

						<ButtonBlock onClick={() => setPage((prev) => prev - 1)} className="sky-b" disabled={page === 1}>
							Попередні
						</ButtonBlock>

						<ButtonBlock onClick={() => setPage((prev) => prev + 1)} className="sky-b" disabled={filteredArts.length / step < 1}>
							Наступні
						</ButtonBlock>

					</CardBlock>

				</CardBlock>

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
