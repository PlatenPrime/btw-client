import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';




import PageBTW from '../../components/UI/Page/PageBTW';

import HeaderBlock from '../../components/blocks/HeaderBlock';
import { ButtonBlock } from "../../components"
import { useRowStore } from './rowStore';






const RowsPage = () => {


	const row = useRowStore((state) => state.row)
	const changeRow = useRowStore((state) => state.changeRow)
	const clearRow = useRowStore((state) => state.clearRow)
	const getRows = useRowStore((state) => state.getRows)


	getRows()




	return (



		<PageBTW  >


			<HeaderBlock className="bg-orange-500/50" >

				Ряды

			</HeaderBlock>



			{row}
			<ButtonBlock
				onClick={changeRow}
			>
				Плюс
			</ButtonBlock>
			<ButtonBlock
				onClick={clearRow}
			>
				Ноль
			</ButtonBlock>


		</PageBTW >



	);
};

export default RowsPage;
