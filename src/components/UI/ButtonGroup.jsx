import React from 'react'
import CardBlock from './blocks/CardBlock'

export default function ButtonGroup({ children, className }) {
	return (
		<CardBlock
			className={`" grid grid:cols-1 lg:grid-cols-2 p-0 gap-2  rounded-xl text-sm" ${className}`}
		>
			{children}
		</CardBlock>
	)
}


ButtonGroup.Navigation = ({ children, className }) => <div className={`flex justify-center flex-wrap gap-2 bg-gradient-to-b from-slate-700 to-slate-800 rounded-xl ${className}`}>{children}</div>

ButtonGroup.Actions = ({ children, className }) => <div className={`flex justify-center flex-wrap gap-2  bg-gradient-to-b from-slate-700 to-slate-800 rounded-xl ${className}`}>{children}</div>


