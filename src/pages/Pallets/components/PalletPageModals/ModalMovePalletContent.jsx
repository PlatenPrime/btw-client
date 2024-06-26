import React from 'react';
import { ModalWrapper, InputBlock, ButtonBlock, CardBlock, TextBlock, Spinner } from '../../../../components';
import { CancelIcon, OkIcon } from '../../../../components/UI/Icons';

function ModalMovePalletContent({
	show,
	id,
	pallet,
	rows,
	selectedRowPallets,
	selectedRowId,
	selectedPalletId,
	selectedPallet,
	handleMovePalletContent,
	onCancel,
	setSelectedRowId,
	setSelectedPalletId,
	isMovingPalletContent
}) {
	return (
		show && (
			<ModalWrapper title={`Переставити позицій з палети ${pallet?.title}`} onCancel={onCancel}>
				<CardBlock className="grid grid-cols-2">
					<TextBlock className="text-xl justify-self-start">Виберіть ряд:</TextBlock>
					<select
						className="InputBlock w-full text-xl"
						onChange={(e) => {
							setSelectedRowId(e.target.value)

						}}
					>
						{rows?.map((row) => (
							<option
								key={row._id}
								value={row._id}
								className="bg-sky-900 text-xl"
							>
								{row.title}
							</option>
						))}
					</select>
				</CardBlock>

				<CardBlock className="grid grid-cols-2">
					<TextBlock className="text-xl justify-self-start">Виберіть палету:</TextBlock>
					<select
						className="InputBlock w-full text-xl "
						onChange={(e) => {
							setSelectedPalletId(e.target.value)

						}}
					>
						{selectedRowId && selectedRowPallets?.length > 0 ? (
							selectedRowPallets.map((pallet) => (
								<option
									key={pallet._id}
									value={pallet._id}
									className="bg-sky-900 text-xl"
								>
									{pallet.title}
								</option>
							))
						) : (
							<option value="">Ряд не має палет</option>
						)}
					</select>
				</CardBlock>

				<CardBlock>
					{pallet._id === selectedPalletId && (
						<TextBlock className="border border-rose-500 p-2 text-rose-500">
							Вибрана ця ж сама палета
						</TextBlock>
					)}
				</CardBlock>

				<CardBlock>
					{pallet._id !== selectedPalletId && selectedPallet?.poses.length > 0 && (
						<TextBlock className="border border-rose-500 p-2 text-rose-500">
							Вибрана паллета нe пуста. Переміщення видалить всі наявні позиції на ній
						</TextBlock>
					)}
				</CardBlock>

				<CardBlock className="grid grid-cols-2 space-x-2">
					<ButtonBlock
						className="red-b f"
						onClick={() => { onCancel(); }}
					>
						<TextBlock className="text-2xl"><CancelIcon /></TextBlock>
						<TextBlock className=""> Скасувати</TextBlock>

					</ButtonBlock>
					<ButtonBlock
						disabled={!selectedPalletId}
						className="green-b "
						onClick={() => {
							handleMovePalletContent(id, selectedPalletId);
						}}
					>


						{isMovingPalletContent ?
							<Spinner color="green" />
							:
							<>
								<TextBlock className="text-2xl"><OkIcon /></TextBlock>
								<TextBlock className=""> Переставити</TextBlock>
							</>
						}


					</ButtonBlock>

				</CardBlock>
			</ModalWrapper>
		)
	);
}

export default ModalMovePalletContent;
