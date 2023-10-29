import React, { useEffect, useState } from 'react'
import { ButtonBlock, CardBlock, HeaderBlock, InputBlock, PageBTW } from '../../components'
import useArtikulStore from './stores/artsStore';
import ArtBage from './ArtBage';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function ArtsPage() {




	// ART STORE

	const getAllArtikuls = useArtikulStore((state) => state.getAllArtikuls);
	const artikuls = useArtikulStore((state) => state.artikuls);




	// STATES


	const [searchArt, setSearchArt] = useState("")
	const [searchedArts, setSearchedArts] = useState([])

	const [page, setPage] = useState(0);
	const [displayedArts, setDisplayedArts] = useState([])

	// EFFECTS 

	useEffect(() => {

		const fetchArtsFromDB = async () => {
			const artikuls = await getAllArtikuls()
			console.log(artikuls)

		}

		fetchArtsFromDB()

	})







	// HANDLERS





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
					className="mx-auto flex items-center justify-center space-x-3"
				>


					<InputBlock
						onChange={(e) => { setSearchArt(e.target.value) }}
						placeholder="Введи артикул або назву..."
					/>

					<ButtonBlock
						className="indigo-b"
					>
						Пошук
					</ButtonBlock>


				</CardBlock>




				<CardBlock
					className="space-y-1"
				>
					{artikuls?.slice(0, 10 * page).map((art) => <ArtBage art={art} />)}

					<ButtonBlock
						onClick={() => { setPage(prev => prev + 1) }}
						className="sky-b"
					>
						Наступні
					</ButtonBlock>

				</CardBlock>








			</CardBlock>
		</PageBTW>
	)
}
