import React, { useEffect, useRef, useState } from 'react';
import { useCompContext } from '../contexts/compContextProvider';  // Import the context hook
import { ButtonBlock, CardBlock, ImageBlock, TextBlock } from '../../../components';
import { analyzeComp } from '../../../utils/analyzeComp';







export default function CompList() {


	const [isAnalyzing, setIsAnalyzing] = useState(false)
	const [progress, setProgress] = useState(0)

	const theadRef = useRef(null);







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
			// window.location.reload();
		} catch (error) {
			console.log(error);

		} finally {
			setIsAnalyzing(false)
			setProgress(0)
		}
	}







	if (loadingCompsDB) {
		return <p>Loading competitors data...</p>;
	}

	if (errorCompsDB) {
		return <p>Error loading competitors data.</p>;
	}





	return (
		<CardBlock>


			<CardBlock>


				<ButtonBlock
					onClick={handleAnalyze}
					className=" add-c rounded-full mt-4 "
				>
					Анализировать артикулы
				</ButtonBlock>




				{isAnalyzing &&
					<CardBlock>


						<div className="relative pt-1">
							<div className="flex mb-2 items-center justify-between">

								<div className="text-right">
									<span className="text-xs font-semibold inline-block text-violet-600">
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




			<div  style={{ overflowY: 'auto', maxHeight: '500px' }}>


				<table>
					<thead className="bg-violet-500/90 fixed z-10  " ref={theadRef} >
						<tr>
							<th className='w-2/6' >Артикул</th>
							<th className='w-1/6'>Производитель</th>
							<th className='w-1/6'>Наличие Шарте</th>
							<th className='w-1/6'>Наличие Бтрейд</th>
							<th className='w-1/6'>Цена Шарте</th>
							<th className='w-1/6'>Цена Бтрейд</th>
						</tr>
					</thead>
					<tbody  className='relative top-16' >
						{compsDB && compsDB.map((comp) => (
							<tr key={comp._id.$oid}>
								<td className='flex items-center space-x-1' >

									<ImageBlock
										src={`https://sharik.ua/images/elements_big/${comp.artikul}_m1.jpg`}
										width={30}
										height={30}
										alt="Фото артикула"
										className="rounded "

									/>
									<a href={comp.competitorsLinks.sharteLink} target="_blank" rel="noopener noreferrer">
										{comp.nameukr.length > 40 ? <>{comp.nameukr.slice(0, 37)}...</> : <>{comp.nameukr}</>}
									</a>
								</td>
								<td  > <span className='bg-slate-500/50 p-1 rounded' >{comp.prod}</span> </td>
								<td>{comp.avail.sharte ? <span className='bg-green-500 p-1' >Есть</span> : <span className='bg-red-500 p-1' >Нет</span>}</td>
								<td>{comp.avail.btrade ? <span className='bg-sky-500 p-1' >{comp.avail.btrade}</span> : <span className='bg-rose-500 p-1' >Нет</span>}</td>
								<td className='text-yellow-400' >{comp.price.sharte}</td>
								<td className='text-green-500' >{comp.price.btrade}</td>
							</tr>
						))}
					</tbody>
				</table>

			</div>

		</CardBlock >
	);
}
