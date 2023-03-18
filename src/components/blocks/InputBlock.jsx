import React from 'react';

const InputBlock = ({ type, name, value, onChange, className, placeholder, ref }) => {

	const style = `

	InputBlock
	
	${className}

`


	return (
		<input className={style}
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			ref={ref}

		/>

	);
};

export default InputBlock;