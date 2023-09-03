import React, { useEffect, useState } from 'react'


import {
	PageBTW,
	MainBTW,
	ContentMain,
	ControlBTW,
	HeaderBlock,
	CardBlock,
	TextBlock,

} from '../../../components';




import { CompContextProvider } from '../contexts/compContextProvider'
import AddCompForm from '../components/AddCompForm';
import CompList from '../components/CompsList';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';







export default function CompsPage() {

	const navigate = useNavigate()


	useEffect(() => {
		navigate("/comps/list")
		return () => { }
	}, [])




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


					<NavLink
						to={""}
						style={({ isActive }) => isActive ? activeStyles : inActiveStyles}

					>
						Анализ конкурентов
					</NavLink>

				</HeaderBlock>


				<CardBlock
					className="flex justify-evenly border border-violet-500  "

				>


					<TextBlock
						className="w-1/4 rounded hover:bg-violet-500/50 rounded-b-lg"

					>
						<NavLink
							to={"list"}
							style={({ isActive }) => isActive ? activeStyles : inActiveStyles}

						>
							Список всех артикулов
						</NavLink>
					</TextBlock>




					<TextBlock
						className="w-1/4 hover:bg-violet-500/50 rounded-b-lg"
					>
						<NavLink
							to={"logs"}
							style={({ isActive }) => isActive ? activeStyles : inActiveStyles}

						>
							История изменений
						</NavLink>
					</TextBlock>




					<TextBlock
						className="w-1/4 hover:bg-violet-500/50 rounded-b-lg"
					>
						<NavLink
							to={"edit"}
							style={({ isActive }) => isActive ? activeStyles : inActiveStyles}

						>
							Редактирование
						</NavLink>
					</TextBlock>


					<TextBlock
						className="w-1/4 hover:bg-violet-500/50 rounded-b-lg"
					>
						<NavLink
							to={"add"}
							style={({ isActive }) => isActive ? activeStyles : inActiveStyles}

						>
							Добавление
						</NavLink>
					</TextBlock>



				</CardBlock>




				<Outlet />












			</PageBTW>

		</CompContextProvider>
	)
}
