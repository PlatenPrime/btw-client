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
		backgroundColor: "rgb(139 92 246)",
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


			<PageBTW className='max-h-screen' >

				<HeaderBlock className="bg-violet-500 ">

					Анализ конкурентов

				</HeaderBlock>


				<CardBlock
					className="flex justify-evenly  "

				>


					<TextBlock
						className="w-1/3 rounded hover:bg-violet-500/50 rounded-b-lg"

					>
						<NavLink
							to={"list"}
							style={({ isActive }) => isActive ? activeStyles : inActiveStyles}

						>
							Список всех артикулов
						</NavLink>
					</TextBlock>




					<TextBlock
						className="w-1/3 hover:bg-violet-500/50 rounded-b-lg"
					>
						<NavLink
							to={"logs"}
							style={({ isActive }) => isActive ? activeStyles : inActiveStyles}

						>
							История изменений
						</NavLink>
					</TextBlock>




					<TextBlock
						className="w-1/3 hover:bg-violet-500/50 rounded-b-lg"
					>
						<NavLink
							to={"one"}
							style={({ isActive }) => isActive ? activeStyles : inActiveStyles}

						>
							Редактирование
						</NavLink>
					</TextBlock>


				</CardBlock>




				<Outlet />












			</PageBTW>

		</CompContextProvider>
	)
}
