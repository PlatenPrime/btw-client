import React, { useState } from 'react';
import { useCompContext } from '../contexts/compContextProvider';
import {
	ButtonBlock,
	InputBlock,
	RowBlock,
	TextBlock,
	CardBlock,
	ImageBlock,
	Spinner
} from '../../../components';
import { getArtDataSharte } from '../../../utils/getArtDataSharte';
import { getArtDataBtrade } from '../../../utils/getArtDataBtrade';


import axios from "../../../utils/axios"


import { categories, subcategories, prods } from '../../../constants/compsData';






const initialStateForm = {
	compArt: "",
	selectedProd: "",
	sharteLink: "",
	airLink: "",
	yumiLink: "",
	bestLink: "",
	priceSharte: "",
	priceBtrade: "",
	priceYumi: "",
	priceAir: "",
	priceBest: "",
	isAvailableSharte: "",
	isAvailableAir: "",
	isAvailableBest: "",
	quantBtrade: "",
	quantYumi: "",
	isAnalyze: false,
	isCreatingComp: false,
	size: ""



}




export default function AddCompForm() {

	const { artsDB } = useCompContext();

	// State for form fields

	const [state, setState] = useState(initialStateForm)







	const photoSrc = `https://sharik.ua/images/elements_big/${state.compArt.trim()}_m1.jpg`;

	let artikulDB;

	if (artsDB) artikulDB = artsDB.find(item => item.artikul === state.compArt.trim()) || null;

	let artCategory;
	let artSubcategory;

	if (artikulDB) artCategory = categories[artikulDB.artikul.slice(0, 2)]
	console.log(artCategory)
	if (artikulDB) artSubcategory = subcategories[artikulDB.artikul.slice(0, 4)]
	console.log(artSubcategory)








	const isFormNotValid =
		!artikulDB




	const linkSharteRegex = /^https:\/\/sharte\.net\//;


	const isSharteLinkValid = linkSharteRegex.test(state.sharteLink);



	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});

	}


	const handleAnalizeOne = async (e) => {
		e.preventDefault();

		try {


			setState(prevState => ({
				...prevState,
				isAnalyze: false,
				priceSharte: '',
				isAvailableSharte: '',
				priceBtrade: '',
				quantBtrade: '',
			}));


			// Анализ Sharte

			const { price: priceSharte, isAvailable: isAvailableSharte } = await getArtDataSharte(state.sharteLink);
			setState(prevState => ({
				...prevState,
				priceSharte,
				isAvailableSharte,
				isAnalyze: true,
			}));

			// Анализ Btrade

			const { price: priceBtrade, quant: quantBtrade } = await getArtDataBtrade(state.compArt);
			setState(prevState => ({
				...prevState,
				priceBtrade,
				quantBtrade,
			}));



		} catch (error) {
			console.error('Error analyzing artikul:', error);
		}
	};




	const handleSubmitAddComp = async (e) => {
		e.preventDefault();



		const newComp = {
			artikul: state.compArt,
			nameukr: artikulDB.nameukr,
			prod: state.selectedProd,
			competitorsLinks: {
				sharteLink: state.sharteLink,
				airLink: state.airLink,
				yumiLink: state.yumiLink,
				bestLink: state.bestLink
			},
			avail: {
				btrade: state.quantBtrade,
				sharte: state.isAvailableSharte,
				air: state.isAvailableAir,
				yumi: state.quantYumi,
				best: state.isAvailableBest,

			},
			price: {
				btrade: state.priceBtrade,
				sharte: state.priceSharte,
				air: state.priceAir,
				yumi: state.priceYumi,
				best: state.priceBest
			},
			category: artCategory,
			subcategory: artSubcategory,
			size: state.size,

		}

		try {


			setState(prevState => ({
				...prevState,
				isCreatingComp: true,
			}));

			const createCompRes = await axios.post("comps", newComp);

			console.log(createCompRes);

		} catch (error) {

			console.log("Ошибка создания артикула для анализа", error)

		} finally {
			setState(prevState => ({
				...prevState,
				compArt: "",
				selectedProd: "",
				sharteLink: "",
				airLink: "",
				yumiArtikul: "",
				priceSharte: "",
				priceBtrade: "",
				priceYumi: "",
				priceAir: "",
				isAvailableSharte: "",
				isAvailableAir: "",
				quantBtrade: "",
				quantYumi: "",
				isAnalyze: false,
				isCreatingComp: false,
				size: ""

			}));

		}
	};








	return (





		<form>

			<CardBlock

				className='  flex flex-col m-1 p-1 space-y-2 
				xl:space-y-0 xl:space-x-2 xl:flex-row 
				
				
				'>


				<CardBlock
					className='space-y-2  w-full   justify-start  xl:w-1/3  p-2
					bg-sky-500/10 border border-sky-500
					
					'
				>


					<RowBlock className="space-x-2" >
						<TextBlock className=' ' >
							Артикул Бтрейд:
						</TextBlock>
						<InputBlock type="text"
							name="compArt"
							className='InputBlock  w-full text-center'
							placeholder="Например 1102-0260..."
							onChange={handleChange}
							value={state.compArt}

						/>

					</RowBlock>

					<RowBlock className="space-x-2" >
						<TextBlock>
							Производитель:
						</TextBlock>
						<select
							name="selectedProd"
							className='InputBlock focus:bg-sky-900 w-full'
							value={state.selectedProd}
							onChange={handleChange}
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

						<InputBlock
							type="text"
							name="sharteLink"
							className='InputBlock w-full  '
							placeholder="Страница артикула шарте..."
							onChange={handleChange}
							value={state.sharteLink}

						/>


					</RowBlock>


					<CardBlock
						className="flex flex-col items-center"
					>

						<ButtonBlock
							className="create-c mx-auto"
							disabled={isFormNotValid}
							onClick={handleSubmitAddComp}
						>
							Добавить
							{state.isCreatingComp &&
								<Spinner color="rgb(6 182 212)" />}
						</ButtonBlock>

					</CardBlock>

				</CardBlock>






				<CardBlock
					className=' 
					xl:w-1/3  border p-1 space-y-2
					flex flex-col items-center
					'
				>

					<ButtonBlock
						className={`${isSharteLinkValid ? "add-c" : "disabled"} mx-auto  `}
						onClick={(e) => handleAnalizeOne(e)}
						disabled={!isSharteLinkValid || !artikulDB}
					>

						Анализ
					</ButtonBlock>



					{state.isAnalyze && (
						<table className="border-collapse w-full">
							<tr>
								<td className="text-left border p-1 rounded w-1/2">Цена Sharte:</td>
								<td className="border p-1 rounded w-1/2">
									{state.priceSharte ? <p>{state.priceSharte} грн</p> : <p></p>}
								</td>
							</tr>
							<tr>
								<td className="text-left border p-1 rounded w-1/2">Цена Btrade:</td>
								<td className="border p-1 rounded w-1/2">
									{state.priceBtrade ? <p>{state.priceBtrade} грн</p> : <p></p>}
								</td>
							</tr>
							<tr>
								<td className="text-left border p-1 rounded w-1/2">Наличие у Sharte:</td>
								<td className="border p-1 rounded w-1/2">
									{state.isAvailableSharte ? "Есть" : "Нет"}
								</td>
							</tr>
							<tr>
								<td className="text-left border p-1 rounded w-1/2">Остаток на Погребах:</td>
								<td className="border p-1 rounded w-1/2">
									{state.quantBtrade ? <span>{state.quantBtrade} шт</span> : ""}
								</td>
							</tr>
						</table>
					)}



				</CardBlock>

				<CardBlock className="
				p-4 w-full flex flex-col space-y-2  xl:w-1/3
				bg-violet-500/20 border border-violet-500
				" >

					<TextBlock className='text-lg text-center' >
						{artikulDB &&
							<span
								className=' p-2 rounded-lg '
							>{artikulDB.nameukr}</span>
						}
					</TextBlock>


					<ImageBlock
						src={artikulDB ? photoSrc : "https://sharik.ua/images/elements_big/1102-3092_m1.jpg"}
						alt="Если ты видишь эту надпись, значит с фоткой какая-то проблема или артикула нет на сайте sharik.ua"
						width={200}
						height={200}
						className="mx-auto rounded-2xl shadow-md shadow-white"

					/>

					{artikulDB &&
						<CardBlock 
						className="space-y-2"
						>
							<TextBlock
								className="text-xl"
							>  
								<TextBlock
								className="border border-sky-500 p-1 rounded"
								>
									{artCategory}
								</TextBlock>
							</TextBlock>
							<TextBlock
								className="text-xl"
							>
	
								<TextBlock
								className="border border-yellow-500 p-1 rounded"
								>
									{artSubcategory}
								</TextBlock>
							</TextBlock>

						</CardBlock>}


				</CardBlock>




			</CardBlock>








		</form>


	);
}
