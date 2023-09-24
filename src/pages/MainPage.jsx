import React, { useState } from 'react';


import PageBTW from '../components/UI/Page/PageBTW';

import { InputBlock, ButtonBlock, CardBlock, RowBlock, HeaderBlock, TextBlock } from "../components/index"


import Spinner from '../components/Spinner/Spinner';
import { getArtDataYumi } from '../utils/getArtDataYumi';







const MainPage = () => {


	const [artikul, setArtikul] = useState("")
	const [price, setPrice] = useState("")
	const [quant, setQuant] = useState(null)




	const testFetch = async () => {
		const urlCA = 'https://corsproxy.io/?';
		const testUrl = "https://yumi-market.com.ua/ua/p819105543-kulya-gemar-dzh.html"
		const testCorsUrl = `${urlCA}${testUrl}`

		try {
			const response = await fetch(testCorsUrl);
			const responseString = await response.text();
			console.log(responseString)

		} catch (error) {
			console.log(error)
		}

	}


	const handleFetch = async (artikul) => {
		console.log(artikul)

		const { price, quant } = await getArtDataYumi(artikul)
		console.log(price)
		console.log(quant)
		setPrice(price)
		setQuant(quant)



	}




	return (


		<PageBTW  >

			<HeaderBlock className='bg-blue-500/50' >

				Главная страница

			</HeaderBlock>





			<CardBlock className=" " >



				<TextBlock className="text-6xl" >

					BTW App
				</TextBlock>
				<TextBlock className="text-lg" >

					Balloon Trade Warehouse App
				</TextBlock>




			</CardBlock>


			<CardBlock>
				<InputBlock
					onChange={(e) => { setArtikul(e.target.value) }}
					value={artikul}
					placeholder="Введи артикул yumi"
				/>
				<ButtonBlock
					className="search-c"
					onClick={() => { handleFetch(artikul) }}
				// onClick={testFetch}
				>
					Поиск
				</ButtonBlock>
				<TextBlock>{price}</TextBlock>
				<TextBlock>{quant}</TextBlock>
			</CardBlock>








			{/* <TextBlock className="text-4xl" >Icons</TextBlock>

			<CardBlock className="grid md:grid-cols-3" >
				<ButtonBlock className='edit'   >Edit</ButtonBlock>
				<ButtonBlock className='create' >Create</ButtonBlock>
				<ButtonBlock className='cancel' >Cancel</ButtonBlock>
				<ButtonBlock className='success' >Success</ButtonBlock>
				<ButtonBlock className='delete' >Delete</ButtonBlock>
				<ButtonBlock className='confirm' >Confirm</ButtonBlock>
				<ButtonBlock className='add' >Add</ButtonBlock>
				<ButtonBlock className='search' >Search</ButtonBlock>
			</CardBlock>



			<TextBlock className="text-4xl" >Buttons</TextBlock>

			<ButtonBlock className='edit-c ' >Edit-c</ButtonBlock>
			<ButtonBlock className='create-c ' >Create-c</ButtonBlock>
			<ButtonBlock className='cancel-c ' >Cancel-c</ButtonBlock>
			<ButtonBlock className='success-c ' >Success-c</ButtonBlock>
			<ButtonBlock className='delete-c ' >Delete-c</ButtonBlock>
			<ButtonBlock className='confirm-c ' >Confirm-c</ButtonBlock>
			<ButtonBlock className='add-c ' >Add-c</ButtonBlock>
			<ButtonBlock className='search-c ' >Search-c</ButtonBlock>


 */}





		</PageBTW>
	);
};

export default MainPage;