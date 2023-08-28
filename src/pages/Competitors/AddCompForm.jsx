import React, { useState } from 'react';
import { useCompContext } from './compContextProvider'; // Import the context hook
import {
	ButtonBlock,
	InputBlock,
	RowBlock,
	TextBlock,
	CardBlock,
	ImageBlock
} from '../../components'; // Import your UI components here
import { getArtDataSharte } from '../../utils/getArtDataSharte';
import axios from "../../utils/axios"


export default function AddCompForm() {
	const { artsDB } = useCompContext();

	// State for form fields
	const [responseAO, setResponseAO] = useState(false)
	const [compArt, setCompArt] = useState('');
	const [selectedProd, setSelectedProd] = useState('');
	const [sharteLink, setSharteLink] = useState('');
	const [price, setPrice] = useState('');
	const [isAvailable, setIsAvailable] = useState('');
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

	const isFormNotValid = !compArt || !selectedProd || !sharteLink || !price || !isAvailable;
	const linkSharteRegex = /^https:\/\/sharte\.net\//;
	const isSharteLinkValid = linkSharteRegex.test(sharteLink);


	const handleAnalizeOne = async (e) => {
		e.preventDefault();

		try {
			setPrice("")
			setResponseAO(false)

			const { price, isAvailable } = await getArtDataSharte(sharteLink)


			setPrice(price)
			setIsAvailable(isAvailable)
			setResponseAO(true)
		} catch (error) {
			console.error('Error analyzing Sharte link:', error);
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
			isAvailable,
			price
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
			setPrice(null)
			setIsAvailable("")

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


				<CardBlock>

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

						
						{isSharteLinkValid && <ButtonBlock
							className='add'
							onClick={(e) => handleAnalizeOne(e)}

						>

							Анализ
						</ButtonBlock>}



					</RowBlock>


					<RowBlock className="space-x-2 " >
						<TextBlock>
							Цена: {price ? <p>{price}</p> : <p></p>}
						</TextBlock>
					</RowBlock>

					<RowBlock className="space-x-2" >
						<TextBlock>
							Наличие: {typeof isAvailable === "string" ? "" : isAvailable ? "Есть на остатке" : "Нет на остатке"}
						</TextBlock>
					</RowBlock>


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
