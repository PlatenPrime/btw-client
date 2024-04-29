import React from 'react'
import CardBlock from './blocks/CardBlock'

export default function ButtonGroup({ children }) {
	return (
		<CardBlock
			className="flex justify-between flex-wrap p-2 gap-2 bg-slate-800/50 rounded-xl text-sm"
		>
			{children}
		</CardBlock>
	)
}
