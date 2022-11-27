import React, { useRef, useState } from 'react';

const TitleBTW = ({ children }) => {

	const [title, setTitle] = useState("");

	const titleInput = useRef("");


	return (
		<div className='' >
			<h1>{title}</h1>

			<input type="text" ref={titleInput} className="titleinput" />
			<button onClick={() => setTitle(titleInput.current.value)}>set title</button>


		</div>
	);
};

export default TitleBTW;