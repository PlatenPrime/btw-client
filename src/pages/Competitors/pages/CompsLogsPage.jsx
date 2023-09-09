import React, { useState } from 'react';
import { ButtonBlock, CardBlock, ImageBlock, TextBlock } from '../../../components';
import { useCompContext } from '../contexts/compContextProvider';
import Spinner from '../../../components/Spinner/Spinner';

export default function CompsLogsPage() {
	const { logsDB, loadingLogsDB, errorLogsDB } = useCompContext();
	const [pageSize, setPageSize] = useState(10); // Количество строк на странице
	const [currentPage, setCurrentPage] = useState(1); // Текущая страница

	// Функция для отображения определенного диапазона элементов на текущей странице
	const getCurrentPageData = () => {
		const startIndex = (currentPage - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		return logsDB.slice(startIndex, endIndex);
	};

	// Обработчик для изменения текущей страницы
	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};

	return (
		<CardBlock>
			{loadingLogsDB && <Spinner color="rgb(139 92 246)" />}
			{logsDB && (
				<>
					<table style={{ overflowY: 'auto', maxHeight: '100vh' }}>
						<thead className="bg-violet-500/90">
							<tr>
								<th className="w-1/5" >Дата</th>
								<th className="w-1/5" >Артикул</th>
								<th className="w-1/5" >Изменение</th>
								<th className="w-1/5">Было</th>
								<th className="w-1/5" >Стало</th>
							</tr>
						</thead>
						<tbody className='relative'>
							{getCurrentPageData().map(item => (
								<tr className="bg-violet-500 even:bg-opacity-25 odd:bg-opacity-10 " key={item._id}>
									<td>{new Date(item.timestamp).toLocaleDateString()}</td>


									<td className='flex items-center justify-center'>
										<ImageBlock
											src={`https://sharik.ua/images/elements_big/${item.artikul}_m1.jpg`}
											width={30}
											height={30}
											alt="Фото артикула"
											className="rounded "

										/>
										{item.artikul}


									</td>




									<td>{item.change.field === "avail.sharte" ? "Наличие Шарте" : "Цена Шарте"}</td>
									<td>{item.change.oldValue.toString()}</td>
									<td>{item.change.newValue.toString()}</td>
								</tr>
							))}
						</tbody>
					</table>

					{/* Добавьте пагинацию, например, кнопки "Предыдущая" и "Следующая" */}
					<CardBlock className="flex justify-center">
						<ButtonBlock
							className='search-c'
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}>
							Назад
						</ButtonBlock>
						<ButtonBlock
							className='add-c'
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage * pageSize >= logsDB.length}>
							Вперед
						</ButtonBlock>
					</CardBlock>
				</>
			)}
		</CardBlock>
	);
}
