import React, { useEffect, useRef, useState } from 'react';
import { useCompContext } from '../contexts/compContextProvider';  // Import the context hook
import { ButtonBlock, CardBlock, ImageBlock, InputBlock, TextBlock, Spinner, ModalWrapper, ImageArt, ButtonGroup, ContainerBlock } from '../../../components';
import { analyzeComp } from '../../../utils/analyzeComp';
import { exportToExcelComps } from '../../../utils/exportExcel';


import { MdOutlineAnalytics } from "react-icons/md";
import { LuFilter, LuFilterX } from "react-icons/lu";


import { prods, categoriesList, subcategoriesList, sizesList } from '../../../constants/compsData';
import CheckCompLinks from '../components/CheckCompLinks';
import SelectedCompModal from '../components/SelectedCompModal';
import { toast } from 'react-toastify';
import { ExcelIcon } from '../../../components/UI/Icons';
import CompsTable from '../components/CompsTable';










export default function CompListPage() {



	const [isFilterOpen, setIsFilterOpen] = useState(false)
	const [selectedCategory, setSelectedCategory] = useState("");
	const [selectedSubcategory, setSelectedSubcategory] = useState("");

	const [filter, setFilter] = useState({
		prod: '',
		category: "",
		subcategory: "",
		size: "",
		abcLetter: "",

	});

	const [selectedComp, setSelectedComp] = useState(null)
	const [showModalComp, setShowModalComp] = useState(false)

	const [sortWord, setSortWord] = useState("")


	const prodOptions = prods;
	const categoryOptions = categoriesList;
	const sizesOptions = sizesList;






	const { compsDB, loadingCompsDB, errorCompsDB } = useCompContext();


	const filteredComps = compsDB?.filter((comp) => {
		return (
			(filter.prod === '' || comp.prod === filter.prod) &&
			(filter.category === '' || comp.category === filter.category) &&
			(filter.subcategory === '' || comp.subcategory === filter.subcategory) &&
			(filter.size === '' || comp.size === filter.size) &&
			(filter.abcLetter === '' || comp.abc?.includes(filter.abcLetter))
		);
	})
		.sort((a, b) => sortComps(a, b))



	function sortComps(a, b) {
		try {
			if (a && b && typeof a.abc === 'string' && typeof b.abc === 'string') {
				if (sortWord === "artikul") {
					console.log("Sorted comp a", a.artikul);
					console.log("Sorted comp b", b.artikul);
					if (a.artikul < b.artikul) {
						return -1;
					}
					if (a.artikul > b.artikul) {
						return 1;
					}
					return 0;
				}

				if (sortWord === "abc") {
					console.log("Sorted by abc comp a", a.abc);
					console.log("Sorted by abc comp b", b.abc);

					const letterA = a.abc.match(/([A-Z]+)/);
					console.log(letterA)
					const letterB = b.abc.match(/([A-Z]+)/);
					console.log(letterB)



					if (letterA < letterB) return -1;
					if (letterA > letterB) return 1;

					const numberA = parseInt(a.abc);
					const numberB = parseInt(b.abc);

					if (numberA < numberB) return -1;
					if (numberA > numberB) return 1;

				}
			}
			return 0;
		} catch (error) {
			console.log(error);
		}
	}





	const handleSortCompsByABC = () => {
		setSortWord("abc")
	}

	const handleSortCompsByArtikul = () => {
		setSortWord("artikul")
	}


	const resetFilter = () => {
		setFilter({
			prod: '',
			category: '',
			subcategory: '',
			size: '',
			abcLetter: '',
		});
	};



	if (errorCompsDB) {
		return <p>Error loading competitors data.</p>;
	}





	return (
		<CardBlock className="flex flex-col space-y-2  " >


			<ButtonGroup
				className=" "
			>


				<ButtonGroup.Navigation>

				</ButtonGroup.Navigation>

				<ButtonGroup.Actions>


					<CheckCompLinks />



					<ButtonBlock
						onClick={() => exportToExcelComps(filteredComps)}
						className=" green-b flex items-center space-x-1  "
					>
						<ExcelIcon />
						Експорт в Excel

					</ButtonBlock>



					<ButtonBlock

						className="    "
					>
						< MdOutlineAnalytics />
						<TextBlock>
							Аналіз 
						</TextBlock>

					</ButtonBlock>





					<ButtonBlock
						className="rose-b flex  items-center space-x-1  "
						onClick={() => { setIsFilterOpen(prev => !prev) }}
					>
						<LuFilter />
						<TextBlock>Фільтр</TextBlock>
					</ButtonBlock>


				</ButtonGroup.Actions>

			</ButtonGroup>






			{showModalComp && <ModalWrapper
				onCancel={() => { setShowModalComp(false) }}
				title={selectedComp?.artikul}
			>

				<SelectedCompModal selectedComp={selectedComp} />

			</ModalWrapper>}





			{isFilterOpen && <ContainerBlock
				className="flex flex-col items-center justify-between space-y-2  p-2 "
			>


				<CardBlock
					className="flex items-center justify-between w-full px-3   space-x-1"
				>

					<TextBlock
						className="text-lg"
					>
						Вибрано артикулів:	{filteredComps.length} із {compsDB.length}
					</TextBlock>

					<ButtonBlock
						className="red-b flex items-center space-x-1"
						onClick={resetFilter}
					>
						<TextBlock
							className="text-xl"
						>
							<LuFilterX />
						</TextBlock>
					</ButtonBlock>

				</CardBlock>



				<CardBlock
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-1">

					<select
						className="InputBlock focus:bg-slate-900 text-base "
						value={filter.abcLetter}
						onChange={(e) => setFilter({ ...filter, abcLetter: e.target.value })}
					>
						<option value="">ABC</option>
						<option value="A">A</option>
						<option value="B">B</option>
						<option value="C">C</option>
						<option value="D">D</option>
						<option value="E">E</option>
						<option value="F">F</option>

					</select>



					<select
						className="InputBlock focus:bg-slate-900 text-base "
						value={filter.prod}
						onChange={(e) => setFilter({ ...filter, prod: e.target.value })}
					>
						<option
							value="">
							Виробник
						</option>
						{prodOptions.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>

					<select
						className="InputBlock focus:bg-slate-900 text-base "
						value={filter.category}
						onChange={(e) => {
							setSelectedCategory(e.target.value);
							setSelectedSubcategory(""); // Сбросить выбранную подкатегорию при изменении категории
							setFilter({ ...filter, category: e.target.value, subcategory: "" });
						}}
					>
						<option
							value="">
							Категорія
						</option>
						{categoryOptions.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>

					<select
						className="InputBlock focus:bg-slate-900 text-base "
						value={filter.subcategory}
						onChange={(e) => {
							setSelectedSubcategory(e.target.value);
							setFilter({ ...filter, subcategory: e.target.value });
						}}
					>
						<option
							value="">
							Підкатегорія
						</option>
						{subcategoriesList[selectedCategory]?.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>


					<select
						className="InputBlock focus:bg-slate-900 text-base"
						value={filter.size}
						onChange={(e) => setFilter({ ...filter, size: e.target.value })}
					>
						<option
							className=''
							value="">
							Розмір
						</option>
						{sizesOptions.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>





				</CardBlock>





			</ContainerBlock>

			}



			{loadingCompsDB ?

				<Spinner color="rgb(139 92 246)" />

				:

				<>

					<CompsTable
						handleSortCompsByArtikul={handleSortCompsByArtikul}
						sortWord={sortWord}
						handleSortCompsByABC={handleSortCompsByABC}
						filteredComps={filteredComps}
						setShowModalComp={setShowModalComp}
						setSelectedComp={setSelectedComp}
					/>


				</>



			}


		</CardBlock >
	);
}
