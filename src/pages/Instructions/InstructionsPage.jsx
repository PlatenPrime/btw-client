import React from 'react'
import { ButtonBlock, ButtonGroup, HeaderBlock, PageBTW } from '../../components'
import { useNavigate } from 'react-router-dom'

export default function InstructionsPage() {



	const navigate = useNavigate()




	return (
		<PageBTW
			className="space-y-4"
		>
			<HeaderBlock
				className="bg-blue-500 shadow-2xl shadow-blue-500"
			>
				Інструкції
			</HeaderBlock>




			


			<ButtonGroup>
				<ButtonBlock
					className="green-b"
					onClick={() => navigate("/ins/new")}

				>
					Створити інструкцію
				</ButtonBlock>
			</ButtonGroup>












		</PageBTW >
	)
}
