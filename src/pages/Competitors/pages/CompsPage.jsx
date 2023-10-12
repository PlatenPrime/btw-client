import React, { useEffect, useState } from 'react'


import {
	PageBTW,
	HeaderBlock,
	CardBlock,
	TextBlock,

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
		backgroundColor: "rgb(139 92 246 / 0.5)",
		color: "white",
		padding: "0.5rem",
		width: "100%",
		textAlign: 'center',
		borderBottomLeftRadius: "0.5rem",
		borderBottomRightRadius: "0.5rem",
	}


	const inActiveStyles = {
		padding: "0.5rem",
		width: "100%",
		textAlign: 'center',
	}


	return (


		<CompContextProvider>


			<PageBTW className='max-h-screen ' >

				<HeaderBlock className="bg-violet-500/20 ">


					<NavLink
						to={""}


					>
						Аналіз конкурентів
					</NavLink>

				</HeaderBlock>


				<CardBlock
					className="flex justify-evenly border border-violet-500  "

				>


					<TextBlock
						className="w-1/4 rounded hover:bg-violet-500/20 rounded-b-lg"

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



				</CardBlock>


				<CardBlock
					className="p-4">

					<Outlet />

				</CardBlock>








			</PageBTW>

		</CompContextProvider>
	)
}
