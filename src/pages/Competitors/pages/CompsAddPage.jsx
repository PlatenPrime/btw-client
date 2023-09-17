import React, { useState } from 'react'
import AddCompForm from '../components/AddCompForm'
import { CardBlock, InputBlock, TextBlock } from '../../../components'
import { importFromExcelComps } from "../../../utils/importExcel"
import ImportExcelComps from '../components/ImportExcelComps'

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

			<ImportExcelComps />


		</CardBlock>
	)
}
