import React, { useEffect, useRef, useState } from 'react';
import { useCompContext } from '../contexts/compContextProvider';  // Import the context hook
import { ButtonBlock, CardBlock, ImageBlock, InputBlock, TextBlock, Spinner, ModalWrapper, ImageArt } from '../../../components';
import { analyzeComp } from '../../../utils/analyzeComp';
import { exportToExcelComps } from '../../../utils/exportExcel';


import { IoAnalyticsOutline } from "react-icons/io5";
import { SiMicrosoftexcel } from "react-icons/si";
import { MdOutlineAnalytics } from "react-icons/md";
import { LuFilter } from "react-icons/lu";





import { prods, categoriesList, subcategoriesList, sizesList } from '../../../constants/compsData';
import CheckCompLinks from '../components/CheckCompLinks';
import SelectedCompModal from '../components/SelectedCompModal';
import { toast } from 'react-toastify';


const prodOptions = prods;
const categoryOptions = categoriesList;
const sizesOptions = sizesList;






export default function CompListPage() {


	const [isAnalyzing, setIsAnalyzing] = useState(false)
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

	const [sortWord, setSortWord] = useState("artikul")


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

		if (sortWord === "artikul") {
			if (a.artikul < b.artikul) {
				return -1;
			}
			if (a.artikul > b.artikul) {
				return 1;
			}
			return 0;
		}

		if (sortWord === "abc") {
			const letterA = a?.abc?.match(/[A-Z]+/)[0];
			const letterB = b?.abc?.match(/[A-Z]+/)[0];

			if (letterA < letterB) return -1;
			if (letterA > letterB) return 1;

			const numberA = parseInt(a?.abc?.match(/\d+/)[0]);
			const numberB = parseInt(b?.abc?.match(/\d+/)[0]);

			return numberA - numberB;
		}


	}





	const handleSortCompsByABC = () => {
		setSortWord("abc")
	}

	const handleSortCompsByArtikul = () => {
		setSortWord("artikul")
	}






	const handleAnalyze = async () => {
		try {

			const totalItems = compsDB.length;
			let completedItems = 0;

			setIsAnalyzing(true)

			for (const comp of compsDB) {
				console.log(comp)
				await analyzeComp(comp);
				completedItems++;
				const progressValue = (completedItems / totalItems) * 100;
				setProgress(progressValue)
			}
			window.location.reload();
		} catch (error) {
			console.log(error);

		} finally {
			setIsAnalyzing(false)
			setProgress(0)
		}
	}



	const handleAnalyzeOnFilter = async (filteredComps) => {

		try {

			const totalItems = filteredComps.length;
			let completedItems = 0;

			setIsAnalyzing(true)

			for (const comp of filteredComps) {
				console.log(comp)
				await analyzeComp(comp);
				completedItems++;
				const progressValue = (completedItems / totalItems) * 100;
				setProgress(progressValue)
			}
			window.location.reload();
		} catch (error) {
			console.log(error);

		} finally {
			setIsAnalyzing(false)
			setProgress(0)
		}
	}




	if (errorCompsDB) {
		return <p>Error loading competitors data.</p>;
	}





	return (
		<CardBlock className="flex flex-col space-y-2 relative  " >


			<CardBlock
				className="flex justify-start flex-wrap gap-1  "
			>

				<CheckCompLinks />



				<ButtonBlock
					onClick={() => exportToExcelComps(compsDB)}
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

			</CardBlock>






			{showModalComp && <ModalWrapper
				onCancel={() => { setShowModalComp(false) }}
				title={selectedComp?.artikul}
			>

				<SelectedCompModal selectedComp={selectedComp} />

			</ModalWrapper>}






			<CardBlock
				className=""
			>

				{isAnalyzing &&
					<CardBlock>


						<div className="relative pt-1 px-4">
							<div className="flex px-4 mb-2 items-center justify-between">

								<div className="text-right">
									<span className="text-sm font-semibold inline-block text-violet-100">
										{progress.toFixed(2)}%
									</span>
								</div>
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

			</CardBlock>


			{isFilterOpen && <CardBlock
				className="flex flex-col items-center justify-between space-x-2 border border-rose-500 p-2 bg-rose-500/10"
			>


				<CardBlock
					className="flex items-center  flex-nowrap space-x-1"
				>

					<TextBlock
						className="text-xl"
					>
						Вибрано артикулів:	{filteredComps.length} із {compsDB.length}
					</TextBlock>

				</CardBlock>



				<CardBlock
					className="flex justify-between p-4 space-x-4 flex-wrap">

					<select
						className="InputBlock focus:bg-slate-900 text-lg "
						value={filter.abcLetter}
						onChange={(e) => setFilter({ ...filter, abcLetter: e.target.value })}
					>
						<option value="">Буква (ще не працює)</option>
						<option value="A">A</option>
						<option value="B">B</option>
						<option value="C">C</option>
						<option value="D">D</option>
						<option value="E">E</option>
						<option value="F">F</option>

					</select>



					<select
						className="InputBlock focus:bg-slate-900 text-lg "
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
						className="InputBlock focus:bg-slate-900 text-lg  "
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
						className="InputBlock focus:bg-slate-900 text-lg "
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
						className="InputBlock focus:bg-slate-900 text-lg "
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





			</CardBlock>

			}



			{loadingCompsDB ?

				<Spinner color="rgb(139 92 246)" />

				:

				<CardBlock
					className="flex-grow overflow-auto mb-1 relative "
				>

					<div
						className='max-h-screen  '
					>



						<table className="min-w-full  table-fixed "  >

							<thead className="  sticky top-0">
								<tr className=''>
									{/* Заголовки таблицы */}
									<th
										className=" bg-purple-700 "
										rowSpan="2"
										colSpan="2"
										onClick={handleSortCompsByArtikul}
									>
										Артикул
									</th>
									<th
										className=" bg-indigo-700 "
										rowSpan="2"
										onClick={handleSortCompsByABC}
									>
										ABC
									</th>
									<th className=" bg-sky-900 " colSpan="5">
										Наявність
									</th>
									<th className=" bg-teal-900 " colSpan="5">
										Ціна
									</th>
								</tr>
								<tr>
									{/* Заголовки для данных */}
									<th className=" bg-blue-600">Btrade</th>
									<th className=" bg-sky-500">Sharte</th>
									<th className=" bg-amber-600">Yumi</th>
									<th className=" bg-lime-600">Air</th>
									<th className=" bg-pink-500">Best</th>
									<th className=" bg-blue-600">Btrade</th>
									<th className=" bg-sky-500">Sharte</th>
									<th className=" bg-amber-600">Yumi</th>
									<th className=" bg-lime-600">Air</th>
									<th className=" bg-pink-500">Best</th>
								</tr>
							</thead>



							<tbody className=' ' >
								{

									filteredComps?.map((comp) => (
										<tr
											className="bg-black 
										odd:bg-opacity-100 even:bg-sky-900/20 
										hover:bg-gray-800 transition duration-300 ease-in-out 			"
											key={comp._id.$oid}

										>





											<td
												colSpan="2"
												className='p-0 bg-indigo-900/40'
											>

												<CardBlock
													className="flex space-x-1 items-center p-0"
												>



													<ImageArt
														artikul={comp.artikul}
														size={50}
														className="rounded cursor-pointer"
													/>


													<CardBlock
														className="flex items-center justify-start w-full cursor-pointer 
														hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-500 p-1 "
														onClick={(e) => {
															e.stopPropagation()
															setShowModalComp(true);
															setSelectedComp(comp)
														}}

													>



														<TextBlock
															className="text-left  "


														>
															{comp.nameukr}
														</TextBlock>

													</CardBlock>


												</CardBlock>

											</td>



											<td>
												{comp?.abc}
											</td>




											<td className=' 
										w-1/12 
										shadow-inner inset-2 shadow-blue-600 bg-blue-600/10
										
										'>
												{comp?.avail?.btrade
													?
													<span className='bg-sky-500 p-2 rounded' >
														{comp?.avail?.btrade}
													</span>
													:
													comp?.avail?.btrade === 0
														?
														<span className='bg-rose-500 p-2 rounded' >
															0
														</span>
														:
														<span className='bg-rose-500 p-2 rounded' >
															-
														</span>}
											</td>

											<td className=' w-1/12 shadow-inner inset-2 shadow-sky-500  bg-sky-600/10' >
												{comp?.avail?.sharte
													?
													<span className='bg-green-500 p-2 rounded' >
														Є
													</span>
													:
													(comp?.avail?.sharte === false)

														?
														<span className='bg-red-500 p-2 rounded' >
															Немає
														</span>
														:
														<span className='' >
															-
														</span>



												}
											</td>


											<td className=' w-1/12 shadow-inner inset-2 shadow-amber-600 bg-amber-600/10 '>
												{comp?.avail?.yumi
													?
													<span className='bg-sky-500 p-2 rounded' >
														{comp?.avail?.yumi}
													</span>
													:
													comp?.avail?.yumi === 0
														?
														<span className='bg-rose-500 p-2 rounded' >
															0
														</span>
														:
														<span className=' p-2 rounded' >
															-
														</span>}
											</td>

											<td className=' w-1/12 shadow-inner inset-2 shadow-lime-600 bg-lime-600/10' >
												{comp?.avail?.air
													?
													<span className='bg-green-500 p-2 rounded' >
														Є
													</span>
													:
													(comp?.avail?.air === false)

														?
														<span className='bg-red-500 p-2 rounded' >
															Немає
														</span>
														:
														<span className=' p-2 rounded' >
															-
														</span>}
											</td>

											<td className=' w-1/12 shadow-inner inset-2 shadow-pink-600 bg-pink-600/10' >
												{comp?.avail?.best
													?
													<span className='bg-green-500 p-2 rounded' >
														Є</span>
													:
													(comp?.avail?.best === false)

														?
														<span className='bg-red-500 p-2 rounded' >
															Немає
														</span>
														:
														<span className=' p-2 rounded' >
															-
														</span>}
											</td>






											<td className='text-green-500 w-1/12 shadow-inner inset-2 shadow-blue-600 bg-blue-600/10 ' >
												{comp?.price?.btrade}
											</td>

											<td className='text-yellow-400 w-1/12 shadow-inner inset-2 shadow-sky-500 bg-sky-600/10' >
												{comp?.price?.sharte}
											</td>

											<td className='text-yellow-400 w-1/12 shadow-inner inset-2 shadow-amber-600 bg-amber-600/10' >
												{comp?.price?.yumi ? comp?.price?.yumi : "-"}
											</td>
											<td className='text-yellow-400 w-1/12 shadow-inner inset-2 shadow-lime-600 bg-lime-600/10' >
												{comp?.price?.air ? comp?.price?.air : "-"}
											</td>
											<td className='text-yellow-400 w-1/12 shadow-inner inset-2 shadow-pink-600 bg-pink-600/10' >
												{comp?.price?.best ? comp?.price?.best : "-"}
											</td>


										</tr>
									))}
							</tbody>
						</table>
					</div>
				</CardBlock>




			}


		</CardBlock >
	);
}
