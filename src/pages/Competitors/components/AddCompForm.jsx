import React, { useState } from 'react';
import { useCompContext } from '../contexts/compContextProvider';
import {
	ButtonBlock,
	InputBlock,
	RowBlock,
	TextBlock,
	CardBlock,
	ImageBlock
} from '../../../components';
import { getArtDataSharte } from '../../../utils/getArtDataSharte';
import { getArtDataBtrade } from '../../../utils/getArtDataBtrade';


import axios from "../../../utils/axios"


const prods = [
	'Gemar',
	'Belbal',
	'Flex',
	"Anagram",
	"Qualatex"

];


const initialStateForm = {
	compArt: "",
	selectedProd: "",
	sharteLink: "",
	priceSharte: "",
	isAvailableSharte: null,
	priceBtrade: "",
	quantBtrade: "",
	isAnalyze: false,
	isCreatingComp: false,



}




export default function AddCompForm() {
	const { artsDB } = useCompContext();

	// State for form fields

	const [state, setState] = useState(initialStateForm)


	// Other form-related state and functions

	// НУЖНЫЕ КОНСТАНТЫ





	const photoSrc = `https://sharik.ua/images/elements_big/${state.compArt.trim()}_m1.jpg`;

	let artikulDB;

	if (artsDB) artikulDB = artsDB.find(item => item.artikul === state.compArt.trim());



	const isFormNotValid =
		!state.compArt ||
		!state.selectedProd ||
		!state.sharteLink 




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
				sharteLink: state.sharteLink
			},
			avail: {
				btrade: state.quantBtrade,
				sharte: state.isAvailableSharte,

			},
			price: {
				btrade: state.priceBtrade,
				sharte: state.priceSharte,
			}

		}

		try {


			setState(prevState => ({
				...prevState,
				isCreatingComp: true,
			}));

			const createCompRes = await axios.post("comps", newComp);

			console.log(createCompRes.json());

		} catch (error) {

			console.log("Ошибка создания артикула для анализа", error)

		} finally {
			setState(prevState => ({
				...prevState,
				isCreatingComp: false,
				isAnalyze: false,
				compArt: '',
				sharteLink: '',
				selectedProd: '',
				priceSharte: null,
				isAvailableSharte: '',
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
					className='space-y-2  w-full flex flex-col  justify-start  xl:w-1/3  p-1
					bg-sky-400/10
					
					'
				>


					<RowBlock className="space-x-2" >
						<TextBlock className=' ' >
							Артикул Бтрейд:
						</TextBlock>
						<InputBlock type="text"
							name="compArt"
							className='InputBlock  w-full text-center'
							placeholder="Введи артикул БТрейд..."
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
							placeholder="Введи ссылку sharte"
							onChange={handleChange}
							value={state.sharteLink}

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



					{state.isAnalyze && <RowBlock className=" flex flex-col items-start space-y-1 " >
						<TextBlock
							className='border p-1 rounded w-full flex justify-start'
						>
							Цена Sharte: {
								state.priceSharte ?
									<p>{state.priceSharte} грн</p>
									:
									<p></p>}
						</TextBlock>

						<TextBlock
							className='border p-1 rounded w-full flex justify-start'
						>
							Цена Btrade: {
								state.priceBtrade ?
									<p>{state.priceBtrade} грн</p>
									:
									<p></p>}
						</TextBlock>

						<TextBlock
							className='border p-1 rounded w-full flex justify-start'
						>
							Наличие у Sharte: {state.isAvailableSharte ? "Есть" : "Нет"}
						</TextBlock>




						<TextBlock
							className='border p-1 rounded w-full flex justify-start'
						>
							Остаток на Погребах: {state.quantBtrade ? <span>{state.quantBtrade} шт</span> : ""}
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


				{state.isCreatingComp && <TextBlock>
					Создание артикула конкурента в базе данных...
				</TextBlock>
				}


			</CardBlock>




		</form>


	);
}
