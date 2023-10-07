import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkIsAuth } from '../../../redux/features/auth/authSlice';

import { ButtonBlock, InputBlock, TextBlock, CardBlock } from "../../index";

const PageBTW = ({ children, className }) => {

	const isAuth = useSelector(checkIsAuth)
	const navigate = useNavigate()


	const style = `
	
	PageBTW
	${className}

`






	return (

		<>





			{!isAuth &&


				<CardBlock className=' w-full flex justify-center items-center h-screen'  >

					<TextBlock className="text-xl" >
						Авторизуйся, чтобы видеть содержимое разделов
					</TextBlock>

				</CardBlock>

			}




			{isAuth &&

				<div className={style}>

					{children}

				</div>

			}




		</>



	);
};

export default PageBTW;