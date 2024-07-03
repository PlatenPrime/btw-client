import React, { useEffect, useState } from 'react'
import { ButtonBlock, ButtonGroup, ContainerBlock, HeaderBlock, PageBTW, Spinner, TextBlock, InputSearch } from '../../components'
import { toast } from 'react-toastify';
import useFetchRemains from '../../hooks/useFetchRemains';
import { Link } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce'
import useFetchArts from '../../hooks/useFetchArts';
import PaginationBlock from '../../components/UI/blocks/PaginationBlock';
import ArtsContainer from './components/ArtsContainer';
import { UpdateIcon } from '../../components/UI/Icons';


export default function ArtsPage() {

	const { artsDB, loadingArtsDB, errorArtsDB } = useFetchArts();
	const { remains } = useFetchRemains()


	const [filteredArts, setFilteredArts] = useState([]);
	const [page, setPage] = useState(1);
	const step = 10

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



	return (
		<PageBTW
			isLoading={loadingArtsDB}
			className=" "
		>

			<HeaderBlock
				className="bg-sky-500  shadow-lg shadow-sky-500 "
			>
				<TextBlock className="">
					Артикули
				</TextBlock>
			</HeaderBlock>


			<ButtonGroup
			>

				<ButtonGroup.Navigation>
					<ButtonBlock
						className="emerald-b-n"
					>
						<Link
							to="/arts/updating"
							className="flex items-center space-x-2"
						>
							<UpdateIcon />
							Оновлення артикулів
						</Link>
					</ButtonBlock>
				</ButtonGroup.Navigation>

				<ButtonGroup.Actions>

				</ButtonGroup.Actions>
			</ButtonGroup>


			<ContainerBlock>

				<InputSearch handleSearch={handleSearch} />

				<PaginationBlock
					allItems={artsDB}
					filteredItems={filteredArts}
					page={page}
					step={step}
					setPage={setPage}

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
