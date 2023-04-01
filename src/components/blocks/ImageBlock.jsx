import React from 'react';

const ImageBlock = ({src, alt, width, height, className}) => {


	const style = `

	ImageBlock
	
	${className}

`



	return (
		<img src={src} alt={alt} width={width} height={height}  className={style}       >
			
		</img>
	);
};

export default ImageBlock;