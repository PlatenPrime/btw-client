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
		<CardBlock className='  flex flex-col justify-between lg:flex-row ' >
			<form
				className='  flex flex-col items-start justify-start space-y-2'
			// onSubmit={handleSubmitAddComp}
			>

				<RowBlock className="space-x-2" >
					<TextBlock className=' ' >
						Артикул Бтрейд:
					</TextBlock>
					<InputBlock type="text"
						className='InputBlock  '
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
						className='InputBlock focus:bg-sky-900'
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
						className='InputBlock'
						placeholder="Введи ссылку sharte"
						onChange={(e) => setSharteLink(e.target.value)}
						value={sharteLink}

					/>





				</RowBlock>

				<CardBlock>

					{isSharteLinkValid && <ButtonBlock
						className='add w-full'
						onClick={(e) => handleAnalizeOne(e)}

					>

						Анализ
					</ButtonBlock>}



					{isAnalyze && <RowBlock className=" flex flex-col items-start " >
						<TextBlock>
							Цена Sharte: {
								priceSharte ?
									<p>{priceSharte}</p>
									:
									<p></p>}
						</TextBlock>

						<TextBlock>
							Наличие у Sharte: {typeof isAvailableSharte === "string" ? "" : isAvailableSharte ? "Есть" : "Нет"}
						</TextBlock>

						<TextBlock>
							Цена Btrade: {
								priceBtrade ?
									<p>{priceBtrade} грн</p>
									:
									<p></p>}
						</TextBlock>


						<TextBlock>
							Остаток на Погребах: {quantBtrade ? <span>{quantBtrade} шт</span> : ""}
						</TextBlock>


					</RowBlock>}







				</CardBlock>



				<ButtonBlock
					className="create"
					disabled={isFormNotValid}
					onClick={handleSubmitAddComp}
				>
					Добавить
				</ButtonBlock>





				{isCreatingComp && <TextBlock>
					Создание артикула конкурента в базе данных...
				</TextBlock>
				}


			</form>

			<CardBlock className=" space-y-2" >

				<TextBlock>
					{artikulDB && <span>{artikulDB.nameukr}</span>}
				</TextBlock>


				<ImageBlock
					src={compArt.length === 9 ? photoSrc : "https://sharik.ua/local/templates/main/images/ua-logo.png"}
					alt="Если ты видишь эту надпись, значит ты ошибся с артикулом"
					width={200}
					height={200}
					className="mx-auto"

				/>
			</CardBlock>




		</CardBlock>
	);
}
