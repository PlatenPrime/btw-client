import React from 'react'
import ContainerBlock from './blocks/ContainerBlock'

export default function ButtonGroup({ children }) {
	return (
		<ContainerBlock
			className="bg-gradient-to-b from-slate-700/50 to-slate-900/50 grid grid:cols-1 lg:grid-cols-2 p-2 gap-2  rounded-xl text-sm"
		>
			{children}
		</ContainerBlock>
	)
}


ButtonGroup.Actions = ({ children, className }) => <div className={`flex justify-start flex-wrap gap-2 ${className}`}>{children}</div>

ButtonGroup.Navigation = ({ children, className }) => <div className={`flex justify-end flex-wrap gap-2 ${className}`}>{children}</div>
