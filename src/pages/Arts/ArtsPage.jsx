import React, { useEffect, useState } from 'react'
import { ButtonBlock, ButtonGroup, ContainerBlock, HeaderBlock, PageBTW, Spinner, TextBlock, InputSearch } from '../../components'
import { toast } from 'react-toastify';
import useFetchRemains from '../../hooks/useFetchRemains';
import { Link } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce'
import useFetchArts from '../../hooks/useFetchArts';
import PaginationBlock from './components/PaginationBlock';
import ArtsContainer from './components/ArtsContainer';


export default function ArtsPage() {

	const { artsDB, loadingArtsDB, errorArtsDB } = useFetchArts();
	const { remains } = useFetchRemains()

	// CONSTANTS

	const step = 10


	// STATES

	const [filteredArts, setFilteredArts] = useState([]);
	const [page, setPage] = useState(1);


	// EFFECTS 

	useEffect(() => {
		setFilteredArts(artsDB)

	}, [artsDB])


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



	const handleSearch = useDebouncedCallback((term) => {
		handleFilterArts(term)
	}, 500);



	if (loadingArtsDB) {
		return (
			<PageBTW>
				<HeaderBlock
					className="text-transparent"
				>
					Артикули
				</HeaderBlock>
				<ContainerBlock
					className="w-full h-full flex justify-center items-center"
				>
					<Spinner color="#0ea5e9" />
				</ContainerBlock>

			</PageBTW>
		)
	}



	return (
		<PageBTW
			className="space-y-4 px-1 "
		>

			<HeaderBlock
				className="bg-sky-500  shadow-2xl shadow-sky-500 "
			>
				<TextBlock className="">
					Артикули
				</TextBlock>



			</HeaderBlock>


			<ButtonGroup
			>
				<ButtonGroup.Actions>

				</ButtonGroup.Actions>
				<ButtonGroup.Navigation>
					<ButtonBlock
						className="emerald-b-n "
					>
						<Link
							to="/arts/updating"
						>
							Оновлення даних
						</Link>
					</ButtonBlock>
				</ButtonGroup.Navigation>
			</ButtonGroup>




			<ContainerBlock>

				<InputSearch handleSearch={handleSearch} />

				<PaginationBlock
					filteredArts={filteredArts}
					page={page}
					step={step}
					setPage={setPage}
					artsDB={artsDB}
				/>


					<ArtsContainer
						filteredArts={filteredArts}
						artsDB={artsDB}
						step={step}
						page={page}
						remains={remains}
					/>
				
			</ContainerBlock>



		</PageBTW >
	)
}
