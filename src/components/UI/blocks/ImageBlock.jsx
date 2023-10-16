import React from 'react';

const ImageBlock = ({ src, alt, width, height, className, onClick }) => {


	const style = `

	ImageBlock
	
	${className}

`



	return (
		<img
			src={src}
			alt={alt}
			width={width}
			height={height}
			className={style}
			onClick={onClick}
		>

		</img>
	);
};

export default ImageBlock;