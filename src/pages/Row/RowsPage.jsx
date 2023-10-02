import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';




import PageBTW from '../../components/UI/Page/PageBTW';

import HeaderBlock from '../../components/blocks/HeaderBlock';
import { ButtonBlock } from "../../components"








const RowsPage = () => {




	return (



		<PageBTW  >


			<HeaderBlock className="bg-orange-500/50" >

				Ряды

			</HeaderBlock>


		


		</PageBTW >



	);
};

export default RowsPage;
