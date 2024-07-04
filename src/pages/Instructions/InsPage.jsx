import React, { useState } from 'react';
import { ButtonBlock, ButtonGroup, HeaderBlock, ModalDelete, PageBTW } from '../../components';
import { useNavigate, useParams } from 'react-router-dom';
import useInsStore from './stores/insStore';
import useFetchInsById from './hooks/useFetchInsById';
import InsEditContainer from './components/InsEditContainer';
import InsContainer from './components/InsContainer';
import { CancelIcon, DeleteIcon, DoneIcon, EditIcon } from '../../components/UI/Icons';

export default function InsPage() {

	const { id } = useParams();
	const navigate = useNavigate()

	const { deleteInstructionById } = useInsStore();
	const { instruction, isInsLoading, author } = useFetchInsById(id)

	// MODALS

	const [isShowModalInsUpdating, setIsShowModalInsUpdating] = useState(false)
	const [isShowModalInsDeleting, setIsShowModalInsDeleting] = useState(false)

	const [isInsEditing, setIsInsEditing] = useState(false);
	const [isInsDeleting, setIsInsDeleting] = useState(false);


	const handleInsDelete = async () => {
		try {
			setIsInsDeleting(true);
			await deleteInstructionById(id);
			navigate("/ins")
			
		} catch (error) {
			console.log(error.message);

		} finally {
			setIsInsDeleting(false);
			setIsShowModalInsDeleting(false);
		}
	};


	return (
		<PageBTW
			isLoading={isInsLoading}
			className=""
		>
			<HeaderBlock className="bg-blue-500 shadow-sm shadow-blue-500 z-50">Інструкція</HeaderBlock>

			{isShowModalInsDeleting && <ModalDelete
				ask="Видалити інструкцію?"
				onDelete={handleInsDelete}
				onCancel={() => setIsShowModalInsDeleting(false)}
				isDeleting={isInsDeleting}
			/>}

			<ButtonGroup>

			<ButtonGroup.Navigation>
			</ButtonGroup.Navigation>

				<ButtonGroup.Actions>
					{isInsEditing ?
						<>
							<ButtonBlock
								className="fuchsia-b"
								onClick={() => setIsInsEditing(false)}
							>
								<CancelIcon />
								Скасувати
							</ButtonBlock>

							<ButtonBlock
								className="green-b"
								onClick={() => setIsShowModalInsUpdating(true)}
							>
								<DoneIcon />
								Зберегти
							</ButtonBlock>

							<ButtonBlock
								className="red-b"
								onClick={() => setIsShowModalInsDeleting(true)}
							>
								<DeleteIcon />
								Видалити
							</ButtonBlock>
						</>
						:
						<ButtonBlock
							className="blue-b"
							onClick={() => setIsInsEditing(true)}
						>
							<EditIcon />
							Редагувати
						</ButtonBlock>

					}
				</ButtonGroup.Actions>
			</ButtonGroup>

			<InsContainer
				instruction={instruction}
				author={author}
				isInsEditing={isInsEditing}
			/>

			<InsEditContainer
				ins={instruction}
				isInsEditing={isInsEditing}
				setIsInsEditing={setIsInsEditing}
				isShowModalInsUpdating={isShowModalInsUpdating}
				setIsShowModalInsUpdating={setIsShowModalInsUpdating}

			/>

		</PageBTW>
	);
}
