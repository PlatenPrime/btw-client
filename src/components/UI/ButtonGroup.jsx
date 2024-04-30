import React from 'react'
import CardBlock from './blocks/CardBlock'

export default function ButtonGroup({ children }) {
	return (
		<CardBlock
			className="grid grid:cols-1 lg:grid-cols-2 p-2 gap-2 bg-slate-800/50 rounded-xl text-sm"
		>
			{children}
		</CardBlock>
	)
}


ButtonGroup.Actions = ({ children }) => <div className="flex justify-start flex-wrap gap-2 ">{children}</div>

ButtonGroup.Navigation = ({ children }) => <div className="flex justify-end flex-wrap gap-2  ">{children}</div>
