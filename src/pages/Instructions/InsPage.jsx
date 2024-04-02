import React, { useState, useEffect } from 'react';
import { ButtonBlock, ButtonGroup, ContainerBlock, HeaderBlock, PageBTW } from '../../components';
import { useParams } from 'react-router-dom';
import useInsStore from './insStore';
import Editor from "./QuillEditor"
import parse from 'html-react-parser';

export default function InsPage() {
	const { id } = useParams();

	const { getInstructionById, updateInstructionById, deleteInstructionById } = useInsStore();



	const [isReadOnly, setIsReadOnly] = useState(false);


	const [instruction, setInstruction] = useState(null);
	const [insBody, setInsBody] = useState(null);


	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);



	useEffect(() => {
		const fetchInstruction = async () => {
			try {
				setLoading(true);
				const fetchedInstruction = await getInstructionById(id);
				setInstruction(fetchedInstruction);
				setInsBody(fetchedInstruction?.body)
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
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
			setLoading(true);
			await updateInstructionById(id, updatedData);
			const updatedInstruction = await getInstructionById(id);
			setInstruction(updatedInstruction);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleDeleteInstruction = async () => {
		try {
			setLoading(true);
			await deleteInstructionById(id);
			// Redirect or handle success as needed
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleToggleReadOnly = () => {
		console.log("Changing read-only mode");
		setIsReadOnly((prev) => !prev);
	};

	return (
		<PageBTW className="space-y-4">
			<HeaderBlock className="bg-blue-500 shadow-2xl shadow-blue-500">Інструкція</HeaderBlock>

			<ButtonGroup>
				<ButtonBlock
					className="blue-b"
					onClick={handleToggleReadOnly}
				>
					Read Toggle
				</ButtonBlock>
			</ButtonGroup>




			<ContainerBlock>
				{/* Render your instruction content here */}
				{/* Pass handlers to child components for editing/deleting */}



				{isReadOnly ?
					<Editor
						value={insBody}
						setValue={setInsBody}

					/>
					:
					<div

					>
						{insBody && parse(insBody)}
					</div>
				}








			</ContainerBlock>
		</PageBTW>
	);
}
