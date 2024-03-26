import React, { useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, InputBlock, PageBTW } from '../../components'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./Draft.css"
import axios from 'axios';









export default function CreateInsPage() {



	const [insId, setInsId] = useState('')
	const [newTitle, setNewTitle] = useState('')
	const [newCategory, setNewCategory] = useState('')
	const [newDepartment, setNewDepartment] = useState('')
	const [newAccess, setNewAccess] = useState('')



	const [editorState, setEditorState] = useState(EditorState.createEmpty());





	console.log(insId);








	// Функция для обновления состояния редактора при вводе текста
	const handleEditorStateChange = (newEditorState) => {
		setEditorState(newEditorState);
	};


	// Функция для первичного создания инструкции в базу данных MongoDB
	const createInsToMongoDB = async () => {
		try {
			const contentState = editorState.getCurrentContent();
			const rawContent = convertToRaw(contentState);



			// Отправляем данные на сервер для сохранения в базу MongoDB
			const response = await axios.post('https://btw-server.up.railway.app/api/ins', {
				title: newTitle,
				body: JSON.stringify(rawContent),
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

			const contentState = editorState.getCurrentContent();
			const rawContent = convertToRaw(contentState);


			// Отправляем данные на сервер для сохранения в базу MongoDB
			const response = await axios.put(`https://btw-server.up.railway.app/api/ins/${insId}`, {
				title: newTitle,
				body: JSON.stringify(rawContent),
				category: newCategory,
				department: newDepartment,
				access: newAccess
			});
			console.log(response);





		} catch (error) {
			console.error('Произошла ошибка:', error);

		}
	}



	const uploadImageCallback = async (file) => {
		const formData = new FormData();
		formData.append('image', file);

		try {
			const response = await fetch('https://api.imgur.com/3/image', {
				method: 'POST',
				headers: {
					Authorization: 'Client-ID 86f656ab03b0dcf', // Вставьте ваш Client ID Imgur
				},
				body: formData,
			});

			if (!response.ok) {
				throw Error(response.statusText);
			}

			console.log(response);


			const data = await response.json();
			return { data: { link: data.data.link } };
		} catch (error) {
			console.error('Error uploading image to Imgur:', error);
			return { error: 'Failed to upload image' };
		}
	};









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








				<Editor
					editorState={editorState}
					onEditorStateChange={handleEditorStateChange}
					wrapperClassName="wrapper-class"
					editorClassName="editor-class"
					toolbarClassName="toolbar-class"
					localization={{
						locale: 'ru',
					}}
					toolbar={{
						image: {
							uploadCallback: uploadImageCallback,
							alt: { present: true, mandatory: true },
						},
						options: ['history', 'fontFamily', 'fontSize', 'list', 'textAlign', 'inline', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove',],
						inline: {
							options: ['bold', 'italic', 'underline', 'strikethrough'],
						},
						// blockType: {
						// 	inDropdown: true,
						// 	options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
						// },
						fontSize: {
							options: [8, 10, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
						},
						fontFamily: {
							options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana', "Roboto"],
						},
						textAlign: {
							inDropdown: true,
						},
						list: {
							inDropdown: true,
						},
						history: {
							inDropdown: true,
						},
						colorPicker: {
							// icon:  <AiFillAlipayCircle />,
							className: undefined,
							component: undefined,
							popupClassName: undefined,
							colors: ['rgb(239 68 68)', 'rgb(0 0 0)', 'rgb(255 255 255)', 'rgb(248 250 252)'],
						},



					}}
				/>
			</ContainerBlock>




		</PageBTW >
	)
}
