import React, { useEffect, useState } from 'react'


import {
	PageBTW,
	MainBTW,
	ContentMain,
	ControlBTW,
	HeaderBlock,
	CardBlock,
	TextBlock,

} from '../../components';




import { CompContextProvider } from './compContextProvider'
import AddCompForm from './AddCompForm';
import CompList from './CompsList';
import { Link, NavLink, Outlet } from 'react-router-dom';







export default function CompsPage() {


	const activeStyles = {
		backgroundColor: "black",
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


			<PageBTW className='max-h-screen space-y-4' >

				<HeaderBlock className="bg-gradient-to-r from-violet-500 to-purple-500">

					Анализ конкурентов

				</HeaderBlock>


				<CardBlock
					className="flex justify-evenly "

				>


					<TextBlock
						className="w-1/3"

					>
						<NavLink
							to={"list"}
							style={({ isActive }) => isActive ? activeStyles : inActiveStyles}

						>
							Список всех артикулов
						</NavLink>
					</TextBlock>

					<TextBlock
						className="w-1/3"
					>
						<NavLink
							to={"logs"}
							style={({ isActive }) => isActive ? activeStyles : inActiveStyles}

						>
							Логи
						</NavLink>
					</TextBlock>




					<TextBlock
						className="w-1/3"
					>
						<NavLink
							to={"one"}
							style={({ isActive }) => isActive ? activeStyles : inActiveStyles}

						>
							Один
						</NavLink>
					</TextBlock>


				</CardBlock>




				<Outlet />












			</PageBTW>

		</CompContextProvider>
	)
}
