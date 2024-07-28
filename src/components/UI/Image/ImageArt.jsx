import React, { useState } from 'react';
import ImageBlock from '../blocks/ImageBlock';
import ModalInfo from '../Modal/ModalInfo';

const ImageArt = ({ size, artikul, className, srcLink }) => {


	let correctItem = `${artikul}_m1`

	if (!artikul) correctItem = "1102-3092_m1"

	if (artikul === "1102-3170") correctItem = "1102-3170_m1 "

	const src = `https://sharik.ua/images/elements_big/${correctItem}.jpg`

	const [showModalFullImage, setShowModalFullImage] = useState(false)

	return (


		<>


			<ImageBlock
				src={srcLink || src}
				width={size}
				height={size}
				alt="Фото артикула"
				className={`cursor-zoom-in ${className} `}
				onClick={(e) => {

					e.stopPropagation()
					setShowModalFullImage(true)
				}}
			/>


			{showModalFullImage &&
				<ModalInfo
					onCancel={(e) => {

						setShowModalFullImage(false)
					}}

				>

					<ImageBlock
						src={srcLink || src}
						width={500}
						height={500}
						alt="Фото артикула"
						className={` ${className} `}

					/>



				</ModalInfo>}




		</>


	);
};

export default ImageArt;