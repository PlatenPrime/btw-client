import React, { useEffect, useState } from 'react'

import {
	PageBTW,
	MainBTW,
	ContentMain,
	ControlBTW,
	HeaderBlock,

} from '../../components';




import { CompContextProvider } from './compContextProvider'
import AddCompForm from './AddCompForm';
import CompList from './CompsList';







export default function CompsPage() {





	return (


		<CompContextProvider>

			
			<PageBTW className='max-h-screen space-y-4' >

				<HeaderBlock className="bg-gradient-to-r from-violet-500 to-purple-500">

					Анализ конкурентов

				</HeaderBlock>

				


				

						<AddCompForm />
						<CompList />
						


				








			</PageBTW>

		</CompContextProvider>
	)
}
