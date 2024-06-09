import React from 'react';
import HeaderBlock from '../blocks/HeaderBlock';
import ContainerBlock from '../blocks/ContainerBlock';
import Spinner from '../Spinner/Spinner';

const PageBTW = ({ children, className, isLoading }) => {


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



	return (

		<div className={style}>
			{children}
		</div>

	);
};

export default PageBTW;