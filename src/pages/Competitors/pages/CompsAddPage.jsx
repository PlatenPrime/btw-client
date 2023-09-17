import React from 'react'
import AddCompForm from '../components/AddCompForm'
import { InputBlock } from '../../../components'
import { importFromExcelComps } from "../../../utils/importExcel"

export default function CompsAddPage() {




	const handleChangeImportExcel = (e) => {
		e.preventDefault()
		const importedComps = importFromExcelComps(e)
		console.log(importedComps)
	}
















	return (
		<>
			<AddCompForm />


			<InputBlock
				type="file"
				className="create-c rounded-full block mx-auto "
				onChange={(e) => handleChangeImportExcel(e)}

			>
				Импортировать из Excel
			</InputBlock>

		</>
	)
}
