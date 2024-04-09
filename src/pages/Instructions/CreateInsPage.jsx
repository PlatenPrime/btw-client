
// 86f656ab03b0dcf

import React, { useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, InputBlock, ModalConfirm, PageBTW } from '../../components'
import YouTube from 'react-youtube';

import Editor from './Editor/QuillEditor';
import useInsStore from './insStore';
import TitleImage from './components/TitleImage';
import useAuthStore from '../Auth/authStore';
import { toast } from 'react-toastify';

import { categories, departments, access } from './constants';
import { extractVideoId } from '../../utils/youtube';





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
	const [newVideo, setNewVideo] = useState('')

	const [videoUrl, setVideoUrl] = useState('');


	const [error, setError] = useState(null);


	const [isInsCreating, setIsInsCreating] = useState(false)
	const [isInsUpdating, setIsInsUpdating] = useState(false)


	const [isShowModalInsCreating, setIsShowModalInsCreating] = useState(false)
	const [isShowModalInsUpdating, setIsShowModalInsUpdating] = useState(false)


	console.log(insId);





	const [selectedGroups, setSelectedGroups] = useState([]);

	const handleGroupChange = (groupKey) => {
		if (selectedGroups.includes(groupKey)) {
			setSelectedGroups(selectedGroups.filter((key) => key !== groupKey));
		} else {
			setSelectedGroups([...selectedGroups, groupKey]);
		}
	};

	const handleVideoUrlChange = (event) => {
		const url = event.target.value;
		setVideoUrl(url);
		const id = extractVideoId(url);
		setNewVideo(id);
	};


	const handleInsCreate = async (createData) => {
		try {

			setIsInsCreating(true)


			const instruction = await createInstruction(createData)
			setInsId(instruction?._id)


		} catch (error) {
			console.error('Произошла ошибка:', error);
			setError(error.message)
			toast.error(error.message)
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
			setError(error.message)
			toast.error(error.message)
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
					disabled={insId || isInsCreating || !newTitle || !newBody }
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
						access: newAccess,
						video: newVideo
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
						access: newAccess,
						video: newVideo
					})}
					onCancel={() => setIsShowModalInsUpdating(false)}
					isConfirming={isInsUpdating}


				/>}













			<ContainerBlock
				className="p-2 space-y-4 "
			>


				<CardBlock
					className="flex justify-evenly items-center space-x-4"

				>

					<label htmlFor="">Назва інструкції: </label>

					<InputBlock
						name="newTitle"
						className="text-xl outline-none border-none p-3 px-8 bg-slate-700 focus:bg-slate-600 w-full
								 placeholder:font-light rounded-xl rounded-l-none
								"
						value={newTitle}
						onChange={(e) => setNewTitle(e.target.value)}
						placeholder="..."
					/>


				</CardBlock>

				<CardBlock
					className="flex justify-start items-center space-x-4"

				>

					<label htmlFor="">Зображення: </label>
					<CardBlock
						className="w-full flex justify-center"
					>
						<TitleImage newTitleImage={newTitleImage} setNewTitleImage={setNewTitleImage} />
					</CardBlock>

				</CardBlock>


				<div
					className="flex flex-col items-center space-y-2"
				>
					<InputBlock
						type="text"
						className="text-xl outline-none border-none p-3 px-8 bg-slate-700 focus:bg-slate-600 w-full
								 placeholder:font-light rounded-xl rounded-l-none
								"
						placeholder="Введите ссылку на видео с YouTube"
						value={videoUrl}
						onChange={handleVideoUrlChange}
					/>
					{newVideo&& <YouTube videoId={newVideo} />}
				</div>




	


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
