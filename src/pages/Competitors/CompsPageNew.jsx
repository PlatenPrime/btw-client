import React, { useEffect, useState } from 'react'

import {
	PageBTW,
	MainBTW,
	ContentMain,
	ControlBTW,
	HeaderBlock,

} from '../../components';




import { CompContextProvider } from './compContextProvider'







export default function CompsPage() {





	return (


		<CompContextProvider>
			<PageBTW>

				<HeaderBlock className="bg-gradient-to-r from-violet-500 to-purple-500">

					Анализ конкурентов

				</HeaderBlock>

				<MainBTW>


					<ContentMain>




					</ContentMain>



					<ControlBTW>
						Control Panel
					</ControlBTW>



				</MainBTW>



			</PageBTW>

		</CompContextProvider>
	)
}
