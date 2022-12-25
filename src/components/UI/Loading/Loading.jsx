import React from 'react';
import style from './Loading.module.css';

const Loading = () => {
	return (
		<div className=" w-full h-full flex justify-center items-center bg-sky-700 bg-opacity-50
	
		">


			<div className={style.spinner}>
				Загрузка...
				<div className={style.spinnerSectorRed}></div>
				<div className={style.spinnerSectorBlue}></div>
				<div className={style.spinnerSectorGreen}></div>
				<div className={style.spinnerSectorYellow}></div>

			</div>




		</div>
	);
};

export default Loading;