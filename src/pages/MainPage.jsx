import React from 'react';

import "./main.css";


import { CardBlock, ContainerBlock, HeaderBlock, PageBTW, TextBlock } from "../components/index";
import useCheckAuth from '../hooks/useCheckAuth';








const MainPage = () => {


	useCheckAuth()





	return (


		<PageBTW className="  " >

			<HeaderBlock className='' >

				Головна

			</HeaderBlock>





			<ContainerBlock
				className="flex flex-col md:flex-row gap-2  "
			>

				<CardBlock className="flex flex-col w-full md:w-fit items-center justify-center  rounded-xl p-2 " >
					<img
						src="https://i.imgur.com/TUf7x12.jpg"
						alt="BTW"
						className="bg-cover w-40 rounded-lg"
					/>
				</CardBlock> 

				<CardBlock className="flex flex-col w-full items-center justify-center  rounded-xl p-2 " >

					<TextBlock className="text-6xl font-bold" >
						BTW App
					</TextBlock>
					<TextBlock className="text-lg" >

						Balloon Trade Warehouse App
					</TextBlock>
				</CardBlock>

			</ContainerBlock>





		</PageBTW>
	);
};

export default MainPage;