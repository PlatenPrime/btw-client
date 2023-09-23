import React, { useEffect, useRef, useState } from 'react';
import { useCompContext } from '../contexts/compContextProvider';  // Import the context hook
import { ButtonBlock, CardBlock, ImageBlock, InputBlock, TextBlock } from '../../../components';
import { analyzeComp } from '../../../utils/analyzeComp';
import { exportToExcelComps } from '../../../utils/exportExcel';
import Spinner from '../../../components/Spinner/Spinner';
import { importFromExcelComps } from '../../../utils/importExcel';
import { GoFilter } from 'react-icons/go'

import { prods, categoriesList, subcategoriesList, sizesList } from '../../../constants/compsData';


const prodOptions = prods;
const categoryOptions = categoriesList;
const sizesOptions = sizesList;






export default function CompList() {


	const [isAnalyzing, setIsAnalyzing] = useState(false)
	const [progress, setProgress] = useState(0)
	const [isFilterOpen, setIsFilterOpen] = useState(false)
	const [selectedCategory, setSelectedCategory] = useState("");
	const [selectedSubcategory, setSelectedSubcategory] = useState("");
	const [filter, setFilter] = useState({
		// Initialize your filter criteria here
		prod: '',
		category: "",
		subcategory: "",
		size: "",

	});

	const prodOptions = prods;
	const categoryOptions = categoriesList;







	const { compsDB, loadingCompsDB, errorCompsDB } = useCompContext();








	const handleAnalyze = async () => {
		try {

			const totalItems = compsDB.length;
			let completedItems = 0;

			setIsAnalyzing(true)

			for (const comp of compsDB) {
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






	if (loadingCompsDB) {
		return <>

			<Spinner color="rgb(139 92 246)" />


		</>;
	}

	if (errorCompsDB) {
		return <p>Error loading competitors data.</p>;
	}





	return (
		<CardBlock className="flex flex-col h-screen" >


			<CardBlock
				className="flex justify-end  "
			>

				<ButtonBlock
					onClick={() => exportToExcelComps(compsDB)}
					className=" success-c   "

				>
					Экспорт в Excel
				</ButtonBlock>



				<ButtonBlock
					onClick={handleAnalyze}
					className=" add-c  "
				>
					Анализировать артикулы
				</ButtonBlock>


				<ButtonBlock
					className="add-c flex"
					onClick={() => { setIsFilterOpen(prev => !prev) }}
				>
					<TextBlock>Фільтры</TextBlock>	<GoFilter className='text-2xl' />
				</ButtonBlock>

			</CardBlock>



			<CardBlock>

				{isAnalyzing &&
					<CardBlock>


						<div className="relative pt-1">
							<div className="flex mb-2 items-center justify-between">

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


			<CardBlock >



				{isFilterOpen && <CardBlock
					className="flex justify-end p-4 space-x-4 ">

					<select
						className="InputBlock focus:bg-violet-900 "
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
						className="InputBlock focus:bg-violet-900 "
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
						className="InputBlock focus:bg-violet-900 "
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
						className="InputBlock focus:bg-violet-900 "
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
				}





			</CardBlock>



			<CardBlock
				className="flex-grow overflow-auto mb-1 "
			>

				<table className="min-w-full border border-violet-500"  >

					<thead className="bg-violet-900/95  border border-violet-500  sticky top-0  z-10  ">

						<tr >
							<th className="w-1/3" rowSpan="2">Артикул</th>
							<th className="w-1/3" colSpan="4">Наличие</th>
							<th className="w-1/3" colSpan="4">Цена</th>
						</tr>

						<tr>

							<th className="">Btrade</th>
							<th className="">Sharte</th>
							<th className="">Yumi</th>
							<th className="">Air</th>
							<th className="">Btrade</th>
							<th className="">Sharte</th>
							<th className="">Yumi</th>
							<th className="">Air</th>

						</tr>

					</thead>



					<tbody className='' >
						{compsDB


							.filter((comp) => {
								// Filter based on criteria
								return (
									(filter.prod === '' || comp.prod === filter.prod) &&
									(filter.category === '' || comp.category === filter.category) &&
									(filter.subcategory === '' || comp.subcategory === filter.subcategory) &&
									(filter.size === '' || comp.size === filter.size)
								);
							})


							.map((comp) => (
								<tr
									className="bg-violet-500 even:bg-opacity-25 odd:bg-opacity-10 "
									key={comp._id.$oid}



								>
									<td className='flex items-center justify-start space-x-1 ' >

										<ImageBlock
											src={`https://sharik.ua/images/elements_big/${comp.artikul}_m1.jpg`}
											width={30}
											height={30}
											alt="Фото артикула"
											className="rounded "

										/>
										<TextBlock
											className="text-left"

										>{comp.nameukr}</TextBlock>

									</td>




									<td className=' w-1/12'>
										{comp.avail.btrade ? <span className='bg-sky-500 p-2 rounded' >{comp.avail.btrade}</span> : <span className='bg-rose-500 p-2 rounded' >Нет</span>}
									</td>

									<td className=' w-1/12' >
										{comp.avail.sharte ? <span className='bg-green-500 p-2 rounded' >Есть</span> : <span className='bg-red-500 p-2 rounded' >Нет</span>}
									</td>


									<td className=' w-1/12'>
										{comp.avail.yumi ? <span className='bg-sky-500 p-2 rounded' >{comp.avail.yumi}</span> : <span className=' p-2 rounded' >---</span>}
									</td>

									<td className=' w-1/12' >
										{comp.avail.air ? <span className='bg-green-500 p-2 rounded' >Есть</span> : <span className=' p-2 rounded' >---</span>}
									</td>


									<td className='text-green-500 w-1/12' >
										{comp.price.btrade}
									</td>

									<td className='text-yellow-400 w-1/12' >
										{comp.price.sharte}
									</td>

									<td className='text-yellow-400 w-1/12' >
										{comp.price.yumi ? comp.price.yumi : "---"}
									</td>
									<td className='text-yellow-400 w-1/12' >
										{comp.price.air ? comp.price.air : "---"}
									</td>


								</tr>
							))}
					</tbody>
				</table>

			</CardBlock>

		</CardBlock >
	);
}
