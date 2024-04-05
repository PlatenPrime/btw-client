
// 86f656ab03b0dcf



import React, { useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, InputBlock, ModalConfirm, PageBTW } from '../../components'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';

import axios from 'axios';
import Editor from './QuillEditor';









export default function CreateInsPage() {



	const [insId, setInsId] = useState('')
	const [newTitle, setNewTitle] = useState('')
	const [newCategory, setNewCategory] = useState('')
	const [newDepartment, setNewDepartment] = useState('')
	const [newAccess, setNewAccess] = useState('')



	const [isInsCreating, setInsCreating] = useState(false)
	const [isInsUpdating, setInsUpdating] = useState(false)


	const [isShowModalInsCreating, setIsShowModalInsCreating] = useState(false)
	const [isShowModalInsUpdating, setIsShowModalInsUpdating] = useState(false)


	console.log(insId);





	const [insBody, setInsBody] = useState("");




	const handleInsCreate = async (createData) => {
		try {

			setInsCreating(true)
			// Отправляем данные на сервер для сохранения в базу MongoDB
			const response = await axios.post('https://btw-server.up.railway.app/api/ins', createData);
			console.log(response);

			// В респонсе должна вернуться инструкция с ее Id
			if (response.status === 200) { setInsId(response?.data?._id) }
			console.log(insId);

		} catch (error) {
			console.error('Произошла ошибка:', error);
		} finally {
			setInsCreating(false)
			setIsShowModalInsCreating(false)
		}
	};



	const handleInsUpdate = async (updateData) => {
		try {

			setInsUpdating(true)
			// Отправляем данные на сервер для сохранения в базу MongoDB
			const response = await axios.put(`https://btw-server.up.railway.app/api/ins/${insId}`, updateData);
			console.log(response);

		} catch (error) {
			console.error('Произошла ошибка:', error);

		} finally {
			setInsUpdating(false)
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
					disabled={insId || isInsCreating || !newTitle || !insBody || !newCategory || !newDepartment || !newAccess}
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
						body: insBody,
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
						body: insBody,
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
						value={insBody}
						setValue={setInsBody}

					/>
				</ContainerBlock>




			</ContainerBlock>




		</PageBTW >
	)
}
