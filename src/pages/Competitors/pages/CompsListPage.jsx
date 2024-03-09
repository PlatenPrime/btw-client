import React, { useEffect, useRef, useState } from 'react';
import { useCompContext } from '../contexts/compContextProvider';  // Import the context hook
import { ButtonBlock, CardBlock, ImageBlock, InputBlock, TextBlock, Spinner, ModalWrapper, ImageArt, ButtonGroup, ContainerBlock } from '../../../components';
import { analyzeComp } from '../../../utils/analyzeComp';
import { exportToExcelComps } from '../../../utils/exportExcel';


import { IoAnalyticsOutline } from "react-icons/io5";
import { SiMicrosoftexcel } from "react-icons/si";
import { MdOutlineAnalytics } from "react-icons/md";
import { LuFilter, LuFilterX } from "react-icons/lu";
import { BsSortAlphaDown } from "react-icons/bs";





import { prods, categoriesList, subcategoriesList, sizesList } from '../../../constants/compsData';
import CheckCompLinks from '../components/CheckCompLinks';
import SelectedCompModal from '../components/SelectedCompModal';
import { toast } from 'react-toastify';


const prodOptions = prods;
const categoryOptions = categoriesList;
const sizesOptions = sizesList;






export default function CompListPage() {


	const [isAnalyzing, setIsAnalyzing] = useState(false)
	const [isAnalyzingOnFilter, setIsAnalyzingOnFilter] = useState(false)

	const [currentAnalyzeItem, setCurrentAnalyzeItem] = useState(1)
	const [progress, setProgress] = useState(0)
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



	const handleAnalyze = async () => {
		try {

			const totalItems = compsDB.length;
			let completedItems = 0;

			setIsAnalyzing(true)

			for (const comp of compsDB) {
				console.log(comp)
				await analyzeComp(comp);
				completedItems++;
				setCurrentAnalyzeItem(prev => prev + 1)
				const progressValue = (completedItems / totalItems) * 100;
				setProgress(progressValue)
			}
			// window.location.reload();
		} catch (error) {
			console.log(error);

		} finally {
			setIsAnalyzing(false)
			setProgress(0)
			setCurrentAnalyzeItem(1)
		}
	}



	const handleAnalyzeOnFilter = async (filteredComps) => {

		try {

			const totalItems = filteredComps.length;
			let completedItems = 0;

			setIsAnalyzingOnFilter(true)

			for (const comp of filteredComps) {
				console.log(comp)
				await analyzeComp(comp);
				completedItems++;
				setCurrentAnalyzeItem(prev => prev + 1)
				const progressValue = (completedItems / totalItems) * 100;
				setProgress(progressValue)
			}
			// window.location.reload();
		} catch (error) {
			console.log(error);

		} finally {
			setIsAnalyzingOnFilter(false)
			setProgress(0)
			setCurrentAnalyzeItem(1)
		}
	}




	if (errorCompsDB) {
		return <p>Error loading competitors data.</p>;
	}





	return (
		<CardBlock className="flex flex-col space-y-2 relative  " >


			<ButtonGroup
				className="f  "
			>

				<CheckCompLinks />



				<ButtonBlock
					onClick={() => exportToExcelComps(filteredComps)}
					className=" green-b flex items-center space-x-1  "
				>
					< SiMicrosoftexcel className='text-2xl' />
					<TextBlock>
						Експорт в Excel
					</TextBlock>
				</ButtonBlock>



				<ButtonBlock
					onClick={handleAnalyze}
					className=" violet-b flex items-center space-x-1  "
				>
					< MdOutlineAnalytics className='text-2xl' />
					<TextBlock>
						Аналіз (повний)
					</TextBlock>

				</ButtonBlock>

				<ButtonBlock
					onClick={() => handleAnalyzeOnFilter(filteredComps)}
					className=" cyan-b flex items-center space-x-1  "
				>
					< IoAnalyticsOutline className='text-2xl ' />
					<TextBlock>
						Аналіз (фільтр)
					</TextBlock>

				</ButtonBlock>



				<ButtonBlock
					className="rose-b flex  items-center space-x-1  "
					onClick={() => { setIsFilterOpen(prev => !prev) }}
				>
					<LuFilter className=' text-2xl' />
					<TextBlock>Фільтр</TextBlock>
				</ButtonBlock>

			</ButtonGroup>






			{showModalComp && <ModalWrapper
				onCancel={() => { setShowModalComp(false) }}
				title={selectedComp?.artikul}
			>

				<SelectedCompModal selectedComp={selectedComp} />

			</ModalWrapper>}




			{isAnalyzing &&
				<CardBlock>


					<div className="relative pt-1 px-4">


						<div className="flex px-4 mb-2 items-center justify-between">


							<span className="text-sm font-semibold inline-block text-violet-100">
								{progress.toFixed(2)}%
							</span>
							<span>{compsDB[currentAnalyzeItem - 1]?.nameukr}</span>

							<span>{currentAnalyzeItem} / {compsDB?.length}</span>



						</div>


						<div className="flex h-2 mb-4 overflow-hidden text-xs bg-violet-200">
							<div
								style={{ width: `${progress}%` }}
								className="flex flex-col justify-center text-center text-white bg-violet-500 shadow-none whitespace-nowrap"
							></div>
						</div>
					</div>

				</CardBlock>

			}

			{isAnalyzingOnFilter &&
				<ContainerBlock>


					<div className="relative pt-1 px-4">


						<div className="flex px-4 mb-2 items-center justify-between">


							<span className="text-sm font-semibold inline-block text-cyan-100">
								{progress.toFixed(2)}%
							</span>
							<span>{filteredComps[currentAnalyzeItem - 1]?.nameukr}</span>

							<span>{currentAnalyzeItem} / {filteredComps?.length}</span>



						</div>


						<div className="flex h-2 mb-4 overflow-hidden text-xs bg-cyan-200">
							<div
								style={{ width: `${progress}%` }}
								className="flex flex-col justify-center text-center text-white bg-cyan-500 shadow-none whitespace-nowrap"
							></div>
						</div>
					</div>

				</ContainerBlock>

			}






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

				<ContainerBlock
					className="flex-grow overflow-auto  mb-1 relative p-0 "
				>

					<div
						className='max-h-screen   '
					>



						<table className="min-w-full  "  >

							<thead className="  sticky top-0">
								<tr className=''>
									{/* Заголовки таблицы */}
									<th
										className=" lg:w-1/4  bg-slate-900/95   hover:bg-sky-500 border-0 transition ease-in-out duration-300 cursor-pointer	 "
										rowSpan="2"
										colSpan="2"
										onClick={handleSortCompsByArtikul}
									>
										<TextBlock
											className="space-x-2"
										>

											<TextBlock
											>
												Артикул
											</TextBlock>

											<TextBlock
												className={`text-3xl  ${sortWord === "artikul" && "text-green-500"}`}
											>
												<BsSortAlphaDown />
											</TextBlock>

										</TextBlock>

									</th>
									<th
										className="  bg-slate-900/95   hover:bg-green-500 border-0 transition ease-in-out duration-300	cursor-pointer	 "
										rowSpan="2"
										onClick={handleSortCompsByABC}
									>
										<TextBlock
											className="space-x-2"
										>

											<TextBlock
											>
												ABC
											</TextBlock>

											<TextBlock
												className={`text-3xl  ${sortWord === "abc" && "text-green-300"}`}
											>
												<BsSortAlphaDown />
											</TextBlock>

										</TextBlock>
									</th>
									<th className=" bg-slate-900/95   " colSpan="5">
										Наявність
									</th>
									<th className=" bg-slate-900/95  " colSpan="5">
										Ціна
									</th>
								</tr>
								<tr>
									{/* Заголовки для данных */}
									<th className=" bg-blue-900/95">Btrade</th>
									<th className=" bg-sky-900/95">Sharte</th>
									<th className=" bg-amber-900/95">Yumi</th>
									<th className=" bg-lime-900/95">Air</th>
									<th className=" bg-pink-900/95">Best</th>
									<th className=" bg-blue-900/95">Btrade</th>
									<th className=" bg-sky-900/95">Sharte</th>
									<th className=" bg-amber-900/95">Yumi</th>
									<th className=" bg-lime-900/95">Air</th>
									<th className=" bg-pink-900/95">Best</th>
								</tr>
							</thead>



							<tbody className=' ' >
								{

									filteredComps?.map((comp) => (
										<tr
											className="bg-slate-900 
										odd:bg-opacity-100 even:bg-sky-900/20 
										hover:bg-gray-800 transition duration-300 ease-in-out 			"
											key={comp._id.$oid}

										>





											<td
												colSpan="2"
												className='p-0 bg-sky-800/50'
											>

												<CardBlock
													className="flex p-0 items-center "
												>


													<ImageArt
														artikul={comp.artikul}
														size={50}
														className="py-1 bg-white cursor-pointer"
													/>


													<CardBlock
														className="flex items-center justify-start w-full cursor-pointer 
														hover:bg-sky-500 hover:shadow-lg hover:shadow-sky-500 p-0 rounded-none px-1"
														onClick={(e) => {
															e.stopPropagation()
															setShowModalComp(true);
															setSelectedComp(comp)
														}}

													>



														<TextBlock
															className="text-left text-sm py-2  "


														>
															{comp.nameukr}
														</TextBlock>

													</CardBlock>


												</CardBlock>

											</td>



											<td>
												{comp?.abc}
											</td>

											<td
												className={` 
										w-1/12 
										${comp?.avail?.btrade ? "bg-blue-500/20 " : "bg-rose-500/50"}
									 `}
											>
												{comp?.avail?.btrade ?? "-"}
											</td>

											<td className={` w-1/12 ${comp?.avail?.sharte ? "bg-green-500/20" :"bg-red-500/50"} `} >
												{comp?.avail?.sharte	? "Є" : (comp?.avail?.sharte === false) ? "Немає" : "-" }
											</td>

											<td
												className={` 
										w-1/12 
										${comp?.avail?.yumi ? "bg-sky-500/20 " : "bg-rose-500/50"}
									 `}
											>
												{comp?.avail?.yumi === 0 ? "0" : comp?.avail?.yumi ? comp?.avail?.yumi  : "-"}
											</td>

											<td className={` w-1/12 ${comp?.avail?.air ? "bg-green-500/20" :"bg-red-500/50"} `} >
												{comp?.avail?.air	? "Є" : (comp?.avail?.air=== false) ? "Немає" : "-" }
											</td>

											<td className={` w-1/12 ${comp?.avail?.best ? "bg-green-500/20" :"bg-red-500/50"} `} >
												{comp?.avail?.best	? "Є" : (comp?.avail?.best=== false) ? "Немає" : "-" }
											</td>

											<td className='text-green-500 w-1/12  bg-slate-900/50 ' >
												{comp?.price?.btrade}
											</td>

											<td className='text-yellow-400 w-1/12  bg-slate-900/50' >
												{comp?.price?.sharte}
											</td>

											<td className='text-yellow-400 w-1/12  bg-slate-900/50' >
												{comp?.price?.yumi ? comp?.price?.yumi : "-"}
											</td>
											<td className='text-yellow-400 w-1/12  bg-slate-900/50' >
												{comp?.price?.air ? comp?.price?.air : "-"}
											</td>
											<td className='text-yellow-400 w-1/12  bg-slate-900/50' >
												{comp?.price?.best ? comp?.price?.best : "-"}
											</td>


										</tr>
									))}
							</tbody>
						</table>
					</div>
				</ContainerBlock>




			}


		</CardBlock >
	);
}
