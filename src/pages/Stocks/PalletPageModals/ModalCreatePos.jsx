import React from 'react';
import { ModalWrapper, InputBlock, ButtonBlock, CardBlock, TextBlock, ImageArt } from '../../../components';

function ModalCreatePos({
	show,
	newPos,
	artsDB,
	handleInputPosChange,
	handleCreatePos,
	onCancel,
}) {
	return (
		show && (
			<ModalWrapper title="Додавання позиції" onCancel={onCancel}>
				<CardBlock className="flex space-x-2">
					<ImageArt
						size={100}
						artikul={newPos.artikul.length === 9 ? newPos.artikul : "1102-3092"}
					/>
					<TextBlock className="text-xl">
						{artsDB.find((art) => art.artikul === newPos.artikul)?.nameukr}
					</TextBlock>
				</CardBlock>
				<CardBlock className="space-y-2">
					<CardBlock className="flex justify-between items-center space-x-4">
						<label htmlFor="artikul">Артикул:</label>
						<InputBlock
							type="text"
							id="artikul"
							name="artikul"
							autoComplete="off"
							value={newPos.artikul}
							onChange={handleInputPosChange}
						/>
					</CardBlock>
					<CardBlock className="flex justify-between items-center space-x-4">
						<label htmlFor="quant">Кількість артикулу:</label>
						<InputBlock
							type="number"
							id="quant"
							name="quant"
							autoComplete="off"
							value={newPos.quant}
							onChange={handleInputPosChange}
						/>
					</CardBlock>
					<CardBlock className="flex justify-between items-center space-x-4">
						<label htmlFor="box">Кількість коробок:</label>
						<InputBlock
							type="number"
							id="boxes"
							name="boxes"
							autoComplete="off"
							value={newPos.boxes}
							onChange={handleInputPosChange}
						/>
					</CardBlock>
					<CardBlock className="flex justify-between items-center space-x-4">
						<label htmlFor="date">Дата:</label>
						<InputBlock
							type="text"
							id="date"
							name="date"
							autoComplete="off"
							value={newPos.date}
							onChange={handleInputPosChange}
						/>
					</CardBlock>
					<CardBlock className="flex justify-between">
						<ButtonBlock
							type="button"
							className="cancel-c"
							onClick={() => {
								onCancel();
							}}
						>
							Скасувати
						</ButtonBlock>
						<ButtonBlock
							type="submit"
							className="create-c"
							onClick={handleCreatePos}
						>
							Створити
						</ButtonBlock>
					</CardBlock>
				</CardBlock>
			</ModalWrapper>
		)
	);
}

export default ModalCreatePos;
