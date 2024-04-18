import React, { useState, useEffect } from 'react';
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, InputBlock, ModalConfirm, ModalDelete, PageBTW, Spinner, TextBlock } from '../../components';
import { useNavigate, useParams } from 'react-router-dom';
import useInsStore from './insStore';
import useAuthStore from '../../pages/Auth/authStore';
import Editor from "./Editor/QuillEditor";
import parse from 'html-react-parser';
import InsContainer from './components/InsContainer';

import YouTube from 'react-youtube';
import { extractVideoId } from '../../utils/youtube';
import YoutubeCard from '../../components/UI/YoutubeCard/YoutubeCard';
import TitleImage from './components/TitleImage';



export default function InsPage() {

	const { id } = useParams();
	const navigate = useNavigate()

	const { getInstructionById, updateInstructionById, deleteInstructionById } = useInsStore();
	const { user } = useAuthStore();

	const [error, setError] = useState(null);

	const [ins, setIns] = useState(null);
	const [insBody, setInsBody] = useState(null);



	const [newTitle, setNewTitle] = useState('')
	const [newTitleImage, setNewTitleImage] = useState('')
	const [newVideoUrl, setNewVideoUrl] = useState('')

	const [newBody, setNewBody] = useState("");


	console.log(ins);
	console.log("URL", newVideoUrl);
	console.log("TITLE", newTitle);
	console.log("TItleImage", newTitleImage);





	// MODALS


	const [isShowModalInsUpdating, setIsShowModalInsUpdating] = useState(false)
	const [isShowModalInsDeleting, setIsShowModalInsDeleting] = useState(false)




	// SPINNERS

	const [isInsEditing, setIsInsEditing] = useState(false);

	const [isInsFetching, setIsInsFetching] = useState(false);

	const [isInsUpdating, setIsInsUpdating] = useState(false);
	const [isInsDeleting, setIsInsDeleting] = useState(false);


	useEffect(() => {
		const fetchInstruction = async () => {
			try {
				setIsInsFetching(true);
				const fetchedInstruction = await getInstructionById(id);

				if (fetchedInstruction) {
					setIns(fetchedInstruction);
					setInsBody(fetchedInstruction?.body)
					setNewTitle(fetchedInstruction?.title)
					setNewBody(fetchedInstruction?.body)
					setNewTitleImage(fetchedInstruction?.titleImage)
					setNewVideoUrl(fetchedInstruction?.videoUrl)
				}

			} catch (error) {
				console.log(error.message);
				setError(error.message);
			} finally {
				setIsInsFetching(false);
			}
		};

		fetchInstruction();

		// Cleanup function to cancel any pending requests if component unmounts
		return () => {
			// Your cleanup code here, if any
		};
	}, [getInstructionById, id]);





	const handleInsUpdate = async (updateData) => {
		try {
			setIsInsUpdating(true);
			const updatedInstruction = await updateInstructionById(id, updateData);
			setIns(updatedInstruction);
			setInsBody(updatedInstruction?.body)
		} catch (error) {
			console.log(error.message);
			setError(error.message);
		} finally {
			setIsInsUpdating(false);
			setIsShowModalInsUpdating(false);
			setIsInsEditing(false);
		}
	};

	const handleInsDelete = async () => {
		try {
			setIsInsDeleting(true);
			await deleteInstructionById(id);
			navigate("/ins")
		} catch (error) {
			console.log(error.message);
			setError(error.message);
		} finally {
			setIsInsDeleting(false);
			setIsShowModalInsDeleting(false);
		}
	};





	return (
		<PageBTW className="space-y-4">
			<HeaderBlock className="bg-blue-500 shadow-2xl shadow-blue-500">Інструкція</HeaderBlock>


			{/* MODALS */}

			{isShowModalInsUpdating &&
				<ModalConfirm
					ask="Зберегти інструкцію?"
					onConfirm={() => handleInsUpdate({

						title: newTitle,
						titleImage: newTitleImage,
						body: newBody,
						videoUrl: newVideoUrl
					})}
					onCancel={() => setIsShowModalInsUpdating(false)}
					isConfirming={isInsUpdating}

				/>}


			{isShowModalInsDeleting && <ModalDelete
				ask="Видалити інструкцію?"
				onDelete={handleInsDelete}
				onCancel={() => setIsShowModalInsDeleting(false)}
				isDeleting={isInsDeleting}
			/>}



			{isInsFetching

				?

				<ContainerBlock
					className="w-full h-full flex justify-start items-center"
				>
					<Spinner color="rgb(59 130 246 )" />
				</ContainerBlock>

				:

				<>

					<ButtonGroup>

						{isInsEditing ?

							<>
								<ButtonBlock
									className="pink-b"
									onClick={() => setIsInsEditing(false)}
								>
									Скасувати
								</ButtonBlock>

								<ButtonBlock
									className="green-b"
									onClick={() => setIsShowModalInsUpdating(true)}
								>
									Зберегти
								</ButtonBlock>

								<ButtonBlock
									className="red-b"
									onClick={() => setIsShowModalInsDeleting(true)}
								>
									Видалити
								</ButtonBlock>
							</>
							:
							<ButtonBlock
								className="blue-b"
								onClick={() => setIsInsEditing(true)}
							>
								Редагувати
							</ButtonBlock>

						}
					</ButtonGroup>



					<ContainerBlock>
						{isInsEditing

							?




							<CardBlock className=" flex flex-col space-y-4">


								<CardBlock
									className="flex justify-evenly items-center space-x-4"

								>

									<label
										className='min-w-[200px]'
										htmlFor="">Назва інструкції:
									</label>

									<InputBlock
										name="newTitle"
										className="text-xl outline-none border-none p-3 px-8 bg-slate-700 focus:bg-slate-600 w-full
								 placeholder:font-light rounded-xl rounded-l-none
								"
										value={newTitle}
										onChange={(e) => setNewTitle(e.target.value)}
										placeholder="..."
									/>


								</CardBlock>





								<CardBlock
									className="flex justify-start items-center space-x-4"

								>

									<label htmlFor=""
										className='min-w-[200px]'
									>
										Зображення:
									</label>



									<CardBlock
										className="w-full flex justify-center"
									>
										<TitleImage newTitleImage={newTitleImage} setNewTitleImage={setNewTitleImage} />
									</CardBlock>

								</CardBlock>




								<CardBlock
									className="flex justify-start items-center space-x-4"
								>
									<label htmlFor=""
										className='min-w-[200px]'
									>
										Відео:
									</label>



									<InputBlock
										type="text"
										className="text-xl outline-none border-none p-3 px-8 bg-slate-700 focus:bg-slate-600 w-full
								 placeholder:font-light rounded-xl rounded-l-none
								"
										placeholder="Введите ссылку на видео с YouTube"
										value={newVideoUrl}
										onChange={(e) => setNewVideoUrl(e.target.value)}
									/>

								</CardBlock>



								<CardBlock
									className="flex justify-center items-center"
								>
									{newVideoUrl
										&&
										<YoutubeCard url={newVideoUrl} />}
								</CardBlock>





								<ContainerBlock
									className="p-1 space-y-4 "
								>

									<Editor
										value={newBody}
										setValue={setNewBody}

									/>


								</ContainerBlock>
							</CardBlock>






							:


							// ОТОБРАЖЕНИЕ	


							<ContainerBlock
								className="p-1 space-y-4 "
							>


								<CardBlock
									className="flex flex-col lg:flex-row lg:space-x-4 items-start"
								>
									{ins?.TitleImage ?

										<CardBlock
											className="flex justify-center items-center w-full lg:w-fit aspect-video"
										>

											<img src={ins?.titleImage} alt="" className="w-[300px] " />

										</CardBlock>

										:

										<CardBlock
											className="flex justify-center items-center w-full lg:w-fit "
										>
											<TextBlock className="bg-blue-900 w-[300px] aspect-video">
												Зображення
											</TextBlock>
										</CardBlock>


									}

									<TextBlock className="text-3xl"> {ins?.title}</TextBlock>
								</CardBlock>






								<CardBlock
									className="flex justify-center items-center"
								>
									{ins?.videoUrl &&

										<YoutubeCard url={ins?.videoUrl} />

									}

								</CardBlock>


								{insBody
									?
									<InsContainer>{parse(insBody)}</InsContainer>
									:
									<TextBlock className="text-2xl italic"  >Текст інструкції відсутній</TextBlock>
								}


							</ContainerBlock>


						}


					</ContainerBlock>


				</>
			}

		</PageBTW>
	);
}
