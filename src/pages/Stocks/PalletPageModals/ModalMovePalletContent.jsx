import React from 'react';
import { ModalWrapper, InputBlock, ButtonBlock, CardBlock, TextBlock } from '../../../components';

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
						type="button"
						className="cancel-c"
						onClick={onCancel}
					>
						Скасувати
					</ButtonBlock>
					<ButtonBlock
						disabled={!selectedPalletId}
						type="button"
						className="success-c"
						onClick={() => {
							handleMovePalletContent(id, selectedPalletId);
						}}
					>
						Підтвердити
					</ButtonBlock>
				</CardBlock>
			</ModalWrapper>
		)
	);
}

export default ModalMovePalletContent;
