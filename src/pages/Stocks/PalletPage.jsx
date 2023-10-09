import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import usePalletStore from './palletsStore';
import useBoxStore from './boxesStore';
import { ButtonBlock, CardBlock, HeaderBlock, ModalConfirm, PageBTW, Spinner, TextBlock } from '../../components';
import { toast } from 'react-toastify';

export default function PalletPage() {

	const { id } = useParams();
	const navigate = useNavigate()

	const getPalletById = usePalletStore((state) => state.getPalletById);
	const getPalletBoxes = usePalletStore((state) => state.getPalletBoxes);
	const deletePalletById = usePalletStore((state) => state.deletePalletById);

	const [pallet, setPallet] = useState(null);
	const [boxes, setBoxes] = useState([]);
	const [isBoxesLoading, setIsBoxesLoading] = useState(false);

	const [showModalPalletDelete, setShowModalPalletDelete] = useState(false)


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


	async function handleDeletePalletById() {
		try {
			await deletePalletById(pallet._id)
			toast.success(`Паллета ${pallet.title} удалена`)

		} catch (error) {
			console.error('Ошибка при удалении Pallet:', error);
		} finally {
			setShowModalPalletDelete(false)
			navigate(`/rows/${pallet.row}`)
		}

	}




	return (
		<PageBTW>

			<HeaderBlock
				className="bg-sky-500/40 border border-sky-500"
			>
				{pallet?.title}
			</HeaderBlock>



			<CardBlock
				className="flex justify-end flex-wrap p-2"
			>
				<ButtonBlock
					className="delete-c"
					onClick={() => { setShowModalPalletDelete(true) }}
				>
					Удалить паллету
				</ButtonBlock>
			</CardBlock>


			<CardBlock>

				{showModalPalletDelete && <ModalConfirm
					ask="Удалить эту паллету?"
					onConfirm={handleDeletePalletById}
					onCancel={() => { setShowModalPalletDelete(false) }}
				/>}

			</CardBlock>






			<CardBlock>

				{isBoxesLoading ? (
					<Spinner />

				) : boxes.length === 0 ? (
					<p>Нет коробок на этой паллете</p>
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

			</CardBlock>



		</PageBTW>
	)
}
