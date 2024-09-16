import React from 'react'
import { CardBlock, InputBlock, ModalWrapper, TextBlock, ButtonBlock, Spinner } from '../../../../components'

import { BsBalloon, BsBoxSeam } from 'react-icons/bs'
import { CancelIcon, DoneIcon } from '../../../../components/UI/Icons'

export default function ModalUpdateAsk(

	{
		showModalUpdateAsk,
		setShowModalUpdateAsk,
		selectedPos,
		finalValuePosBoxes,
		finalValuePosQuant,
		askValuePosBoxes,
		askValuePosQuant,
		setAskValuePosBoxes,
		setFinalValuePosBoxes,
		setAskValuePosQuant,
		setFinalValuePosQuant,
		handleAskingPos,
		isUpdatingPos
	}

) {




	return (
		<>
			{showModalUpdateAsk && <ModalWrapper
				onCancel={() => setShowModalUpdateAsk(false)}
				title={`Зняття позиції з палети ${selectedPos?.palletTitle} `}

			>
				<CardBlock
					className="gap-2  p-2 grid  bg-slate-500/10 rounded-xl "
				>

					<CardBlock
						className="grid grid-cols-3 bg-yellow-500/10 rounded-xl text-lg"
					>
						<TextBlock
							className="text-xl"
						>
							Зараз:
						</TextBlock>



						<TextBlock
							className="text-sky-300  font-bold  rounded"
						>

							{selectedPos?.quant}
						</TextBlock>




						<TextBlock
							className="text-amber-300 font-bold  rounded"
						>
							{selectedPos?.boxes}
						</TextBlock>



					</CardBlock>







					<CardBlock
						className="grid gap-2"

					>
						<CardBlock className="flex justify-between items-center gap-2">
							<TextBlock
								className="text-sky-100  ">
								<BsBalloon size={24} />
							</TextBlock>
							<InputBlock
								className="text-xl"
								type="number"
								id="quant"
								name="quant"
								autoComplete="off"
								value={askValuePosQuant}
								placeholder="Кульки"
								onChange={(e) => {
									setAskValuePosQuant(e.target.value)
									setFinalValuePosQuant(selectedPos?.quant - e.target.value)
								}}
							/>
						</CardBlock>

						<CardBlock className="flex justify-between items-center gap-2">
							<TextBlock
								className="text-amber-100  ">
								<BsBoxSeam size={24} />
							</TextBlock>
							<InputBlock
								className="text-xl"
								type="number"
								id="quant"
								name="quant"
								autoComplete="off"
								value={askValuePosBoxes}
								placeholder="Коробки"
								onChange={(e) => {
									setAskValuePosBoxes(e.target.value)
									setFinalValuePosBoxes(selectedPos?.boxes - e.target.value)
								}}
							/>
						</CardBlock>

					</CardBlock>









					<CardBlock
						className="grid grid-cols-3  bg-green-500/10 rounded-xl text-lg"
					>


						<TextBlock
							className="text-xl "
						>
							Стане:
						</TextBlock>


						<TextBlock
							className={finalValuePosQuant < 0 ? "text-red-500  " : "text-sky-300   "}
						>

							{finalValuePosQuant}
						</TextBlock>

						<TextBlock

							className={finalValuePosBoxes < 0 ? "text-red-500  " : "text-amber-300  "}>

							{finalValuePosBoxes}
						</TextBlock>



					</CardBlock>




					{finalValuePosBoxes < 0 && <TextBlock
						className="border border-red-600 text-red-600 p-2 rounded"
					>
						Коробки в мінусі
					</TextBlock>}





					{finalValuePosQuant < 0 && <TextBlock
						className="border border-red-500 text-red-500 p-2 rounded"
					>
						Недостатньо позиції
					</TextBlock>}






















					<CardBlock
						className="grid grid-cols-2 "
					>

						<ButtonBlock
							className="red-b "
							onClick={() => setShowModalUpdateAsk(false)}
						>
							<CancelIcon />	Скасувати
						</ButtonBlock>

						<ButtonBlock
							className="green-b "
							disabled={finalValuePosQuant < 0 ||
								finalValuePosBoxes < 0 ||
								askValuePosQuant <= 0 ||
								askValuePosBoxes < 0
							}
							onClick={handleAskingPos}
						>


							{isUpdatingPos ?
								<CardBlock>
									<Spinner color="rgb(134 239 172)" />
								</CardBlock>
								:
								<TextBlock>
									<DoneIcon />	Зняти
								</TextBlock>}


						</ButtonBlock>



					</CardBlock>








				</CardBlock>
			</ModalWrapper>}
		</>
	)
}
