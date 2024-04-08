
// 86f656ab03b0dcf

import React, { useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, InputBlock, ModalConfirm, PageBTW } from '../../components'


import Editor from './Editor/QuillEditor';
import useInsStore from './insStore';
import TitleImage from './components/TitleImage';
import useAuthStore from '../Auth/authStore';





export default function CreateInsPage() {

	const { user } = useAuthStore();

	const { createInstruction, updateInstructionById } = useInsStore();



	const [insId, setInsId] = useState('')



	const [newTitle, setNewTitle] = useState('')
	const [newTitleImage, setNewTitleImage] = useState('')
	const [newCategory, setNewCategory] = useState('')
	const [newDepartment, setNewDepartment] = useState('')
	const [newAccess, setNewAccess] = useState('')
	const [newBody, setNewBody] = useState("");






	const [isInsCreating, setIsInsCreating] = useState(false)
	const [isInsUpdating, setIsInsUpdating] = useState(false)


	const [isShowModalInsCreating, setIsShowModalInsCreating] = useState(false)
	const [isShowModalInsUpdating, setIsShowModalInsUpdating] = useState(false)


	console.log(insId);










	const handleInsCreate = async (createData) => {
		try {

			setIsInsCreating(true)


			const instruction = await createInstruction(createData)
			setInsId(instruction?._id)


		} catch (error) {
			console.error('Произошла ошибка:', error);
		} finally {
			setIsInsCreating(false)
			setIsShowModalInsCreating(false)
		}
	};



	const handleInsUpdate = async (updateData) => {
		try {

			setIsInsUpdating(true)
			await updateInstructionById(insId, updateData);

		} catch (error) {
			console.error('Произошла ошибка:', error);

		} finally {
			setIsInsUpdating(false)
			setIsShowModalInsUpdating(false)
		}
	}







	return (
		<PageBTW
			className="space-y-4"
		>
			<HeaderBlock
				className="bg-blue-500 shadow-2xl shadow-blue-500"
			>
				Створення інструкції
			</HeaderBlock>


			<ButtonGroup>


				<ButtonBlock
					className="green-b"
					disabled={insId || isInsCreating || !newTitle || !newBody || !newCategory || !newDepartment || !newAccess}
					onClick={() => setIsShowModalInsCreating(true)}
				>
					Створити
				</ButtonBlock>





				<ButtonBlock
					className="blue-b"
					disabled={!insId}
					onClick={() => setIsShowModalInsUpdating(true)}
				>
					Зберегти
				</ButtonBlock>
			</ButtonGroup>




			{/* MODALS */}




			{isShowModalInsCreating &&

				<ModalConfirm
					ask="Створити інструкцію?"
					onConfirm={() => handleInsCreate({

						title: newTitle,
						titleImage: newTitleImage,
						author: user._id,
						body: newBody,
						category: newCategory,
						department: newDepartment,
						access: newAccess
					})}
					onCancel={() => setIsShowModalInsCreating(false)}
					isConfirming={isInsCreating}

				/>}


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













			<ContainerBlock
				className="p-1 space-y-4 "
			>


				<CardBlock
					className="flex justify-start items-center space-x-4"

				>

					<label htmlFor="">Зображення: </label>

					<TitleImage newTitleImage={newTitleImage} setNewTitleImage={setNewTitleImage} />


				</CardBlock>





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




		</PageBTW >
	)
}
