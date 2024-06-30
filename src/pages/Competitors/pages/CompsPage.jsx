import React, { useEffect, useState } from 'react'


import {
	PageBTW,
	HeaderBlock,
	CardBlock,
	TextBlock,
	ContainerBlock,
	ButtonGroup,
	ButtonBlock,

} from '../../../components';



import { CompContextProvider } from '../contexts/compContextProvider'

import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';







export default function CompsPage() {

	const navigate = useNavigate()


	useEffect(() => {
		navigate("/comps/list")
		return () => { }
	}, [])




	const activeStyles = {
		backgroundColor: "rgb(244 63 94 )",
		color: "white",
		padding: "0.5rem",
		width: "100%",
		textAlign: 'center',

	}


	const inActiveStyles = {
		padding: "0.5rem",
		width: "100%",
		textAlign: 'center',
	}


	return (


		<CompContextProvider>


			<PageBTW className='max-h-screen px-1' >

				<HeaderBlock className="bg-rose-500 shadow-lg shadow-rose-500 ">
					Аналіз конкурентів
				</HeaderBlock>


<ButtonBlock
className="fuchsia-b-n"
onClick={() => navigate("/newcomps")}

>
	New Page

</ButtonBlock>


				<CardBlock
					className="p-4">

					<Outlet />

				</CardBlock>












			</PageBTW>

		</CompContextProvider>
	)
}
