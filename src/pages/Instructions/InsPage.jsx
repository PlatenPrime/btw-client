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
	const [newVideo, setNewVideo] = useState('')


	const [newCategory, setNewCategory] = useState('')
	const [newDepartment, setNewDepartment] = useState('')
	const [newAccess, setNewAccess] = useState('')
	const [newBody, setNewBody] = useState("");

	const [videoUrl, setVideoUrl] = useState('');

	console.log(ins);


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
					setNewCategory(fetchedInstruction?.category)
					setNewDepartment(fetchedInstruction?.department)
					setNewAccess(fetchedInstruction?.access)
					setNewBody(fetchedInstruction?.body)
					setNewVideo(fetchedInstruction?.video)
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

	const handleToggleReadOnly = () => {
		console.log("Changing read-only mode");
		setIsInsEditing((prev) => !prev);
	};


	const handleVideoUrlChange = (event) => {
		const url = event.target.value;
		setVideoUrl(url);
		const id = extractVideoId(url);
		setNewVideo(id);
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
						category: newCategory,
						department: newDepartment,
						access: newAccess,
						video: newVideo
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
									onClick={handleToggleReadOnly}
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
								onClick={handleToggleReadOnly}
							>
								Редагувати
							</ButtonBlock>

						}



					</ButtonGroup>



					<ContainerBlock>
						{/* Render your instruction content here */}
						{/* Pass handlers to child components for editing/deleting */}



						{isInsEditing ?

							<CardBlock>

								<ContainerBlock
									className="p-1 space-y-4 "
								>


									<CardBlock
										className="flex justify-start items-center space-x-4"

									>

										<label htmlFor="">Назва інструкції: </label>

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

										<label htmlFor="">Відео: </label>

										<InputBlock
											type="text"
											className="text-xl outline-none border-none p-3 px-8 bg-slate-700 focus:bg-slate-600 w-full
								 placeholder:font-light rounded-xl rounded-l-none
								"
											placeholder="https://www.youtube.com/..."
											value={videoUrl}
											onChange={handleVideoUrlChange}
										/>

									</CardBlock>

									<div
										className="flex flex-col items-center space-y-2"
									>

										{newVideo && <YouTube videoId={newVideo} />}
									</div>









									<ContainerBlock
										className="bg-blue-500/10
									shadow-2xl shadow-blue-500 rounded-xl"
									>
										<Editor
											value={newBody}
											setValue={setNewBody}

										/>
									</ContainerBlock>

								</ContainerBlock>
							</CardBlock>

							:
							<ContainerBlock
								className="p-1 space-y-4 "
							>



								<TextBlock className="text-3xl">Назва: {ins?.title}</TextBlock>



								<div
									className="flex flex-col items-center space-y-2 py-4
									bg-blue-500/10
									 rounded-xl  "
								>

									{newVideo && <YouTube

										videoId={newVideo}
									/>}
								</div>

								<ContainerBlock
									className="bg-blue-500/10
 rounded-xl"
								>
									<InsContainer>{insBody && parse(insBody)}</InsContainer>
								</ContainerBlock>



							</ContainerBlock>
						}








					</ContainerBlock>


				</>
			}

		</PageBTW>
	);
}
