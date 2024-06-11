import React, { useEffect, useState } from 'react'


import {
	PageBTW,
	HeaderBlock,
	CardBlock,
	TextBlock,
	ContainerBlock,

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


					<NavLink
						to={""}


					>
						Аналіз конкурентів
					</NavLink>

				</HeaderBlock>


				<ContainerBlock
					className="flex justify-evenly  "

				>


					<TextBlock
						className="w-1/4  hover:bg-rose-500 rounded-xl"

					>
						<NavLink
							to={"list"}
							style={({ isActive }) => isActive ? activeStyles : inActiveStyles}

						>
							Артикули
						</NavLink>
					</TextBlock>




					<TextBlock
						className="w-1/4 hover:bg-violet-500/20 rounded-b-lg"
					>
						<NavLink
							to={"logs"}
							style={({ isActive }) => isActive ? activeStyles : inActiveStyles}

						>
							Журнал змін
						</NavLink>
					</TextBlock>




					<TextBlock
						className="w-1/4 hover:bg-violet-500/20 rounded-b-lg"
					>
						<NavLink
							to={"edit"}
							style={({ isActive }) => isActive ? activeStyles : inActiveStyles}

						>
							Перевірка
						</NavLink>
					</TextBlock>


					<TextBlock
						className="w-1/4 hover:bg-violet-500/20 rounded-b-lg"
					>
						<NavLink
							to={"add"}
							style={({ isActive }) => isActive ? activeStyles : inActiveStyles}

						>
							Додавання
						</NavLink>
					</TextBlock>



				</ContainerBlock>


				<CardBlock
					className="p-4">

					<Outlet />

				</CardBlock>








			</PageBTW>

		</CompContextProvider>
	)
}
