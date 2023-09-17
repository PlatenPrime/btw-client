import React, { useState } from 'react'
import AddCompForm from '../components/AddCompForm'
import { CardBlock, InputBlock, TextBlock } from '../../../components'
import { importFromExcelComps } from "../../../utils/importExcel"

export default function CompsAddPage() {


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
			className="space-y-4"
		>
			<AddCompForm />




			<CardBlock
				className="bg-green-600/20 border border-green-600 p-4"
			>
				<TextBlock
					className="text-xl"
				>
					Импорт из Excel
				</TextBlock>

				<InputBlock
					type="file"
					className="p-4 text-lg "
					onChange={(e) => handleChangeImportExcel(e)}

				>
					Импортировать из Excel
				</InputBlock>

				{uploadData.length > 0 && <div className="w-full  mx-auto">
					<table className="min-w-full table-auto">
						<thead>
							<tr className='bg-black'>

								<th className="px-4 py-2">Артикул</th>

								<th className="px-4 py-2">Ссылка Sharte</th>
							</tr>
						</thead>
						<tbody>
							{uploadData.map((item, index) => (
								<tr key={index} className={index % 2 === 0 ? 'bg-gray-900' : 'bg-slate-700'}>

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


		</CardBlock>
	)
}
