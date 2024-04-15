import React, { useEffect, useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, InputBlock, ModalWrapper, PageBTW, Spinner, TextBlock} from '../../components'
import { useNavigate } from 'react-router-dom'

import useInsFoldersStore from './insFoldersStore'
import { CancelIcon, OkIcon } from '../../components/UI/Icons'




// DFNNauCXiFM

export default function InstructionsPage() {



	const navigate = useNavigate()





	const {insFolders, getAllInsFolders, createInsFolder, } = useInsFoldersStore()


const [newInsFolderTitle, setNewInsFolderTitle] = useState('')
const [newInsFolderColor, setNewInsFolderColor] = useState('')



	const [isInsFoldersLoading, setIsInsFoldersLoading] = useState(false)
	const [isInsFolderCreating, setIsInsFolderCreating] = useState(false)

	const [isShowModalInsFolderCreating, setIsShowModalInsFolderCreating] = useState(false)




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






{/* MODALS */}


{isShowModalInsFolderCreating && <ModalWrapper
onCancel = {() => setIsShowModalInsFolderCreating(false)}
title = "Створення теки"
>




<CardBlock className="space-y-2">


								<CardBlock className="grid grid-cols-1 md:grid-cols-2 space-x-2">
									<label className=" justify-self-center self-center md:justify-self-start" htmlFor="title">Назва:</label>
									<InputBlock
										type="text"
										id="title"
										name="title"
										autoComplete="off"
										value={newInsFolderTitle}
										onChange={(e) => setNewInsFolderTitle(e.target.value)}
									/>
								</CardBlock>





								

							</CardBlock>









<CardBlock className="grid grid-cols-2 space-x-2">


								<ButtonBlock
									className="red-b flex justify-center items-center"
									onClick={() => setIsShowModalInsFolderCreating(false)}
								>
									<TextBlock className="text-2xl"><CancelIcon /></TextBlock>
									<TextBlock className=""> Скасувати</TextBlock>

								</ButtonBlock>



								<ButtonBlock
									disabled={!newInsFolderTitle}
									type="submit"
									className="green-b flex justify-center items-center"
									onClick={handleInsFolderCreate}
								>


									{isInsFolderCreating ?

										<Spinner color="green" />
										:
										<>
											<TextBlock className="text-2xl"><OkIcon /></TextBlock>
											<TextBlock className=""> 	Створити</TextBlock>
										</>

									}

								</ButtonBlock>
							</CardBlock>


	</ModalWrapper>}











			{/* MAIN */}



			{isInsFoldersLoading ?


				<ContainerBlock
					className="w-full h-full flex justify-start items-center"
				>
					<Spinner color="rgb(59 130 246)" />
				</ContainerBlock>

				:

				<>




<ButtonGroup>

	<ButtonBlock 
	className="green-b" 
	onClick={() => setIsShowModalInsFolderCreating(true)}>
		Створити теку
		</ButtonBlock>
</ButtonGroup>

			


				</>
			}


		</PageBTW >
	)

}
