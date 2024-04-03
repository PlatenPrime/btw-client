import React, { useState, useEffect } from 'react';
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, PageBTW, TextBlock } from '../../components';
import { useParams } from 'react-router-dom';
import useInsStore from './insStore';
import Editor from "./QuillEditor"
import parse from 'html-react-parser';

export default function InsPage() {
	const { id } = useParams();

	const { getInstructionById, updateInstructionById, deleteInstructionById } = useInsStore();


	const [ins, setIns] = useState(null);
	const [insBody, setInsBody] = useState(null);


	console.log(ins);


	// MODALS





	// Toggles

	const [isInsEditing, setIsInsEditing] = useState(false);

	const [isInsFetching, setIsInsFetching] = useState(false);
	const [isInsUpdating, setIsInsUpdating] = useState(false);
	const [isInsDeleting, setIsInsDeleting] = useState(false);










	useEffect(() => {
		const fetchInstruction = async () => {
			try {
				setIsInsFetching(true);
				const fetchedInstruction = await getInstructionById(id);
				setIns(fetchedInstruction);
				setInsBody(fetchedInstruction?.body)
			} catch (error) {
				console.log(error.message);
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





	const handleUpdateInstruction = async (updatedData) => {
		try {
			setIsInsUpdating(true);
			await updateInstructionById(id, updatedData);
			const updatedInstruction = await getInstructionById(id);
			setIns(updatedInstruction);
		} catch (error) {
			console.log(error.message);
		} finally {
			setIsInsUpdating(false);
		}
	};

	const handleDeleteInstruction = async () => {
		try {
			setIsInsDeleting(true);
			await deleteInstructionById(id);
			// Redirect or handle success as needed
		} catch (error) {
			console.log(error.message);
		} finally {
			setIsInsDeleting(false);
		}
	};

	const handleToggleReadOnly = () => {
		console.log("Changing read-only mode");
		setIsInsEditing((prev) => !prev);
	};

	return (
		<PageBTW className="space-y-4">
			<HeaderBlock className="bg-blue-500 shadow-2xl shadow-blue-500">Інструкція</HeaderBlock>

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
							onClick={() => { }}
						>
							Зберегти
						</ButtonBlock>

						<ButtonBlock
							className="red-b"
						// onClick={handleToggleReadOnly}
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
					<Editor
						value={insBody}
						setValue={setInsBody}

					/>
					:
					<div
					>



						<TextBlock className="text-3xl">Назва: {ins?.title}</TextBlock>

						<CardBlock
							className="flex flex-col items-start p-8"
						>
							<TextBlock className="text-xl italic ">Доступ (хто може дивитись): {ins?.access}</TextBlock>
							<TextBlock className="text-xl italic">Категорія: {ins?.category}</TextBlock>
							<TextBlock className="text-xl italic">Відділ (для кого): {ins?.department}</TextBlock>
						</CardBlock>


						{insBody && parse(insBody)}
					</div>
				}








			</ContainerBlock>
		</PageBTW>
	);
}
