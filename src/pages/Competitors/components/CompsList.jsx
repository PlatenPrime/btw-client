import React from 'react';
import { useCompContext } from '../contexts/compContextProvider';  // Import the context hook
import { ButtonBlock, CardBlock, ImageBlock, TextBlock } from '../../../components';
import { analyzeComp } from '../../../utils/analyzeComp';







export default function CompList() {



	const { compsDB, loadingCompsDB, errorCompsDB } = useCompContext();

	if (loadingCompsDB) {
		return <p>Loading competitors data...</p>;
	}

	if (errorCompsDB) {
		return <p>Error loading competitors data.</p>;
	}


	const handleAnalyze = () => {


		compsDB.forEach(comp => {
			analyzeComp(comp)
		});

		window.location.reload();


	}





	return (
		<CardBlock>

			<CardBlock
				className="flex justify-end"
			>

				<ButtonBlock
					className='success-c'
					onClick={handleAnalyze}
				>Обновить данные
				</ButtonBlock>
			</CardBlock>


			<table>
				<thead className="bg-violet-500/50">
					<tr>
						<th className='w-2/6' >Артикул</th>
						<th className='w-1/6'>Производитель</th>
						<th className='w-1/6'>Наличие Шарте</th>
						<th className='w-1/6'>Наличие Бтрейд</th>
						<th className='w-1/6'>Цена Шарте</th>
						<th className='w-1/6'>Цена Бтрейд</th>
					</tr>
				</thead>
				<tbody>
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
							<td>{comp.prod}</td>
							<td>{comp.avail.sharte ? <span className='bg-green-500 p-1' >Есть</span> : <span className='bg-red-500 p-1' >Нет</span>}</td>
							<td>{comp.avail.btrade ? <span>{comp.avail.btrade}</span> : 'Нет'}</td>
							<td>{comp.price.sharte}</td>
							<td>{comp.price.btrade}</td>
						</tr>
					))}
				</tbody>
			</table>
		</CardBlock>
	);
}
