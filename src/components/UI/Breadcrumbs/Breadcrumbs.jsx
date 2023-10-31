import React from 'react';
import { Link } from 'react-router-dom';
import TextBlock from '../blocks/TextBlock';

const Breadcrumbs = ({ paths }) => {
	return (
		<div className="flex flex-wrap  rounded p-3 space-x-2">
			{paths.map((path, index) => (
				<span

					key={index}>
					{index > 0 && ' / '}
					{path.link
						?
						<Link
							className=" text-xl border  border-slate-500 hover:bg-slate-500 p-2 rounded-md transition ease-in-out duration-300 "
							to={path.link}>
							{path.text}
						</Link>
						:
						<span
							className="text-xl"
						>{path.text}</span>
					}
				</span>
			))}
		</div>
	);
};

export default Breadcrumbs;