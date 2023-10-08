import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import usePalletStore from './palletsStore';
import useBoxStore from './boxesStore';
import { HeaderBlock, PageBTW, TextBlock } from '../../components';

export default function PalletPage() {

	const { id } = useParams();
	const getPalletById = usePalletStore((state) => state.getPalletById);
	const getPalletBoxes = usePalletStore((state) => state.getPalletBoxes);

	const [pallet, setPallet] = useState(null);
	const [boxes, setBoxes] = useState([]);
	const [isBoxesLoading, setIsBoxesLoading] = useState(false);


	useEffect(() => {
		async function fetchData() {
			try {
				const fetchedPallet = await getPalletById(id);
				console.log(fetchedPallet)
				setPallet(fetchedPallet);
			} catch (error) {
				console.error('Ошибка при получении паллеты:', error);
			}
		}

		fetchData();
	}, [id]);


	useEffect(() => {
		async function fetchBoxes() {
			if (pallet) {
				setIsBoxesLoading(true);
				const fetchedBoxes = await getPalletBoxes(pallet._id);
				console.log(fetchedBoxes)
				setBoxes(fetchedBoxes);
				setIsBoxesLoading(false);
			}
		}

		fetchBoxes();
	}, [pallet]);





	return (
		<PageBTW>

			<HeaderBlock
				className="bg-sky-500/40 border border-sky-500"
			>
				{pallet?.title}
			</HeaderBlock>



			{isBoxesLoading ? (
				<p>Загрузка коробок...</p>
			) : boxes.length === 0 ? (
				<p>Нет коробок в этой паллете</p>
			) : (
				<ul>
					{
						boxes.map((box) => {

							const arrayOfArticuls = Object.entries(box.articuls);

							return <li key={box._id}>
								{box.date}
								<TextBlock>
									{arrayOfArticuls.map((artikul) => {
									<>{artikul[0]}</>	
									}
									)}
								</TextBlock>

							</li>
						}

						)

					}
				</ul>
			)}





		</PageBTW>
	)
}
