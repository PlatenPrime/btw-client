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
import SpinnerBlock from '../components/blocks/SpinnerBlock';









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


				<ContentMain >

				<CardBlock className="h-40 bg-blue-500" >

					<SpinnerBlock  />

					</CardBlock>
					


				</ContentMain>



				<ControlBTW>

				</ControlBTW>


			</MainBTW>



		</PageBTW>
	);
};

export default MainPage;