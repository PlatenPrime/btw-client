import React from 'react'
import CreateRowForm from './CreateRowForm'
import { HeaderBlock, PageBTW } from '../../components'
import { RowList } from './RowList'

export default function StocksPage() {
	return (
		<PageBTW>

			<HeaderBlock className="bg-slate-500/50" >
				Запасы
			</HeaderBlock>


			<CreateRowForm />
			<RowList />
		</PageBTW>
	)
}
