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


				<CardBlock
					className="space-y-4"
				>
					<CardBlock className="grid grid-cols-1 space-y-2">

						<CardBlock
							className="justify-self-center"
						>
							<ImageArt
								size={150}
								artikul={newPos.artikul.length === 9 ? newPos.artikul : "1102-3092"}
							/>
						</CardBlock>
						<TextBlock className="text-xl">
							{artsDB.find((art) => art.artikul === newPos.artikul)?.nameukr}
						</TextBlock>
					</CardBlock>

					<CardBlock className="space-y-2">
						<CardBlock className="grid grid-cols-1 md:grid-cols-2 space-x-2">
							<label className=" justify-self-center md:justify-self-start" htmlFor="artikul">Артикул:</label>
							<InputBlock
								type="text"
								id="artikul"
								name="artikul"
								autoComplete="off"
								value={newPos.artikul}
								onChange={handleInputPosChange}
							/>
						</CardBlock>

						<CardBlock className="grid grid-cols-1 md:grid-cols-2 space-x-2">
							<label className=" justify-self-center md:justify-self-start" htmlFor="quant">Кількість артикулу:</label>
							<InputBlock
								type="number"
								id="quant"
								name="quant"
								autoComplete="off"
								value={newPos.quant}
								onChange={handleInputPosChange}
							/>
						</CardBlock>

						<CardBlock className="grid grid-cols-1 md:grid-cols-2 space-x-2">
							<label className=" justify-self-center md:justify-self-start" htmlFor="box">Кількість коробок:</label>
							<InputBlock
								type="number"
								id="boxes"
								name="boxes"
								autoComplete="off"
								value={newPos.boxes}
								onChange={handleInputPosChange}
							/>
						</CardBlock>

						<CardBlock className="grid grid-cols-1 md:grid-cols-2 space-x-2">
							<label className=" justify-self-center md:justify-self-start" htmlFor="date">Дата:</label>
							<InputBlock
								type="text"
								id="date"
								name="date"
								autoComplete="off"
								value={newPos.date}
								onChange={handleInputPosChange}
							/>
						</CardBlock>

					</CardBlock>

					<CardBlock className="grid grid-cols-2 space-x-2">
						<ButtonBlock
							type="button"
							className="red-b"
							onClick={() => {
								onCancel();
							}}
						>
							Скасувати
						</ButtonBlock>
						<ButtonBlock
							type="submit"
							className="green-b"
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
