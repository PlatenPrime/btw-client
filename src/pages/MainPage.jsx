import React, { useEffect } from 'react';

import "./main.css"


import { ButtonBlock, CardBlock, HeaderBlock, TextBlock, PageBTW, ContainerBlock } from "../components/index"
import useCheckAuth from '../hooks/useCheckAuth';








const MainPage = () => {


	useCheckAuth()





	return (


		<PageBTW className="  " >

			<HeaderBlock className='  animate-gradient' >

				Головна

			</HeaderBlock>





			<ContainerBlock
				className="flex flex-col"
			>



				<TextBlock className="text-6xl" >

					BTW App
				</TextBlock>
				<TextBlock className="text-lg" >

					Balloon Trade Warehouse App
				</TextBlock>

			</ContainerBlock>



			<ContainerBlock>
				<img
					src="https://i.imgur.com/TUf7x12.jpg"
					alt="BTW"
					className="bg-cover w-full rounded-xl"
				/>
			</ContainerBlock>

			<ContainerBlock
				className="flex gap-4 flex-wrap"
			>
				<ButtonBlock className="slate-b">Slate</ButtonBlock>
				<ButtonBlock className="slate-b-n">Slate</ButtonBlock>
				<ButtonBlock className="gray-b">Gray</ButtonBlock>
				<ButtonBlock className="gray-b-n">Gray</ButtonBlock>
				<ButtonBlock className="zinc-b">Zinc</ButtonBlock>
				<ButtonBlock className="zinc-b-n">Zinc</ButtonBlock>
				<ButtonBlock className="neutral-b">Neutral</ButtonBlock>
				<ButtonBlock className="neutral-b-n">Neutral</ButtonBlock>
				<ButtonBlock className="stone-b">Stone</ButtonBlock>
				<ButtonBlock className="stone-b-n">Stone</ButtonBlock>
				<ButtonBlock className="red-b">Red</ButtonBlock>
				<ButtonBlock className="red-b-n">Red</ButtonBlock>
				<ButtonBlock className="orange-b">Orange</ButtonBlock>
				<ButtonBlock className="orange-b-n">Orange</ButtonBlock>
				<ButtonBlock className="amber-b">Amber</ButtonBlock>
				<ButtonBlock className="amber-b-n">Amber</ButtonBlock>
				<ButtonBlock className="yellow-b">Yellow</ButtonBlock>
				<ButtonBlock className="yellow-b-n">Yellow</ButtonBlock>
				<ButtonBlock className="lime-b">Lime</ButtonBlock>
				<ButtonBlock className="lime-b-n">Lime</ButtonBlock>
				<ButtonBlock className="green-b">Green</ButtonBlock>
				<ButtonBlock className="green-b-n">Green</ButtonBlock>
				<ButtonBlock className="emerald-b">Emerald</ButtonBlock>
				<ButtonBlock className="emerald-b-n">Emerald</ButtonBlock>
				<ButtonBlock className="teal-b">Teal</ButtonBlock>
				<ButtonBlock className="teal-b-n">Teal</ButtonBlock>
				<ButtonBlock className="cyan-b">Cyan</ButtonBlock>
				<ButtonBlock className="cyan-b-n">Cyan</ButtonBlock>
				<ButtonBlock className="sky-b">Sky</ButtonBlock>
				<ButtonBlock className="sky-b-n">Sky</ButtonBlock>
				<ButtonBlock className="blue-b">Blue</ButtonBlock>
				<ButtonBlock className="blue-b-n">Blue</ButtonBlock>
				<ButtonBlock className="indigo-b">Indigo</ButtonBlock>
				<ButtonBlock className="indigo-b-n">Indigo</ButtonBlock>
				<ButtonBlock className="violet-b">Violet</ButtonBlock>
				<ButtonBlock className="violet-b-n">Violet</ButtonBlock>
				<ButtonBlock className="purple-b">Purple</ButtonBlock>
				<ButtonBlock className="purple-b-n">Purple</ButtonBlock>
				<ButtonBlock className="fuchsia-b">Fuchsia</ButtonBlock>
				<ButtonBlock className="fuchsia-b-n">Fuchsia</ButtonBlock>
				<ButtonBlock className="pink-b ">Pink</ButtonBlock>
				<ButtonBlock className="pink-b-n ">Pink</ButtonBlock>
				<ButtonBlock className="rose-b ">Rose</ButtonBlock>
				<ButtonBlock className="rose-b-n ">Rose</ButtonBlock>


			</ContainerBlock>

		</PageBTW>
	);
};

export default MainPage;