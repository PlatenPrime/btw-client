import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkIsAuth } from '../redux/features/auth/authSlice';
import axios from "../utils/axios";

import * as xlsx from "xlsx";

import CardBTW from "../components/UI/CardBTW";
import TitleBTW from '../components/UI/TitleBTW';








const MainPage = () => {




	const navigate = useNavigate()
	const isAuth = useSelector(checkIsAuth)


	/* useLayoutEffect(() => {

		if (!isAuth) navigate('/login')
	}, [isAuth, navigate])
 */



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
		<div className='max-w-[1280px] mx-auto ' >

			<div
				className=''

			>Панель быстрого доступа</div>

			<CardBTW>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatem laboriosam quis error commodi esse architecto voluptatibus similique suscipit vero, enim distinctio cum doloremque facilis pariatur! Neque harum aut ducimus.
			</CardBTW>

			<form>
				<label htmlFor="upload">Upload File</label>
				<input
					type="file"
					name="upload"
					id="upload"
					onChange={readUploadFile}
				/>
			</form>





		</div>
	);
};

export default MainPage;