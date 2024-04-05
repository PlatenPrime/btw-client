// Importing helper modules
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// Importing core components
import QuillEditor, { Quill } from "react-quill";
import ImageResize from 'quill-image-resize-module-react';

// Importing styles
import "react-quill/dist/quill.snow.css";
import styles from "./styles.module.css";
import "./editor.css"



Quill.register('modules/imageResize', ImageResize);







const Editor = ({
	value, setValue
}) => {



	console.log(value);


	// Editor ref
	const quill = useRef();

	// Handler to handle button clicked
	function handler() {
		console.log(value);
	}

	const imageHandler = useCallback(() => {
		// Создаем input элемент
		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");
		input.click();

		// Когда выбран файл
		input.onchange = () => {
			const file = input.files[0];
			const formData = new FormData();
			formData.append("image", file);

			fetch("https://api.imgur.com/3/image", {
				method: "POST",
				headers: {
					Authorization: "Client-ID 86f656ab03b0dcf"
				},
				body: formData
			})
				.then(response => response.json())
				.then(data => {
					if (data.success) {
						const imageUrl = data.data.link;
						const quillEditor = quill.current.getEditor();
						const range = quillEditor.getSelection(true);
						quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
					} else {
						console.error("Ошибка при загрузке изображения на сервер Imgur:", data);
					}
				})
				.catch(error => {
					console.error("Ошибка при отправке запроса на сервер Imgur:", error);
				});
		};
	}, []);








	const modules = useMemo(
		() => ({
			toolbar: {
				container: [
					// [{ header: [1, 2, 3, 4, false] }],
					[{ 'font': [] }, { 'size': [] }],
					["bold", "italic", "underline", "strike", "blockquote", ],
					[{ 'color': [] }, { 'background': [] }],
					[
						{ list: "ordered" },
						{ list: "bullet" },
						{ indent: "-1" },
						{ indent: "+1" },
					],
					["link", "image"],
					["clean"],
					[{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
				],
				handlers: {
					image: imageHandler,
					// video: youtubeVideoHandler,
				},
			},
			clipboard: {
				matchVisual: true,
			},
			imageResize: {
				parchment: Quill.import('parchment'),
				modules: ['Resize', 'DisplaySize']
			},


		}),
		[imageHandler]
	);

	const formats = [
		"header",
		"bold",
		"font",
		"size",
		"italic",
		"underline",
		"strike",
		"blockquote",
		"list",
		"bullet",
		"indent",
		"link",
		"image",
		"color",
		"clean",
		'align',
		"background",
	];





	return (
		<div className={styles.wrapper}>
			<QuillEditor
				ref={(el) => (quill.current = el)}
				className={styles.editor}
				placeholder='Напиши тут...'
				theme="snow"
				value={value}
				formats={formats}
				modules={modules}
				onChange={(value) => setValue(value)}


			/>

		</div>
	);
};

export default Editor;