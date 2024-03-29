import React from 'react'
import CardBlock from './blocks/CardBlock'

export default function ButtonGroup({ children }) {
	return (
		<CardBlock
			className="flex justify-start flex-wrap p-2 gap-2 bg-slate-800 rounded-xl text-sm"
		>
			{children}
		</CardBlock>
	)
}
