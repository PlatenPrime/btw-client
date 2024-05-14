import React, { useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom';

import { ButtonBlock, CardBlock, HeaderBlock, ModalEditOneValue, PageBTW, TextBlock, Spinner, ButtonGroup, ModalWrapper, InputBlock, ContainerBlock, ModalDelete } from '../../components';
import { AddIcon, DeleteIcon, RenameIcon } from '../../components/UI/Icons';

import { toast } from 'react-toastify';

import PalletBage from './components/PalletBage';

import { useRowStore } from './stores/rowsStore';
import usePalletStore from '../Pallets/stores/palletsStore';
import usePosesStore from '../Pallets/stores/posesStore';
import useFetchRowById from './hooks/useFetchRowById';
import ModalCreatePallet from './components/modals/ModalCreatePallet';
import useFetchRowPallets from './hooks/useFetchRowPallets';
import useFetchAllPoses from '../Pallets/hooks/useFetchAllPoses';


export default function RowPage() {

	const { id } = useParams()
	const navigate = useNavigate()

	const { row, updateRowById, deleteRowById } = useRowStore();
	const { rowPallets, createPallet } = usePalletStore();
	const { allPoses } = usePosesStore()

	const { isRowLoading } = useFetchRowById(id)
	const { isRowPalletsLoading } = useFetchRowPallets(id)
	const { isAllPosesLoading } = useFetchAllPoses()


	const [showModalDeleteRow, setShowModalDeleteRow] = useState(false);
	const [showModalUpdateRow, setShowModalUpdateRow] = useState(false);
	const [isShowModalCreatePallet, setIsShowModalCreatePallet] = useState(false);



	const [isPalletCreating, setIsPalletCreating] = useState(false)
	const [isRowUpdating, setIsRowUpdating] = useState(false)
	const [isRowDeleting, setIsRowDeleting] = useState(false)



	async function handleCreatePallet(newPalletTitle, newPalletCom) {
		try {
			setIsPalletCreating(true)
			const createData = {
				title: newPalletTitle,
				com: newPalletCom,
				rowId: row?._id
			}
			await createPallet(createData);
		} catch (error) {
			console.error('Ошибка при создании паллеты:', error);
		} finally {
			setIsPalletCreating(false)
			setIsShowModalCreatePallet(false)
		}
	}



	async function handleUpdateRowById(newTitle) {
		try {
			setIsRowUpdating(true)
			await updateRowById(row._id, newTitle);
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

	if (isRowLoading) {
		return (
			<PageBTW>
				<HeaderBlock
					className="text-transparent"
				>
					Ряд
				</HeaderBlock>
				<ContainerBlock
					className="w-full h-full flex justify-center items-center"
				>
					<Spinner color="rgb(245 158 11  )" />
				</ContainerBlock>

			</PageBTW>
		)
	}



	return (
		<PageBTW
			className="px-1 space-y-4"
		>
			<HeaderBlock
				className=" bg-amber-500 shadow-2xl shadow-amber-500"
			>
				Ряд 	{row?.title}
			</HeaderBlock>



			<ButtonGroup
			>
				<ButtonGroup.Actions>
					<ButtonBlock
						className="emerald-b flex"
						onClick={() => { setIsShowModalCreatePallet(true); }}
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



			<ModalCreatePallet
				isShowModalCreatePallet={isShowModalCreatePallet}
				setIsShowModalCreatePallet={setIsShowModalCreatePallet}
				handleCreatePallet={handleCreatePallet}
				isPalletCreating={isPalletCreating}
			/>


			{
				showModalUpdateRow && <ModalEditOneValue
					value={row.title}
					onConfirm={(value) => { handleUpdateRowById(value) }}
					onCancel={() => setShowModalUpdateRow(false)}
					isUpdating={isRowUpdating}
				/>
			}


			{
				showModalDeleteRow && <ModalDelete
					ask="Видалити цей ряд?"
					onDelete={handleDeleteRowById}
					onCancel={() => setShowModalDeleteRow(false)}
					isDeleting={isRowDeleting}
				/>
			}




			<ContainerBlock
				className="space-y-4  "
			>


				{isRowPalletsLoading || isAllPosesLoading
					?
					<Spinner color="#fef3c7" />
					:
					rowPallets?.length === 0
						?
						<TextBlock
							className="text-2xl"
						>Цей ряд не містить палети </TextBlock>
						:
						<CardBlock
							className="space-y-4 "
						>

							{rowPallets?.map((pallet) => <PalletBage
								pallet={pallet}
								key={pallet._id}
								poses={allPoses?.filter((pos) => pos.pallet === pallet._id)}
							/>
							)}
						</CardBlock>}




			</ContainerBlock>



		</PageBTW >
	)
}


