import React, { useState } from 'react'
import { ButtonBlock, CardBlock, InputBlock, TextBlock } from '../../../components'
import { importFromExcelComps } from "../../../utils/importExcel"
import axios from '../../../utils/axios'
import Spinner from '../../../components/Spinner/Spinner'

export default function ImportExcelComps() {


	const [uploadData, setUploadData] = useState([])
	const [uploadProgress, setUploadProgress] = useState(0)
	const [isUploading, setIsUploading] = useState(false)



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



	const handleUpload = async () => {
		console.log(uploadData)
		try {

			const totalItems = uploadData.length;
			let completedItems = 0;

			setIsUploading(true)

			for (const comp of uploadData) {

				const { prod,
					category,
					subcategory,
					competitorsLinks,
					size,
					artikul,
					nameukr
				} = { ...comp }

				console.log(prod,
					category,
					subcategory,
					competitorsLinks,
					size,
					artikul,
					nameukr)


				const res = await axios.post("comps/update", {
					prod,
					category,
					subcategory,
					competitorsLinks,
					size,
					artikul,
					nameukr
				});
				console.log(res)

				completedItems++;
				const progressValue = (completedItems / totalItems) * 100;
				setUploadProgress(progressValue)
			}


		} catch (error) {
			console.log(error);

		} finally {
			setIsUploading(false)
			setUploadProgress(0)
		}
	}








	return (





		<CardBlock
			className="
			flex flex-col
			bg-green-600/10 border border-green-600 p-4"
		>
			<TextBlock
				className="text-xl"
			>
				Импорт из Excel
			</TextBlock>

			<InputBlock
				type="file"
				className="p-4 text-lg mx-auto "
				onChange={(e) => handleChangeImportExcel(e)}

			>
				Импортировать из Excel
			</InputBlock>


			{uploadData.length > 0 && <ButtonBlock
				className="success-c mx-auto"
				onClick={handleUpload}
			>
				Выгрузить обновленные данные

				{isUploading && <Spinner color="rgb(34 197 94)" />}
			</ButtonBlock>}



			<CardBlock>

				{isUploading &&
					<CardBlock>


						<div className="relative pt-1">
							<div className="flex mb-2 items-center justify-between">

								<div className="text-right">
									<span className="text-sm font-semibold inline-block text-green-100">
										{uploadProgress.toFixed(2)}%
									</span>
								</div>
							</div>
							<div className="flex h-2 mb-4 overflow-hidden text-xs bg-green-200">
								<div
									style={{ width: `${uploadProgress}%` }}
									className="flex flex-col justify-center text-center text-white bg-green-500 shadow-none whitespace-nowrap"
								></div>
							</div>
						</div>

					</CardBlock>

				}

			</CardBlock>







			{uploadData.length > 0 && <div className="w-full  mx-auto">
				<table className="min-w-full table-auto text-black">
					<thead>
						<tr className='bg-gray-100'>

							<th className="px-4 py-2">Артикул</th>
							<th>Категория</th>
							<th>Подкатегория</th>
							<th>Размер</th>

							<th className="px-4 py-2">Ссылка Sharte</th>
							<th className="px-4 py-2">Артикул Yumi</th>
							<th className="px-4 py-2">Ссылка Air</th>
						</tr>
					</thead>
					<tbody>
						{uploadData.map((item, index) => (
							<tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-slate-100'}>

								<td className="px-4 py-2 text-left">{item.nameukr}</td>
								<td className="px-4 py-2 text-left">{item.category}</td>
								<td className="px-4 py-2 text-left">{item.subcategory}</td>
								<td className="px-4 py-2 text-left">{item.size}</td>

								<td className="px-4 py-2">
									<a href={item.competitorsLinks.sharteLink} target="_blank" rel="noopener noreferrer">
										{item.competitorsLinks.sharteLink.slice(0, 20)}
									</a>
								</td>

								<td>{item.competitorsLinks.yumiArtikul}</td>

								<td className="px-4 py-2">
									<a href={item.competitorsLinks.airLink} target="_blank" rel="noopener noreferrer">
										{item.competitorsLinks.airLink?.slice(0, 20)}
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
