import React from 'react';










import PageBTW from '../components/UI/Page/PageBTW';
import MainBTW from '../components/UI/Page/MainBTW';
import ControlBTW from '../components/UI/Page/Control/ControlBTW';
import HeaderPageBTW from '../components/UI/Page/Header/HeaderMainBTW';
import TitleHeaderMain from '../components/UI/Page/Header/TitleHeaderMain';

import ContentMain from '../components/UI/Page/ContentMain';
import RowBlock from '../components/blocks/RowBlock';









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

				<RowBlock>
					Test Row Block
				</RowBlock>
				<RowBlock>
					Test Row Block
				</RowBlock>
				<RowBlock>
					Test Row Block
				</RowBlock>


				</ContentMain>






				<ControlBTW>

				</ControlBTW>


			</MainBTW>



		</PageBTW>
	);
};

export default MainPage;