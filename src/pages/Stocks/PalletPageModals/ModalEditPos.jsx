import React from 'react';
import { ModalWrapper, InputBlock, ButtonBlock, CardBlock, TextBlock } from '../../../components';
import { CancelIcon, ClearIcon, OkIcon } from '../../../components/UI/Icons';

function ModalEditPos({
	show,
	selectedPos,
	newPosQuantValue,
	setNewPosQuantValue,
	newPosBoxesValue,
	setNewPosBoxesValue,
	newPosDateValue,
	setNewPosDateValue,
	handleUpdatePosById,
	onCancel,
}) {
	return (
		show && (
			<ModalWrapper title={`Редагування позиції ${selectedPos.artikul}`} onCancel={onCancel}>



				<CardBlock className="space-y-4">


					<CardBlock className="flex justify-between space-x-2">
						<TextBlock>Кількість:</TextBlock>
						<InputBlock
							name="newPosQuantValue"
							value={newPosQuantValue}
							onChange={(e) => { setNewPosQuantValue(e.target.value) }}
						/>
					</CardBlock>
					<CardBlock className="flex justify-between space-x-2">
						<TextBlock>Коробки:</TextBlock>
						<InputBlock
							name="newPosBoxesValue"
							value={newPosBoxesValue}
							onChange={(e) => { setNewPosBoxesValue(e.target.value) }}
						/>
					</CardBlock>
					<CardBlock className="flex justify-between space-x-2">
						<TextBlock>Дата:</TextBlock>
						<InputBlock
							name="newPosDataValue"
							value={newPosDateValue}
							placeholder="12-2023..."
							onChange={(e) => { setNewPosDateValue(e.target.value) }}
						/>
					</CardBlock>


					<CardBlock className="grid grid-cols-2 space-x-2">
						<ButtonBlock
							className="red-b flex justify-center items-center"
							onClick={() => { onCancel(); }}
						>
							<TextBlock className="text-2xl"><CancelIcon /></TextBlock>
							<TextBlock className=""> Скасувати</TextBlock>

						</ButtonBlock>
						<ButtonBlock
							className="green-b flex justify-center items-center"
							onClick={() => { handleUpdatePosById(selectedPos._id); }}
						>
							<TextBlock className="text-2xl"><OkIcon /></TextBlock>
							<TextBlock className=""> Зберегти</TextBlock>
							
						</ButtonBlock>
					</CardBlock>
				</CardBlock>
			</ModalWrapper>
		)
	);
}

export default ModalEditPos;
