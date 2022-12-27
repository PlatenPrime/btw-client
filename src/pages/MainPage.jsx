import React, { useEffect, useLayoutEffect, useState } from 'react';


import axios from "../utils/axios";

import * as xlsx from "xlsx";







import PageBTW from '../components/UI/Page/PageBTW';
import MainBTW from '../components/UI/MainBTW';
import ControlBTW from '../components/UI/Control/ControlBTW';
import HeaderPageBTW from '../components/UI/Header/HeaderMainBTW';
import TitleHeaderMain from '../components/UI/Header/TitleHeaderMain';
import ControlMobileBTW from '../components/UI/Control/ControlMobileBTW';









const MainPage = () => {




	const readUploadFile = (e) => {
		e.preventDefault();
		if (e.target.files) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const data = e.target.result;
				const workbook = xlsx.read(data, { type: "array" });
				const sheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[sheetName];
				const json = xlsx.utils.sheet_to_json(worksheet);
				console.log(json);
			};
			reader.readAsArrayBuffer(e.target.files[0]);
		}
	}










	return (
		<PageBTW >

			<MainBTW>
				<HeaderPageBTW>
					<TitleHeaderMain
						className='text-2xl'
					>
						Панель быстрого доступа
					</TitleHeaderMain>
				</HeaderPageBTW>


				<button type="button" class="buttonBTW buttonPrimary w-1/2">Основная</button>
				<button type="button" class="buttonBTW buttonSuccess w-1/2">Подтвердить</button>



			</MainBTW>

			<ControlMobileBTW>

			</ControlMobileBTW>

			<ControlBTW>

			</ControlBTW>

		</PageBTW>
	);
};

export default MainPage;