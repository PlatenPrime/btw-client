import React, { useEffect, useState } from 'react'
import { ButtonBlock, ButtonGroup, ContainerBlock, HeaderBlock, PageBTW, Spinner} from '../../components'
import { useNavigate } from 'react-router-dom'

import useInsFoldersStore from './insFoldersStore'




// DFNNauCXiFM

export default function InstructionsPage() {



	const navigate = useNavigate()





	const {insFolders, getAllInsFolders, createInsFolder, } = useInsFoldersStore()


	const [isInsFoldersLoading, setIsInsFoldersLoading] = useState(false)
	const [isInsFolderCreating, setIsInsFolderCreating] = useState(false)




	useEffect(() => {


		const fetchIns = async () => {
			try {
				setIsInsFoldersLoading(true)


				const instructions = await getAllInsFolders()

				console.log("Інструкції завантажені", instructions);


			} catch (error) {
				console.log(error);

			} finally {
				setIsInsFoldersLoading(false)
			}
		}



		fetchIns()


	}, [getAllInsFolders])



	console.log(insFolders);
	







	const handleInsFolderCreate = async () => {
		try {
			setIsInsFolderCreating(true)
			await createInsFolder()	

		} catch (error) {
			console.log(error);
		} finally {
			setIsInsFolderCreating(false)
		}

	}


	




	return (
		<PageBTW
			className="space-y-4"
		>
			<HeaderBlock
				className="bg-blue-500 shadow-2xl shadow-blue-500"
			>
				Інструкції
			</HeaderBlock>



			{isInsFoldersLoading ?


				<ContainerBlock
					className="w-full h-full flex justify-start items-center"
				>
					<Spinner color="rgb(59 130 246)" />
				</ContainerBlock>

				:

				<>



<ButtonGroup>

	<ButtonBlock className="green-b" onClick={() => {}}>Створити теку</ButtonBlock>
</ButtonGroup>

			


				</>
			}


		</PageBTW >
	)

}
