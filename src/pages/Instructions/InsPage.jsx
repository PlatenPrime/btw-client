import React, { useState, useEffect } from 'react';
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, InputBlock, ModalConfirm, ModalDelete, PageBTW, Spinner, TextBlock } from '../../components';
import { useNavigate, useParams } from 'react-router-dom';
import useInsStore from './insStore';
import useAuthStore from '../../pages/Auth/authStore';
import Editor from "./Editor/QuillEditor";
import parse from 'html-react-parser';
import InsContainer from './components/InsContainer';

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
	const [newCategory, setNewCategory] = useState('')
	const [newDepartment, setNewDepartment] = useState('')
	const [newAccess, setNewAccess] = useState('')
	const [newBody, setNewBody] = useState("");


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
						access: newAccess
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
											className=""
											value={newTitle}
											onChange={(e) => setNewTitle(e.target.value)}
											placeholder="..."
										/>


									</CardBlock>



									<CardBlock
										className="flex justify-start items-center space-x-4"
									>
										{/* регламент, посадова */}
										<label htmlFor="">Категорія: </label>

										<InputBlock
											name="newCategory"
											className=""
											value={newCategory}
											onChange={(e) => setNewCategory(e.target.value)}
											placeholder="регламент, посадова "
										/>


									</CardBlock>



									<CardBlock
										className="flex justify-start items-center space-x-4"
									>

										<label htmlFor="">Відділ: </label>

										<InputBlock
											name="newDepartment"
											className=""
											value={newDepartment}
											onChange={(e) => setNewDepartment(e.target.value)}
											placeholder="Погреби, Труба, Дніпро "
										/>


									</CardBlock>


									<CardBlock
										className="flex justify-start items-center space-x-4"
									>

										<label htmlFor="">Доступ: </label>

										<InputBlock
											name="newAccess"
											className=""
											value={newAccess}
											onChange={(e) => setNewAccess(e.target.value)}
											placeholder="Тільки менеджери, Бтрейд "
										/>

									</CardBlock>







									<ContainerBlock>
										<Editor
											value={newBody}
											setValue={setNewBody}

										/>
									</ContainerBlock>

								</ContainerBlock>
							</CardBlock>

							:
							<ContainerBlock
							>



								<TextBlock className="text-3xl">Назва: {ins?.title}</TextBlock>

								<CardBlock
									className="flex flex-col items-start p-8"
								>
									<TextBlock className="text-xl italic ">Доступ (хто може дивитись): {ins?.access}</TextBlock>
									<TextBlock className="text-xl italic">Категорія: {ins?.category}</TextBlock>
									<TextBlock className="text-xl italic">Відділ (для кого): {ins?.department}</TextBlock>
								</CardBlock>

								<InsContainer>{insBody && parse(insBody)}</InsContainer>




							</ContainerBlock>
						}








					</ContainerBlock>


				</>
			}

		</PageBTW>
	);
}
