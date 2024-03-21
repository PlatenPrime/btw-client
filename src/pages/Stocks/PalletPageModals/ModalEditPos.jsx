import React from 'react';
import { ModalWrapper, InputBlock, ButtonBlock, CardBlock, TextBlock } from '../../../components';
import { CancelIcon, ClearIcon, OkIcon } from '../../../components/UI/Icons';

function ModalEditPos({
	show,
	selectedPos,
	updatePosQuantValue,
	setUpdatePosQuantValue,
	updatePosBoxesValue,
	setUpdatePosBoxesValue,
	updatePosDateValue,
	setUpdatePosDateValue,

	updatePosSkladValue,
	setUpdatePosSkladValue,
	updatePosComValue,
	setUpdatePosComValue,

	handleUpdatePosById,
	onCancel,

	isEditingPos

}) {
	return (
		show && (
			<ModalWrapper title={`Редагування позиції ${selectedPos.artikul}`} onCancel={onCancel}>



				<CardBlock className="space-y-4">


					<CardBlock className="flex justify-between space-x-2">
						<TextBlock>Кількість:</TextBlock>
						<InputBlock
							name="updatePosQuantValue"
							value={updatePosQuantValue}
							onChange={(e) => { setUpdatePosQuantValue(e.target.value) }}
						/>
					</CardBlock>


					<CardBlock className="flex justify-between space-x-2">
						<TextBlock>Коробки:</TextBlock>
						<InputBlock
							name="updatePosBoxesValue"
							value={updatePosBoxesValue}
							onChange={(e) => { setUpdatePosBoxesValue(e.target.value) }}
						/>
					</CardBlock>

					<CardBlock className="flex justify-between space-x-2">
						<TextBlock>Дата:</TextBlock>
						<InputBlock
							name="updatePosDateValue"
							value={updatePosDateValue}
							placeholder="12.20"
							onChange={(e) => { setUpdatePosDateValue(e.target.value) }}
						/>
					</CardBlock>



					<CardBlock className="grid grid-cols-1 md:grid-cols-2 space-x-2">
						<label className=" justify-self-center md:justify-self-start" htmlFor="sklad">Склад:</label>
						<select
							className="InputBlock focus:bg-slate-900 text-lg "
							value={updatePosSkladValue}
							onChange={(e) => { setUpdatePosSkladValue(e.target.value) }}
							id="sklad"
							name="sklad"
						>
							<option value="pogrebi">Погреби</option>
							<option value="merezhi">Мережі</option>

						</select>
					</CardBlock>




					<CardBlock className="flex justify-between space-x-2">
						<TextBlock>Комент:</TextBlock>
						<InputBlock
							name="updatePosComValue"
							value={updatePosComValue}
							placeholder="..."
							onChange={(e) => { setUpdatePosComValue(e.target.value) }}
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
