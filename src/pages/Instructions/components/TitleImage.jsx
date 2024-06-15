import React, { useState } from 'react'
import { CardBlock, ContainerBlock, Spinner } from '../../../components'
import { uploadImage } from '../../../utils/uploadImage';

export default function TitleImage({
	newTitleImage, setNewTitleImage
}) {



	const [isImageUploading, setIsImageUploading] = useState(false)









	const handleFileInputChange = async (event) => {
		const file = event.target.files[0];
		if (file) {

			try {
				setIsImageUploading(true)

				const imageUrl = await uploadImage(file);
				console.log(imageUrl);
				setNewTitleImage(imageUrl);
			} catch (error) {

			} finally {
				setIsImageUploading(false)
			}



		}
	};



	return (
		<ContainerBlock
			className="flex flex-col gap-2 items-center w-full"
		>



			<CardBlock className="rounded-xl" >

				{isImageUploading ?
					<Spinner />

					:

					newTitleImage
						?
						<img
							alt='Фото инструкції'
							src={newTitleImage}
							width={200}
						>
						</img>
						:

						<img
						className="rounded-xl"
							alt='Фото инструкції'
							src='https://placehold.co/600x400?text=Інструкція'
							width={200}
						></img>}
			</CardBlock>

			<input
				type="file"
				onChange={handleFileInputChange}
				className=""
			/>


		</ContainerBlock>
	)
}
