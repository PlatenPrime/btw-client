import React from 'react';
import HeaderBlock from '../blocks/HeaderBlock';
import ContainerBlock from '../blocks/ContainerBlock';
import Spinner from '../Spinner/Spinner';

import TextBlock from '../blocks/TextBlock';

export default  function PageBTW  ({ children, className, isLoading, error }) {

	const style = `
	PageBTW sm:container mx-auto  w-full pt-0 relative
	${className}
`


	if (isLoading) {
		return (
			<div className={style}>
				<HeaderBlock
					className="text-transparent bg-gradient-to-b from-slate-700/50 to-slate-800/50 "
				>
					Артикул
				</HeaderBlock>
				<ContainerBlock
					className="w-full h-full flex justify-center items-center  bg-gradient-to-b from-slate-700/50 to-slate-900/50"
				>
					<Spinner color="rgb(148 163 184 )" />
				</ContainerBlock>
			</div>
		)
	}


	if (error) {
		return (
			<div className={style}>
				<HeaderBlock
					className="bg-rose-500 shadow-sm shadow-rose-500 "
				>
					Помилка
				</HeaderBlock>

				<ContainerBlock
					className="w-full h-full flex justify-center items-center  bg-gradient-to-b from-slate-700/50 to-slate-900/50"
				>
					<TextBlock className="text-3xl text-rose-500">
						{error.message}
					</TextBlock>
				</ContainerBlock>
			</div>
		)
	}


	return (

		<div className={style}>
			{children}
		</div>

	);
};




function Header({ children, className }) {
	return (
		<HeaderBlock
			className={`text-transparent bg-gradient-to-b from-slate-700/50 to-slate-800/50 ${className}`}
		>
			{children}
		</HeaderBlock>
	)
}



function Container({ children, className }) {
	return (
		<ContainerBlock
			className={`grid gap-2 ${className}`}
		>
			{children}
		</ContainerBlock>
	)
}


PageBTW.Header = Header;
PageBTW.Container = Container;
