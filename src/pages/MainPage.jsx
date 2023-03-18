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
import InputBlock from '../components/blocks/InputBlock';









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

					<CardBlock className='' >

						<ButtonBlock onClick={() => { window.alert("Works") }}
							className="bg-red-500 hover:bg-red-600 active:bg-red-700"
						>
							Тестовая кнопка 1
						</ButtonBlock>

						<ButtonBlock onClick={() => { window.alert("Works") }}
							className="bg-blue-500 hover:bg-blue-600 w-1/3  p-10 text-yellow-400 inline"
						>
							Тестовая кнопка 2
						</ButtonBlock>


						<ButtonBlock>
							Тестовая кнопка 4
						</ButtonBlock>


					</CardBlock>

<CardBlock>
	<InputBlock placeholder="Тестовый инпут 1" />
	<InputBlock placeholder="Тестовый инпут 2 " />
	<InputBlock placeholder="Тестовый инпут 3 "  className="block bg-red-200 m-8" />
</CardBlock>






				</ContentMain>






				<ControlBTW>

				</ControlBTW>


			</MainBTW>



		</PageBTW>
	);
};

export default MainPage;