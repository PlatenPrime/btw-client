import React, { useState } from 'react'
import { ButtonBlock, ButtonGroup, HeaderBlock, PageBTW } from '../../components'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./Draft.css"
import axios from 'axios';









export default function CreateInsPage() {



	const [insId, setInsId] = useState('')


	const [editorState, setEditorState] = useState(EditorState.createEmpty());

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
				title: "Test instruction",
				body: JSON.stringify(rawContent),
				category: "reglament",
				department: "Truba"

			});

			// В респонсе должна вернуться инструкция с ее Id



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
			const response = await axios.put('https://btw-server.up.railway.app/api/ins/65efdbf0eaaf0c8dea5fdd33', {
				body: JSON.stringify(rawContent),
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
					className="violet-b"
				>
					Imgur
				</ButtonBlock>



				<ButtonBlock
					className="green-b"
				>
					Створити
				</ButtonBlock>
				<ButtonBlock
					className="blue-b"
				>
					Зберегти
				</ButtonBlock>






			</ButtonGroup>









		</PageBTW >
	)
}
