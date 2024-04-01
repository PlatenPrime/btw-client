
// 86f656ab03b0dcf



import React, { useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, InputBlock, PageBTW } from '../../components'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';

import axios from 'axios';
import Editor from './QuillEditor';









export default function CreateInsPage() {



	const [insId, setInsId] = useState('')
	const [newTitle, setNewTitle] = useState('')
	const [newCategory, setNewCategory] = useState('')
	const [newDepartment, setNewDepartment] = useState('')
	const [newAccess, setNewAccess] = useState('')

	console.log(insId);





	const [insBody, setInsBody] = useState("");







	// Функция для первичного создания инструкции в базу данных MongoDB
	const createInsToMongoDB = async () => {
		try {




			// Отправляем данные на сервер для сохранения в базу MongoDB
			const response = await axios.post('https://btw-server.up.railway.app/api/ins', {
				title: newTitle,
				body: insBody,
				category: newCategory,
				department: newDepartment,
				access: newAccess

			});


			console.log(response);


			// В респонсе должна вернуться инструкция с ее Id
			if (response.status === 200) { setInsId(response?.data?._id) }
			console.log(insId);



		} catch (error) {
			console.error('Произошла ошибка:', error);
		}
	};




	// Сохранить изменения уже созданной инструкции

	const saveChangesToMongoDB = async () => {
		try {




			// Отправляем данные на сервер для сохранения в базу MongoDB
			const response = await axios.put(`https://btw-server.up.railway.app/api/ins/${insId}`, {
				title: newTitle,
				body: insBody,
				category: newCategory,
				department: newDepartment,
				access: newAccess
			});
			console.log(response);





		} catch (error) {
			console.error('Произошла ошибка:', error);

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
					disabled={insId}
					onClick={createInsToMongoDB}
				>
					Створити
				</ButtonBlock>
				<ButtonBlock
					className="blue-b"
					disabled={!insId}
					onClick={saveChangesToMongoDB}
				>
					Зберегти
				</ButtonBlock>






			</ButtonGroup>








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
