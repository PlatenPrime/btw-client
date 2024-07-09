import React, { useEffect, useRef, useState } from 'react';
import { useCompContext } from '../contexts/compContextProvider';  // Import the context hook
import { ButtonBlock, CardBlock, ImageBlock, InputBlock, TextBlock, Spinner, ModalWrapper, ImageArt, ButtonGroup, ContainerBlock } from '../../../components';
import { analyzeComp } from '../../../utils/analyzeComp';
import { exportToExcelComps } from '../../../utils/exportExcel';


import { MdOutlineAnalytics } from "react-icons/md";
import { LuFilter, LuFilterX } from "react-icons/lu";


import { prods, categoriesList, subcategoriesList, sizesList } from '../../../constants/compsData';
import CheckCompLinks from '../components/CheckCompLinks';
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




				</ButtonGroup.Actions>

			</ButtonGroup>






			



			{loadingCompsDB ?

				<Spinner color="rgb(139 92 246)" />

				:

				<>

					<CompsTable
						comps={compsDB}
					/>


				</>



			}


		</CardBlock >
	);
}
