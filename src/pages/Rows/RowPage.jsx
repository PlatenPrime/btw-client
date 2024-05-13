import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom';

import { ButtonBlock, CardBlock, HeaderBlock, ModalEditOneValue, PageBTW, TextBlock, Spinner, ButtonGroup, ModalWrapper, InputBlock, ContainerBlock, ModalDelete } from '../../components';
import { AddIcon, CancelIcon, DeleteIcon, OkIcon, RenameIcon } from '../../components/UI/Icons';

import { toast } from 'react-toastify';

import PalletBage from './components/PalletBage';

import { useRowStore } from './stores/rowsStore';
import usePalletStore from '../Pallets/stores/palletsStore';
import usePosesStore from '../Pallets/stores/posesStore';
import useFetchRowById from './hooks/useFetchRowById';


export default function RowPage() {

	const { row, updateRowById,   deleteRowById} = useRowStore();

	const {getRowPallets, pallets, createPallet } = usePalletStore();
	

	const { allPoses, getAllPoses } = usePosesStore()



	const {id} = useParams()
	const navigate = useNavigate()

const {isRowLoading} = useFetchRowById(id)


	const [title, setTitle] = useState(row?.title)
	const [newPalletTitle, setNewPalletTitle] = useState("")
	const [newPalletCom, setNewPalletCom] = useState("")



	const [showModalDeleteRow, setShowModalDeleteRow] = useState(false);
	const [showModalUpdateRow, setShowModalUpdateRow] = useState(false);
	const [showModalCreatePallet, setShowModalCreatePallet] = useState(false);
	const [isRowPalletsLoading, setIsRowPalletsLoading] = useState(false)


	const [isPalletCreating, setIsPalletCreating] = useState(false)
	const [isRowUpdating, setIsRowUpdating] = useState(false)
	const [isRowDeleting, setIsRowDeleting] = useState(false)




	async function fetchRowPallets(id) {

		try {
			setIsRowPalletsLoading(true)
			await getRowPallets(id)
			await getAllPoses()

		} catch (error) {
			console.log(error)
		} finally {
			setIsRowPalletsLoading(false)
		}

	}



	useEffect(() => {

		fetchRowPallets(id)
	}, [id ]);








	function closeModalDeleteRow() {
		setShowModalDeleteRow(false);
	}


	function closeModalUpdateRow() {
		setShowModalUpdateRow(false);
	}

	function closeModalCreatePallet() {
		setShowModalCreatePallet(false);
	}



	async function handleCreatePallet() {

		try {
			setIsPalletCreating(true)

			await createPallet(newPalletTitle, row._id, newPalletCom);


		} catch (error) {
			console.error('Ошибка при создании паллеты:', error);
		} finally {
			setIsPalletCreating(false)
			setShowModalCreatePallet(false)

		}

	}



	async function handleUpdateRowById(newTitle) {

		try {
			setIsRowUpdating(true)
			await updateRowById(row._id, newTitle);
			setTitle(newTitle)

		} catch (error) {
			console.error('Ошибка при изменении ряда:', error);
		} finally {
			setIsRowUpdating(false)
			setShowModalUpdateRow(false)

		}

	}

	async function handleDeleteRowById() {
		try {
			setIsRowDeleting(true)
			await deleteRowById(row._id);
			toast.success(`Ряд ${row.title} видалений`)
		} catch (error) {
			console.error('Ошибка при удалении Row:', error);
		} finally {
			setIsRowDeleting(false)
			setShowModalDeleteRow(false)
			navigate("/rows")
		}
	};











	return (
		<PageBTW
			className="px-1"
		>
			<HeaderBlock
				className=" bg-amber-500 shadow-2xl shadow-amber-500"
			>
				{title}
			</HeaderBlock>



			{isRowPalletsLoading
				?
				<ContainerBlock
					className="w-full h-full flex justify-start items-center"
				>
					<Spinner color="#fef3c7" />
				</ContainerBlock>
				:
				<>


					<ButtonGroup

					>

						<ButtonGroup.Actions>
							<ButtonBlock
								className="emerald-b flex"
								onClick={() => { setShowModalCreatePallet(true); }}
							>
								<TextBlock className="text-2xl"><AddIcon /></TextBlock>
								<TextBlock className="">Створити палету</TextBlock>

							</ButtonBlock>
							<ButtonBlock
								className="lime-b flex"
								onClick={() => { setShowModalUpdateRow(true); }}
							>
								<TextBlock className="text-2xl"><RenameIcon /></TextBlock>
								<TextBlock className="">Перейменувати</TextBlock>

							</ButtonBlock>
							<ButtonBlock
								className="red-b flex items-center"
								onClick={() => { setShowModalDeleteRow(true); }}
							>
								<TextBlock className="text-2xl"><DeleteIcon /></TextBlock>
								<TextBlock className="">Видалити ряд</TextBlock>
							</ButtonBlock>
						</ButtonGroup.Actions>

					</ButtonGroup>




					{showModalCreatePallet && <ModalWrapper
						title="Створення нової палети"
						onCancel={closeModalCreatePallet}
					>

						<CardBlock
							className="space-y-3"
						>



							<CardBlock
								className="grid grid-cols-2"
							>

								<TextBlock>
									Назва палети
								</TextBlock>
								<InputBlock
									value={newPalletTitle}
									name="newPalletTitle"
									type="text"
									placeholder="XX-XX-X-X"
									onChange={(e) => setNewPalletTitle(e.target.value)}
								/>
							</CardBlock>


							<CardBlock
								className="grid grid-cols-2"
							>

								<TextBlock>
									Коментарій
								</TextBlock>
								<InputBlock
									value={newPalletCom}
									name="newPalletCom"
									type="text"
									placeholder="....."
									onChange={(e) => setNewPalletCom(e.target.value)}
								/>
							</CardBlock>


						</CardBlock>

						<CardBlock
							className="grid grid-cols-2 gap-4"
						>

							<ButtonBlock
								className="red-b flex justify-center items-center"
								onClick={closeModalCreatePallet}
							>
								<TextBlock className="text-2xl"><CancelIcon /></TextBlock>
								<TextBlock className=""> Скасувати</TextBlock>

							</ButtonBlock>


							<ButtonBlock
								className="green-b flex justify-center items-center"
								onClick={handleCreatePallet}
							>
								{isPalletCreating
									?
									<Spinner color="rgb(134 239 172)" />
									:
									<>
										<TextBlock className="text-2xl"><OkIcon /></TextBlock>
										<TextBlock className=""> 	Створити</TextBlock>
									</>

								}

							</ButtonBlock>


						</CardBlock>


					</ModalWrapper>}


					{
						showModalUpdateRow && <ModalEditOneValue
							value={row.title}
							onConfirm={(value) => { handleUpdateRowById(value) }}
							onCancel={closeModalUpdateRow}
							isUpdating={isRowUpdating}
						/>
					}


					{
						showModalDeleteRow && <ModalDelete
							ask="Видалити цей ряд?"
							onDelete={handleDeleteRowById}
							onCancel={closeModalDeleteRow}
							isDeleting={isRowDeleting}
						/>
					}







					<ContainerBlock
						className="space-y-4  "
					>
						<TextBlock
							className="text-3xl text-amber-100 "
						>
							Палети
						</TextBlock>

						{isRowPalletsLoading
							?
							<Spinner color="#fef3c7" />
							:
							pallets.length === 0
								?
								<TextBlock
									className="text-2xl"
								>Цей ряд не містить палети </TextBlock>
								:
								<CardBlock
									className="space-y-4 "
								>

									{pallets?.map((pallet) => <PalletBage
										pallet={pallet}
										key={pallet._id}
										poses={allPoses?.filter((pos) => pos.pallet === pallet._id)}
									/>
									)}
								</CardBlock>}




					</ContainerBlock>



				</>
			}


		</PageBTW >
	)
}


