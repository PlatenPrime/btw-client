import React from 'react'
import CreateRowComponent from './CreateRowComponent'
import { HeaderBlock, PageBTW } from '../../components'

export default function StocksPage() {
	return (
		<PageBTW>

			<HeaderBlock className="bg-slate-500/50" >
				Запасы
			</HeaderBlock>


			<CreateRowComponent />
		</PageBTW>
	)
}
