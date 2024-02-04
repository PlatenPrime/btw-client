import React, { useEffect } from 'react';


import { ButtonBlock, CardBlock, HeaderBlock, TextBlock, PageBTW, ContainerBlock } from "../components/index"
import { useNavigate } from 'react-router-dom';
import useAuthStore from './Auth/authStore';
import useCheckAuth from '../hooks/useCheckAuth';








const MainPage = () => {


	useCheckAuth()





	return (


		<PageBTW className=" space-y-4 " >

			<HeaderBlock className='shadow-md shadow-sky-500' >

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

			<ContainerBlock
				className="flex gap-4 flex-wrap max-w-md mx-auto"
			>
				<ButtonBlock className="slate-b">Slate</ButtonBlock>
				<ButtonBlock className="gray-b">Gray</ButtonBlock>
				<ButtonBlock className="zinc-b">Zinc</ButtonBlock>
				<ButtonBlock className="neutral-b">Neutral</ButtonBlock>
				<ButtonBlock className="stone-b">Stone</ButtonBlock>
				<ButtonBlock className="red-b">Red</ButtonBlock>
				<ButtonBlock className="orange-b">Orange</ButtonBlock>
				<ButtonBlock className="amber-b">Amber</ButtonBlock>
				<ButtonBlock className="yellow-b">Yellow</ButtonBlock>
				<ButtonBlock className="lime-b">Lime</ButtonBlock>
				<ButtonBlock className="green-b">Green</ButtonBlock>
				<ButtonBlock className="emerald-b">Emerald</ButtonBlock>
				<ButtonBlock className="teal-b">Teal</ButtonBlock>
				<ButtonBlock className="cyan-b">Cyan</ButtonBlock>
				<ButtonBlock className="sky-b">Sky</ButtonBlock>
				<ButtonBlock className="blue-b">Blue</ButtonBlock>
				<ButtonBlock className="indigo-b">Indigo</ButtonBlock>
				<ButtonBlock className="violet-b">Violet</ButtonBlock>
				<ButtonBlock className="purple-b">Purple</ButtonBlock>
				<ButtonBlock className="fuchsia-b">Fuchsia</ButtonBlock>
				<ButtonBlock className="pink-b ">Pink</ButtonBlock>
				<ButtonBlock className="rose-b ">Rose</ButtonBlock>


			</ContainerBlock>





		</PageBTW>
	);
};

export default MainPage;