import React, { useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom';

import { ButtonBlock, CardBlock, HeaderBlock, ModalEditOneValue, PageBTW, TextBlock, Spinner, ButtonGroup, ModalWrapper, InputBlock, ContainerBlock, ModalDelete } from '../../components';
import { AddIcon, DeleteIcon, RenameIcon } from '../../components/UI/Icons';

import { toast } from 'react-toastify';

import PalletBage from './components/PalletBage';

import { useRowStore } from './stores/rowsStore';
import usePalletStore from '../Pallets/stores/palletsStore';
import usePosesStore from '../Poses/stores/posesStore';
import useFetchRowById from './hooks/useFetchRowById';
import ModalCreatePallet from './components/modals/ModalCreatePallet';
import useFetchRowPallets from './hooks/useFetchRowPallets';
import useFetchAllPoses from '../Poses/hooks/useFetchAllPoses';
import PalletsContainer from './components/PalletsContainer';


export default function RowPage() {

	const { id } = useParams()
	const navigate = useNavigate()

	const {updateRowById, deleteRowById } = useRowStore();
	const { rowPallets, createPallet } = usePalletStore();
	const { allPoses } = usePosesStore()

	const { row, error, isRowLoading } = useFetchRowById(id)
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


	return (
		<PageBTW
			isLoading={isRowLoading}
			className=""
			error={error}
		>
			<HeaderBlock
				className="text-orange-300 font-bold "
			>
				Ряд 	{row?.title}
			</HeaderBlock>



			<ButtonGroup
			>

				<ButtonGroup.Navigation></ButtonGroup.Navigation>

				<ButtonGroup.Actions>
					<ButtonBlock
						className="emerald-b flex"
						onClick={() => { setIsShowModalCreatePallet(true); }}
					>
						<AddIcon />
						Створити палету

					</ButtonBlock>
					<ButtonBlock
						className="lime-b flex"
						onClick={() => { setShowModalUpdateRow(true); }}
					>
						<RenameIcon />
						Перейменувати

					</ButtonBlock>
					<ButtonBlock
						className="red-b flex items-center"
						onClick={() => { setShowModalDeleteRow(true); }}
					>
						<DeleteIcon />
						Видалити ряд
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





			<PalletsContainer
				isRowPalletsLoading={isRowPalletsLoading}
				rowPallets={rowPallets}
				allPoses={allPoses}
				isAllPosesLoading={isAllPosesLoading}

			/>



		</PageBTW >
	)
}


