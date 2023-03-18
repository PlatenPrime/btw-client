import React from 'react';










import PageBTW from '../components/UI/Page/PageBTW';
import MainBTW from '../components/UI/Page/MainBTW';
import ControlBTW from '../components/UI/Page/Control/ControlBTW';
import HeaderPageBTW from '../components/UI/Page/Header/HeaderMainBTW';
import TitleHeaderMain from '../components/UI/Page/Header/TitleHeaderMain';

import ContentMain from '../components/UI/Page/ContentMain';
import RowBlock from '../components/blocks/RowBlock';
import ButtonBlock from '../components/blocks/ButtonBlock';
import CardBlock from '../components/blocks/CardBlock';









const MainPage = () => {





	return (
		<PageBTW >

			<HeaderPageBTW>
				<TitleHeaderMain
					className='text-2xl'
				>
					Панель быстрого доступа
				</TitleHeaderMain>
			</HeaderPageBTW>



			<MainBTW>


				<ContentMain>

					<CardBlock className='bg-blue-700 p-5' >

						<ButtonBlock onClick={() => { window.alert("Works") }}
							className="bg-red-500 hover:bg-red-400"
						>
							Тестовая кнопка 1
						</ButtonBlock>

						<ButtonBlock onClick={() => { window.alert("Works") }}
							className="bg-blue-500 hover:bg-blue-400 w-1/3  p-10 text-yellow-400 "
						>
							Тестовая кнопка 2
						</ButtonBlock>


						<ButtonBlock onClick={() => { window.alert("Works") }}
							className="bg-green-500 hover:bg-green-400 text-emerald-100"

						>
							Тестовая кнопка 3
						</ButtonBlock>

						<ButtonBlock>
							Тестовая кнопка 4
						</ButtonBlock>


					</CardBlock>





				</ContentMain>






				<ControlBTW>

				</ControlBTW>


			</MainBTW>



		</PageBTW>
	);
};

export default MainPage;