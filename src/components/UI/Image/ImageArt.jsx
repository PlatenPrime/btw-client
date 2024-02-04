import React, { useState } from 'react';
import ImageBlock from '../blocks/ImageBlock';
import ModalInfo from '../Modal/ModalInfo';

const ImageArt = ({ size, artikul, className }) => {

	const defaultImageArtikul = "1102-3092"


	const [showModalFullImage, setShowModalFullImage] = useState(false)



	return (


		<>


			<ImageBlock
				src={`https://sharik.ua/images/elements_big/${artikul ? artikul : defaultImageArtikul}_m1.jpg`}
				width={size}
				height={size}
				alt="Фото артикула"
				className={` ${className} `}
				onClick={(e) => {
					e.stopPropagation()
					setShowModalFullImage(true)
				}}
			/>


			{showModalFullImage && <ModalInfo
				onCancel={() => { setShowModalFullImage(false) }}

			>

				<ImageBlock
					src={`https://sharik.ua/images/elements_big/${artikul ? artikul : defaultImageArtikul}_m1.jpg`}
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