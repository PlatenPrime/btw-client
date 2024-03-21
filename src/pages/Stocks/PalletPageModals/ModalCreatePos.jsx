import React from 'react';
import { ModalWrapper, InputBlock, ButtonBlock, CardBlock, TextBlock, ImageArt } from '../../../components';
import { CancelIcon, OkIcon } from '../../../components/UI/Icons';

function ModalCreatePos({
	show,
	newPos,
	artsDB,
	handleInputPosChange,
	handleCreatePos,
	onCancel,
	isCreatingPos
}) {
	return (
		show && (
			<ModalWrapper title="Додавання позиції" onCancel={onCancel}>


				<CardBlock
					className="space-y-4  "
				>








					<CardBlock className="
					grid grid-cols-1 space-y-2
				

					
					">

						<CardBlock
							className="grid justify-self-center bg-white w-full "
						>

							<CardBlock
								className=" justify-self-center"
							>
								<ImageArt
									size={150}
									artikul={newPos.artikul.length === 9 ? newPos.artikul : "1102-3092"}
								/>

							</CardBlock>

						</CardBlock>


						{artsDB.find((art) => art.artikul === newPos.artikul) ?

							<CardBlock>
								<TextBlock className="text-xl text-center">
									{artsDB.find((art) => art.artikul === newPos.artikul)?.nameukr}
								</TextBlock>


								<TextBlock className="text-xl text-orange-500">
									{artsDB.find((art) => art.artikul === newPos.artikul)?.zone}
								</TextBlock>
							</CardBlock>

							:
							null


						}


					</CardBlock>











					<CardBlock className="space-y-2">
						<CardBlock className="grid grid-cols-1 md:grid-cols-2 space-x-2">
							<label className=" justify-self-center self-center md:justify-self-start" htmlFor="artikul">Артикул:</label>
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
							<label className=" justify-self-center self-center md:justify-self-start" htmlFor="quant">Кількість артикулу:</label>
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
							<label className=" justify-self-center self-center md:justify-self-start" htmlFor="box">Кількість коробок:</label>
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
							<label className=" justify-self-center self-center md:justify-self-start" htmlFor="date">Дата:</label>
							<InputBlock
								type="text"
								id="date"
								name="date"
								autoComplete="off"
								value={newPos.date}
								onChange={handleInputPosChange}
							/>
						</CardBlock>


						<CardBlock className="grid grid-cols-1 md:grid-cols-2 space-x-2">
							<label className=" justify-self-center self-center md:justify-self-start" htmlFor="sklad">Склад:</label>
							<select
								className="InputBlock focus:bg-slate-900 text-lg "
								value={newPos.sklad}
								onChange={handleInputPosChange}
								id="sklad"
								name="sklad"
							>
								<option value="pogrebi">Погреби</option>
								<option value="merezhi">Мережі</option>

							</select>
						</CardBlock>



						<CardBlock className="grid grid-cols-1 md:grid-cols-2 space-x-2">
							<label className=" justify-self-center self-center  md:justify-self-start" htmlFor="com">Комент:</label>


							<InputBlock
								type="text"
								id="com"
								name="com"
								autoComplete="off"
								value={newPos.com}
								onChange={handleInputPosChange}
							/>
						</CardBlock>




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
							onClick={handleCreatePos}
							disabled={!newPos.artikul || !newPos.boxes || !newPos.quant}
						>
							<TextBlock className="text-2xl"><OkIcon /></TextBlock>
							<TextBlock className=""> 	Створити</TextBlock>




							

						</ButtonBlock>
					</CardBlock>

				</CardBlock>

			</ModalWrapper>
		)
	);
}

export default ModalCreatePos;
