import React from 'react'
import { CardBlock, ContainerBlock } from '../../../components'
import { uploadImage } from '../../../utils/uploadImage';

export default function TitleImage({
	newTitleImage, setNewTitleImage
}) {


	const handleFileInputChange = async (event) => {
		const file = event.target.files[0];
		if (file) {
			const imageUrl = await uploadImage(file);
			console.log(imageUrl);
			setNewTitleImage(imageUrl);
		}
	};



	return (
		<ContainerBlock>
			<CardBlock>
				{newTitleImage ?
					<img
						src={newTitleImage}
						width={200}
					>
					</img>
					:

					<img
						src='https://i.pinimg.com/564x/13/21/15/1321155e80afc063f9eb4376785fbee3.jpg'
						width={200}
					></img>}
			</CardBlock>
			<input type="file" onChange={handleFileInputChange} />

		</ContainerBlock>
	)
}
