import { Sidebar } from 'flowbite-react';
import React from 'react';

const SidebarBTW = ({ children }) => {
	return (
		<div className=' h-16 w-1/6
		flex justify-center items-center   
		 bg-slate-400'>
			{children}
		</div>
	);
};

export default SidebarBTW;