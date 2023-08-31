import React from 'react';
import { useCompContext } from './compContextProvider';  // Import the context hook
import { ButtonBlock, CardBlock, ImageBlock, TextBlock } from '../../components'; // Import your UI components here

export default function CompList() {
	const { compsDB, loadingCompsDB, errorCompsDB } = useCompContext();

	if (loadingCompsDB) {
		return <p>Loading competitors data...</p>;
	}

	if (errorCompsDB) {
		return <p>Error loading competitors data.</p>;
	}



	return (
		<CardBlock>

			<CardBlock
				className="flex justify-between"
			>
				<ButtonBlock className='add-c' >Анализировать артикулы</ButtonBlock>
				<ButtonBlock className='success-c' >Обновить данные</ButtonBlock>
			</CardBlock>


			<table>
				<thead>
					<tr>
						<th>Артикул</th>
						<th>Производитель</th>
						<th>Ссылка Шарте</th>
						<th>Наличие Шарте</th>
						<th>Наличие Бтрейд</th>
						<th>Цена Шарте</th>
						<th>Цена Бтрейд</th>
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
								<p>{comp.artikul}</p>
							</td>
							<td>{comp.prod}</td>
							<td>
								<a href={comp.competitorsLinks.sharteLink} target="_blank" rel="noopener noreferrer">
									{comp.competitorsLinks.sharteLink.slice(0, 20)}...
								</a>
							</td>
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
