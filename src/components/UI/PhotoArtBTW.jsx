import React from 'react';

const PhotoArtBTW = ({ title }) => {

	const photoLink = `https://sharik.ua/images/elements_big/${title}_m1.jpg`;


	return (
		<div className=' w-full flex justify-center p-5 bg-gradient-to-b from-blue-500 to-transparent'>



			<img
				src={photoLink}
				alt="Здесь должно быть изображение артикула"
				width="200px"
			></img>

		</div>

	);
};

export default PhotoArtBTW;