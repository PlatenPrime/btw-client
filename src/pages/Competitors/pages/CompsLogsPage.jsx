import React from 'react'
import { CardBlock, TextBlock } from '../../../components'
import { useCompContext } from '../contexts/compContextProvider';

export default function CompsLogsPage() {


	const { logsDB, loadingLogsDB, errorLogsDB } = useCompContext();



	console.log(logsDB)

	return (
		<CardBlock>

			{loadingLogsDB && <TextBlock>Загрузка...</TextBlock>}




			{logsDB &&
				<table style={{ overflowY: 'auto', maxHeight: '100vh' }}  >
					<thead className="bg-violet-500/50">
						<tr>
							<th>Дата</th>
							<th>Артикул</th>
							<th>Изменение</th>
							<th>Было</th>
							<th>Стало</th>

						</tr>
					</thead>
					<tbody className='relative' >
						{logsDB.map(item => (
							<tr key={item._id}>
								<td>{new Date(item.timestamp).toLocaleDateString()}</td>
								<td>{item.artikul}</td>
								<td>{item.change.field === "avail.sharte" ? "Наличие Шарте" : "Цена Шарте"}</td>
								<td>{item.change.oldValue.toString()}</td>
								<td>{item.change.newValue.toString()}</td>

							</tr>
						))}
					</tbody>
				</table>

			}

		</CardBlock>
	)
}
