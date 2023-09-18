import React, { useState } from 'react'
import { CardBlock, InputBlock, TextBlock } from '../../../components'
import { importFromExcelComps } from "../../../utils/importExcel"

export default function ImportExcelComps() {


	const [uploadData, setUploadData] = useState([])



	const handleChangeImportExcel = async (e) => {
		e.preventDefault()
		try {
			const data = await importFromExcelComps(e);
			// Здесь вы можете использовать восстановленные данные
			console.log(data);
			setUploadData(data)
		} catch (error) {
			// Обработка ошибок, если такие возникнут
			console.error(error);
		}
	}


	return (





		<CardBlock
			className="
			
			bg-green-600/20 border border-green-600 p-4"
		>
			<TextBlock
				className="text-xl"
			>
				Импорт из Excel (пока не работает)
			</TextBlock>

			<InputBlock
				type="file"
				className="p-4 text-lg mx-auto "
				onChange={(e) => handleChangeImportExcel(e)}

			>
				Импортировать из Excel
			</InputBlock>

			{uploadData.length > 0 && <div className="w-full  mx-auto">
				<table className="min-w-full table-auto text-black">
					<thead>
						<tr className='bg-gray-100'>

							<th className="px-4 py-2">Артикул</th>

							<th className="px-4 py-2">Ссылка Sharte</th>
						</tr>
					</thead>
					<tbody>
						{uploadData.map((item, index) => (
							<tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-slate-100'}>

								<td className="px-4 py-2 text-left">{item.nameukr}</td>

								<td className="px-4 py-2">
									<a href={item.competitorsLinks.sharteLink} target="_blank" rel="noopener noreferrer">
										{item.competitorsLinks.sharteLink.slice(0, 20)}
									</a>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>}





		</CardBlock>

	)
}
