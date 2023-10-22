import React from 'react';


import { ButtonBlock, CardBlock, HeaderBlock, TextBlock, PageBTW } from "../components/index"








const MainPage = () => {








	return (


		<PageBTW className="p-2 space-y-4 " >

			<HeaderBlock className='bg-blue-500/50' >

				Главная страница

			</HeaderBlock>





			<CardBlock
				className="flex flex-col"
			>



				<TextBlock className="text-6xl" >

					BTW App
				</TextBlock>
				<TextBlock className="text-lg" >

					Balloon Trade Warehouse App
				</TextBlock>

			</CardBlock>

			<CardBlock
				className="flex gap-2 flex-wrap max-w-md mx-auto"
			>
				<ButtonBlock className="slate-b">Slate</ButtonBlock>
				<ButtonBlock className="gray-b">Gray</ButtonBlock>
				<ButtonBlock className="zinc-b">Zinc</ButtonBlock>
				<ButtonBlock className="neutral-b">Neutral</ButtonBlock>
				<ButtonBlock className="stone-b">Stone</ButtonBlock>
				<ButtonBlock className="red-b">Red</ButtonBlock>
				<ButtonBlock className="orange-b">Orange</ButtonBlock>
				<ButtonBlock className="amber-b">Amber</ButtonBlock>
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
				<ButtonBlock className="pink-b">Pink</ButtonBlock>
				<ButtonBlock className="rose-b">Rose</ButtonBlock>

			</CardBlock>



		</PageBTW>
	);
};

export default MainPage;