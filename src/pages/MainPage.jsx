import React, { useState } from 'react';


import PageBTW from '../components/UI/Page/PageBTW';

import { InputBlock, ButtonBlock, CardBlock, RowBlock, HeaderBlock, TextBlock } from "../components/index"


import Spinner from '../components/Spinner/Spinner';
import { getArtDataYumi } from '../utils/getArtDataYumi';
import { getArtDataBtrade } from '../utils/getArtDataBtrade';
import { getArtDataSharte } from '../utils/getArtDataSharte';
import { getArtDataAir } from '../utils/getArtDataAir';







const MainPage = () => {


	const [artikul, setArtikul] = useState("")
	const [price, setPrice] = useState("")
	const [quant, setQuant] = useState(null)

	const [artikulBtrade, setArtikulBtrade] = useState("")
	const [priceBtrade, setPriceBtrade] = useState("")
	const [quantBtrade, setQuantBtrade] = useState(null)

	const [artikulSharte, setArtikulSharte] = useState("")
	const [priceSharte, setPriceSharte] = useState("")
	const [isAvailableSharte, setIsAvailableSharte] = useState(null)


	const [artikulAir, setArtikulAir] = useState("")
	const [priceAir, setPriceAir] = useState("")
	const [isAvailableAir, setIsAvailableAir] = useState(null)




	const handleFetch = async (artikul) => {
		console.log(artikul)

		const { price, quant } = await getArtDataYumi(artikul)
		console.log(price)
		console.log(quant)
		setPrice(price)
		setQuant(quant)

	}


	const handleFetchBtrade = async (artikulBtrade) => {
		console.log(artikulBtrade)

		const { price, quant } = await getArtDataBtrade(artikulBtrade)
		console.log(price)
		console.log(quant)
		setPriceBtrade(price)
		setQuantBtrade(quant)

	}

	const handleFetchSharte = async (artikulSharte) => {
		console.log(artikulSharte)

		const { price, isAvailable } = await getArtDataSharte(artikulSharte)
		console.log(price)
		console.log(isAvailable)
		setPriceSharte(price)
		setIsAvailableSharte(isAvailable)

	}


	const handleFetchAir = async (artikulAir) => {
		console.log(artikulAir)

		const { price, isAvailable } = await getArtDataAir(artikulAir)
		console.log(price)
		console.log(isAvailable)
		setPriceAir(price)
		setIsAvailableAir(isAvailable)

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


			<CardBlock>
				<InputBlock
					onChange={(e) => { setArtikulBtrade(e.target.value) }}
					value={artikulBtrade}
					placeholder="Введи артикул btrade"
				/>
				<ButtonBlock
					className="search-c"
					onClick={() => { handleFetchBtrade(artikulBtrade) }}
				// onClick={testFetch}
				>
					Поиск
				</ButtonBlock>
				<TextBlock>{priceBtrade}</TextBlock>
				<TextBlock>{quantBtrade}</TextBlock>
			</CardBlock>


			<CardBlock>
				<InputBlock
					onChange={(e) => { setArtikulSharte(e.target.value) }}
					value={artikulSharte}
					placeholder="Введи артикул sharte"
				/>
				<ButtonBlock
					className="search-c"
					onClick={() => { handleFetchSharte(artikulSharte) }}
				// onClick={testFetch}
				>
					Поиск
				</ButtonBlock>
				<TextBlock>{priceSharte}</TextBlock>
				<TextBlock>{isAvailableSharte ? "Yes" : ""}</TextBlock>
			</CardBlock>


			<CardBlock>
				<InputBlock
					onChange={(e) => { setArtikulAir(e.target.value) }}
					value={artikulAir}
					placeholder="Введи артикул air"
				/>
				<ButtonBlock
					className="search-c"
					onClick={() => { handleFetchAir(artikulAir) }}

				>
					Поиск
				</ButtonBlock>
				<TextBlock>{priceAir}</TextBlock>
				<TextBlock>{isAvailableAir ? "Yes" : ""}</TextBlock>
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