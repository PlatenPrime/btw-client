import React, { useState } from 'react';
import { useCompContext } from './compContextProvider';
import {
	ButtonBlock,
	InputBlock,
	RowBlock,
	TextBlock,
	CardBlock,
	ImageBlock
} from '../../components';
import { getArtDataSharte } from '../../utils/getArtDataSharte';
import { getArtDataBtrade } from '../../utils/getArtDataBtrade';


import axios from "../../utils/axios"














export default function AddCompForm() {
	const { artsDB } = useCompContext();

	// State for form fields

	const [compArt, setCompArt] = useState('');
	const [selectedProd, setSelectedProd] = useState('');
	const [sharteLink, setSharteLink] = useState('');

	const [priceSharte, setPriceSharte] = useState('');
	const [isAvailableSharte, setIsAvailableSharte] = useState('');

	const [priceBtrade, setPriceBtrade] = useState('');
	const [quantBtrade, setQuantBtrade] = useState('');

	const [isAnalyze, setIsAnalyze] = useState(false)

	const [isCreatingComp, setIsCreatingComp] = useState(false);

	// Other form-related state and functions

	// НУЖНЫЕ КОНСТАНТЫ


	const prods = [
		'Gemar',
		'Belbal',
		'Flex',
		"Anagram",
		"Qualatex"

	];


	const photoSrc = `https://sharik.ua/images/elements_big/${compArt.trim()}_m1.jpg`;

	let artikulDB;

	if (artsDB) artikulDB = artsDB.find(item => item.artikul === compArt.trim());

	const isFormNotValid = !compArt || !selectedProd || !sharteLink || !priceSharte || !isAvailableSharte;
	const linkSharteRegex = /^https:\/\/sharte\.net\//;
	const isSharteLinkValid = linkSharteRegex.test(sharteLink);


	const handleAnalizeOne = async (e) => {
		e.preventDefault();

		try {


			setIsAnalyze(false)

			// Анализ Sharte

			setPriceSharte("")
			const {
				price: priceSharte,
				isAvailable: isAvailableSharte
			} = await getArtDataSharte(sharteLink)
			setPriceSharte(priceSharte)
			setIsAvailableSharte(isAvailableSharte)


			setPriceBtrade("")
			const {
				price: priceBtrade,
				quant: quantBtrade
			} = await getArtDataBtrade(compArt)
			console.log(priceBtrade)
			setPriceBtrade(priceBtrade)
			setQuantBtrade(quantBtrade)







		} catch (error) {
			console.error('Error analyzing artikul:', error);
		} finally {
			setIsAnalyze(true)
		}
	};




	const handleSubmitAddComp = async (e) => {
		e.preventDefault();
		const newComp = {
			artikul: compArt,
			prod: selectedProd,
			competitorsLinks: {
				sharteLink
			},
			isAvailableSharte,
			priceSharte

		}

		try {
			setIsCreatingComp(true)
			const createCompRes = await axios.post("comps", newComp);
			console.log(createCompRes.json());
		} catch (error) {
			setIsCreatingComp(false)
		} finally {
			setIsCreatingComp(false)
			setCompArt("");
			setSharteLink("");
			setSelectedProd("");
			setPriceSharte(null)
			setIsAvailableSharte("")

		}
	};








	return (





		<form>

			<CardBlock

				className='  flex flex-col m-1 p-1 space-y-2 
				xl:space-y-0 xl:space-x-2 xl:flex-row 
				
				
				'>


				<CardBlock
					className='space-y-2  w-full flex flex-col  justify-start  xl:w-1/3  p-1
					bg-sky-400/25
					
					'
				>


					<RowBlock className="space-x-2" >
						<TextBlock className=' ' >
							Артикул Бтрейд:
						</TextBlock>
						<InputBlock type="text"
							className='InputBlock  w-full text-center'
							placeholder="Введи артикул БТрейд..."
							onChange={(e) => setCompArt(e.target.value)}
							value={compArt}

						/>

					</RowBlock>

					<RowBlock className="space-x-2" >
						<TextBlock>
							Производитель:
						</TextBlock>
						<select
							className='InputBlock focus:bg-sky-900 w-full'
							value={selectedProd}
							onChange={(e) => setSelectedProd(e.target.value)}
						>
							<option value="">Выбери производителя</option>
							{prods.map((prod, index) => (
								<option key={index} value={prod}>
									{prod}
								</option>
							))}
						</select>
					</RowBlock>




					<RowBlock className="space-x-2" >
						<TextBlock>
							Ссылка Sharte:
						</TextBlock>

						<InputBlock type="text"
							className='InputBlock w-full  '
							placeholder="Введи ссылку sharte"
							onChange={(e) => setSharteLink(e.target.value)}
							value={sharteLink}

						/>


					</RowBlock>

				</CardBlock>



				<CardBlock className="
				p-4 w-full flex flex-col space-y-2  xl:w-1/3
				bg-white
				" >

					<TextBlock className='text-lg text-center' >
						{artikulDB ?
							<span
								className='bg-violet-600 p-2 rounded-lg '
							>{artikulDB.nameukr}</span>
							:
							<span
								className='bg-slate-600 p-2 rounded-lg'
							>Название</span>}
					</TextBlock>


					<ImageBlock
						src={artikulDB ? photoSrc : "https://sharik.ua/images/elements_big/1102-3092_m1.jpg"}
						alt="Если ты видишь эту надпись, значит ты ошибся с артикулом"
						width={200}
						height={200}
						className="mx-auto rounded-2xl shadow-md shadow-white"

					/>
				</CardBlock>


				<CardBlock
					className=' flex flex-col justify-center xl:justify-start xl:w-1/3 
					bg-violet-800/25
					
					'
				>

					<ButtonBlock
						className={`${isSharteLinkValid ? "add-c" : "disabled"} `}
						onClick={(e) => handleAnalizeOne(e)}
						disabled={!isSharteLinkValid || !artikulDB}
					>

						Анализ
					</ButtonBlock>



					{isAnalyze && <RowBlock className=" flex flex-col items-start space-y-1 " >
						<TextBlock
							className='border p-1 rounded w-full flex justify-start'
						>
							Цена Sharte: {
								priceSharte ?
									<p>{priceSharte}</p>
									:
									<p></p>}
						</TextBlock>

						<TextBlock
							className='border p-1 rounded w-full flex justify-start'
						>
							Цена Btrade: {
								priceBtrade ?
									<p>{priceBtrade} грн</p>
									:
									<p></p>}
						</TextBlock>

						<TextBlock
							className='border p-1 rounded w-full flex justify-start'
						>
							Наличие у Sharte: {typeof isAvailableSharte === "string" ? "" : isAvailableSharte ? "Есть" : "Нет"}
						</TextBlock>




						<TextBlock
							className='border p-1 rounded w-full flex justify-start'
						>
							Остаток на Погребах: {quantBtrade ? <span>{quantBtrade} шт</span> : ""}
						</TextBlock>


					</RowBlock>}



				</CardBlock>







			</CardBlock>






			<CardBlock
				className=' flex flex-col justify-center'
			>

				<ButtonBlock
					className="create-c "
					disabled={isFormNotValid}
					onClick={handleSubmitAddComp}
				>
					Добавить
				</ButtonBlock>


				{isCreatingComp && <TextBlock>
					Создание артикула конкурента в базе данных...
				</TextBlock>
				}


			</CardBlock>




		</form>


	);
}
