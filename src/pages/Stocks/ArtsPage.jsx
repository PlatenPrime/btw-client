import React, { useEffect, useState } from 'react'
import { ButtonBlock, CardBlock, HeaderBlock, InputBlock, PageBTW } from '../../components'
import useArtikulStore from './stores/artsStore';
import { Link } from 'react-router-dom';

export default function ArtsPage() {




	// ART STORE

	const getAllArtikuls = useArtikulStore((state) => state.getAllArtikuls);
	const getArtikulById = useArtikulStore((state) => state.getArtikulById);
	const artikuls = useArtikulStore((state) => state.artikuls);



	// STATES


	const [searchArt, setSearchArt] = useState("")
	const [searchedArts, setSearchedArts] = useState([])
	const [searchedArtsFragment, setSearchedArtsFragment] = useState(1)

	// EFFECTS 

	useEffect(() => {

		const fetchArtsFromDB = async () => {
			await getAllArtikuls()

		}

		fetchArtsFromDB()

	}, [])




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

			<CardBlock>







				<CardBlock
					className="p-1 flex flex-wrap"
				>
					<ButtonBlock
						className="lime-b"
					>
						Запит на зняття
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




				<CardBlock>
					{artikuls?.slice(0, 20).map((art) => <CardBlock><Link
						className=""
						to={`/arts/${art?._id}`}
					>
						{art?.artikul}
					</Link>
					</CardBlock>
					)}
				</CardBlock>





			</CardBlock>
		</PageBTW>
	)
}
