import React from 'react';

const PhotoArtBTW = ({ title }) => {

	const photoLink = `https://sharik.ua/images/elements_big/${title}_m1.jpg`;


	return (
		<img
			src={photoLink}
			alt="Здесь должно быть изображение артикула"
			width="200px"
		></img>
	);
};

export default PhotoArtBTW;