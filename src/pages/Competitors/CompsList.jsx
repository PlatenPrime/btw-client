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
			<TextBlock>Список артикулов с БД с возможностью обновления по ним информации о наличии</TextBlock>
			<ButtonBlock className='success' >Обновить данные</ButtonBlock>
			<table>
				<thead>
					<tr>
						<th>Артикул</th>
						<th>Производитель</th>
						<th>Ссылка Шарте</th>
						<th>Наличие</th>
						<th>Цена</th>
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
									{comp.competitorsLinks.sharteLink.slice(0, 20)}
								</a>
							</td>
							<td>{comp.isAvailable ? 'Есть' : 'Нет'}</td>
							<td>{comp.price}</td>
						</tr>
					))}
				</tbody>
			</table>
		</CardBlock>
	);
}
