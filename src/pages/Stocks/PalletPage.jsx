import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import usePalletStore from './palletsStore';
import useBoxStore from './boxesStore';
import { ButtonBlock, CardBlock, HeaderBlock, ModalConfirm, ModalEditOneValue, PageBTW, Spinner, TextBlock } from '../../components';
import { toast } from 'react-toastify';

export default function PalletPage() {

	const { id } = useParams();
	const navigate = useNavigate()

	const getPalletById = usePalletStore((state) => state.getPalletById);
	const getPalletBoxes = usePalletStore((state) => state.getPalletBoxes);
	const deletePalletById = usePalletStore((state) => state.deletePalletById);
	const updatePalletById = usePalletStore((state) => state.updatePalletById);

	const [pallet, setPallet] = useState(null);
	const [title, setTitle] = useState("");
	const [boxes, setBoxes] = useState([]);
	const [isBoxesLoading, setIsBoxesLoading] = useState(false);

	const [showModalPalletDelete, setShowModalPalletDelete] = useState(false)
	const [showModalRenamePallet, setShowModalRenamePallet] = useState(false);
	const [showModalCreateBox, setShowModalCreateBox] = useState(false);


	useEffect(() => {
		async function fetchData() {
			try {
				const fetchedPallet = await getPalletById(id);
				console.log(fetchedPallet)
				setPallet(fetchedPallet);
				setTitle(fetchedPallet.title)
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


	async function handleRenamePalletById(newTitle) {
		try {



			const updateData = { ...pallet, title: newTitle }


			await updatePalletById(pallet._id, updateData);
			setTitle(newTitle)

		} catch (error) {
			console.error('Ошибка при изменении  названия паллеты:', error);
		} finally {
			setShowModalRenamePallet(false)

		}

	}




	return (
		<PageBTW>

			<HeaderBlock
				className="bg-sky-500/20 border border-sky-500"
			>
				{title}
			</HeaderBlock>



			<CardBlock
				className="flex justify-end flex-wrap p-2 space-x-2 "
			>

				<ButtonBlock
					className="edit-c"
					onClick={() => { setShowModalRenamePallet(true); }}
				>
					Переименовать
				</ButtonBlock>


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

				{showModalRenamePallet && <ModalEditOneValue

					value={title}
					onConfirm={(title) => { handleRenamePalletById(title) }}
					onCancel={() => { setShowModalRenamePallet(false) }}

				/>}




			</CardBlock>






			<CardBlock
				className="bg-green-500/5"
			>
				<TextBlock
					className="text-green-500 text-3xl"
				>
					Позиции
				</TextBlock>

				<TextBlock>
					Всего позиций {pallet?.boxes.length}
				</TextBlock>

				{isBoxesLoading ? (
					<Spinner />
				) : boxes.length === 0 ? (
					<p>Нет коробок на этой паллете</p>
				) : (
					<ul className='grid grid-cols-1 
					md:grid-cols-3 
					lg:grid-cols-4 
					xl:grid-cols-4 gap-2 p-4'>
						{boxes.map((box, i) => {
							const arrayOfArticuls = Object.entries(box.articuls);
							return (
								<li className='border border-green-500 p-2' key={box._id}>
									<TextBlock>{i} или отметка коробки</TextBlock>
									<TextBlock>{box._id}</TextBlock>
									<TextBlock>Дата: {box.date}</TextBlock>
									<TextBlock>Артикул: ХХХХ-ХХХХ</TextBlock>
									<TextBlock>Количество: ХХХХ</TextBlock>
								</li>
							);
						})}
					</ul>
				)}


			</CardBlock>



		</PageBTW>
	)
}
