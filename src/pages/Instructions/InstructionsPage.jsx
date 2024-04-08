import React, { useEffect, useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, PageBTW, Spinner, TextBlock } from '../../components'
import { useNavigate } from 'react-router-dom'
import useInsStore from './insStore'
import YouTube from 'react-youtube';



// DFNNauCXiFM

export default function InstructionsPage() {



	const navigate = useNavigate()



	const { instructions, getAllInstructions } = useInsStore()


	const [isInsLoading, setIsInsLoading] = useState(false)




	useEffect(() => {


		const fetchIns = async () => {
			try {
				setIsInsLoading(true)


				const instructions = await getAllInstructions()

				console.log("Інструкції завантажені", instructions);


			} catch (error) {
				console.log(error);

			} finally {
				setIsInsLoading(false)
			}
		}



		fetchIns()


	}, [])






	return (
		<PageBTW
			className="space-y-4"
		>
			<HeaderBlock
				className="bg-blue-500 shadow-2xl shadow-blue-500"
			>
				Інструкції
			</HeaderBlock>



			{isInsLoading ?


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
							onClick={() => navigate("/ins/new")}

						>
							Створити інструкцію
						</ButtonBlock>
					</ButtonGroup>






					<div
					className="flex justify-center"
					>
						<YouTube videoId="DFNNauCXiFM" />
					</div>




					<ContainerBlock>
						{instructions.length < 1
							?
							<TextBlock className="text-blue-100 italic" >Інструкцій немає або вони не завантажились</TextBlock>
							:

							<CardBlock
								className="space-y-2"
							>

								{instructions?.map((ins, i) => <CardBlock
									className="p-8 cursor-pointer
									bg-blue-500/10 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500 
									
									transition ease-in-out duration-1000 
									
									
									"
									onClick={() => navigate(`/ins/${ins?._id}`)}
								>
									<TextBlock
										className="justify-start"
									>
										{i + 1}. {ins?.title}

									</TextBlock>
									<CardBlock>{ins?.category}</CardBlock>
									<CardBlock>{ins?.department}</CardBlock>
								</CardBlock>
								)}


							</CardBlock>}

					</ContainerBlock>













				</>
			}


		</PageBTW >
	)
}
